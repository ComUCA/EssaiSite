#!/usr/bin/env python
# -*- coding: utf-8 -*-

from collective.contentleadimage.config import IMAGE_FIELD_NAME
from collective.contentleadimage.config import IMAGE_CAPTION_FIELD_NAME
from zope.component import getMultiAdapter
from Acquisition import aq_inner
from Products.CMFCore.utils import getToolByName

import re
from DateTime import DateTime
import uuid

import pprint
pp = pprint.PrettyPrinter(indent=4)


class ItemDetails(object):

    def details(self, item, context, desc_max=200, isObject=False):
        return self.itemDetails(item, context, '', [], '', [], [], desc_max, None, isObject)

    def itemDetails(self, item, context, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, suject_filter, isObject=False):
        # CLASSEMENT
        classement = False

        # MOVIE
        if item.portal_type == 'Link' and not self.isMovie(item.remoteUrl):
            return None

        # SUBJECTS
        subjects = list(item.Subject())
        subjects.sort()
        if suject_filter and not suject_filter in subjects:
            return None

        # CANAUX
        prefix_canaux = prefix_canaux.encode('utf-8')
        canauxItem = [s[len(prefix_canaux):] for s in subjects if s.startswith(prefix_canaux)]
        if len(canauxItem) > 0:
            classement = True

        # THEMES
        prefix_themes = prefix_themes.encode('utf-8')
        themesItem = [s[len(prefix_themes):] for s in subjects if s.startswith(prefix_themes)]
        theme = themesItem[0] if len(themesItem) > 0 else ''
        themeCls = 'theme-%s' % themesItem[0].lower() if theme else ''

        # IMPORTANCES
        importancesItem = {}
        for canal in canaux:
            prefix_importance = canaux[canal]
            prefix_importance = prefix_importance.encode('utf-8')
            importancesItem[canal] = [s[len(prefix_importance):] for s in subjects if s.startswith(prefix_importance)]
            if len(importancesItem[canal]) > 0:
                classement = True

        # IMAGE & LEGEND
        (image, legend) = self.image(item, context, isObject)
        image_size = 'image_complete' if '#FilUNSImageComplete' in subjects else ''
        image_position = 'image_top' if '#FilUNSImageHaut' in subjects else ''

        # DIVERS
        if isObject:
            workflowTool = getToolByName(context.context, 'portal_workflow')
            state = workflowTool.getStatusOf('simple_publication_workflow', item)['review_state']
        else:
            state = item.review_state()

        # URLs
        url = item.absolute_url() if isObject else item.getURL()
        remote_url = item.remoteUrl if item.portal_type == 'Link' else None

        return {
            'uuid':str(uuid.uuid1()), 'title': item.Title(), 'description': item.Description(),
            'desc_trunc': self.smart_truncate(item.Description(), length=desc_max),
            'type': item.portal_type, 'legend': legend,
            'image': image, 'image_size': image_size, 'image_position': image_position,
            'dates': self.itemDates(item, context, isObject), 'location': self.eventLocation(item, context),
            'subjects': subjects, 'canaux': canauxItem, 'themes': themesItem, 'importances': importancesItem,
            'theme': theme, 'themeCls': themeCls,
            'state': state, 'url': url, 'remote_url': remote_url,
            'classement': classement
        }

    def image(self, item, context, isObject=False):
        image = None
        legend = None

        if item.portal_type == 'Link':
            image = '++resource++unice.filuns.images/placeholder_movie_800x600.gif'
        else:
            if hasattr(item, 'tag'):
                image = item.tag(scale='large', css_class='')
                if hasattr(item, 'getImageCaption'):
                    legend = item.getImageCaption()
            elif item.getProperty('hasContentLeadImage', True):
                (image, legend) = self.contentLeadImage(item, context, isObject)

            if image:
                width = re.findall(r'width\s*=\s*["\']([^"\']*)["\']', image)
                if len(width)>0 and width[0] == '0':
                    image = None
                else:
                    src = re.findall(r'src\s*=\s*["\']([^"\']*)["\']', image)
                    image = src[0] if len(src)>0 else None

            if image and image.startswith('/'):
                image = '%s%s' % (item.getURL(), image)

        if not image:
            image = '++resource++unice.filuns.images/placeholder_800x600.gif'

        return (image, legend)

    def contentLeadImage(self, item, context, isObject):
        image = None
        legend = None

        context = aq_inner(item) if isObject else aq_inner(item.getObject())

        field = context.getField(IMAGE_FIELD_NAME)
        if field is not None:
            if field.get_size(context) != 0:
                image = field.tag(context, scale='large', css_class='', title='')

        field = context.getField(IMAGE_CAPTION_FIELD_NAME)
        legend = field.get(context) if field else ''

        return (image, legend)

    def itemDates(self, item, context, isObject=False):
        plone = getMultiAdapter((context.context, context.request), name="plone")
        if item.portal_type == 'Event':
            start = item.start() if isObject else item.start
            start_localized = plone.toLocalizedTime(start)
            end = item.end() if isObject else item.end
            end_localized = plone.toLocalizedTime(end)
            localized = start_localized if (end - start < 1) else '%s - %s' % (start_localized, end_localized)
        else:
            start = item.effective_date if isObject else item.EffectiveDate()
            start_localized = None
            if start and start != 'None':
                start = DateTime(start)
                start_localized = plone.toLocalizedTime(start)
            localized = start_localized
            end = None
            end_localized = None
        return {'start': start, 'start_localized': start_localized, 'end': end, 'end_localized': end_localized, 'localized': localized}

    def eventLocation(self, item, context):
        if not item.portal_type == 'Event': return None
        return item.location if item.location else None

    def captions(self, item, context):
        captions = [item['title']]
        captions.append('<br/><small>%s</small>' % item['description'])
        return ''.join(captions)

    def smart_truncate(self, content, length=100, suffix='...'):
        if not content:
            return None
        if len(content) <= length:
            return content
        else:
            return ' '.join(content[:length+1].split(' ')[0:-1]) + suffix

    def isMovie(self, url):
        sites = ['youtube', 'vimeo', 'dailymotion']
        return any(s in url for s in sites)
