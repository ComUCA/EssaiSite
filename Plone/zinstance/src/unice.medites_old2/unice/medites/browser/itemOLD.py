# -*- coding: utf-8 -*-

from collective.contentleadimage.config import IMAGE_FIELD_NAME
from collective.contentleadimage.config import IMAGE_CAPTION_FIELD_NAME
from zope.component import getMultiAdapter
from Acquisition import aq_inner
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone import utils
from plone.app.layout.navigation.root import getNavigationRoot

import re
from DateTime import DateTime
import uuid

import pprint
pp = pprint.PrettyPrinter(indent=4)


class Item():

    def itemDetails(self, item, context, request, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, suject_filter, isObject=False):
        # CLASSEMENT
        classement = False

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
        prefix_themes = prefix_themes or ''
        prefix_themes = prefix_themes.encode('utf-8')
        themesItem = [s[len(prefix_themes):] for s in subjects if s.startswith(prefix_themes)]
        theme = themesItem[0] if len(themesItem) > 0 else ''
        themeLower = themesItem[0].lower() if theme else ''
        themeCls = 'theme-%s' % themesItem[0].lower() if theme else ''
        themeSubject = '%s%s' % (prefix_themes, themesItem[0]) if prefix_themes and theme else ''

        # IMPORTANCES
        importancesItem = {}
        for canal in canaux:
            prefix_importance = canaux[canal]
            prefix_importance = prefix_importance.encode('utf-8')
            importancesItem[canal] = [s[len(prefix_importance):] for s in subjects if s.startswith(prefix_importance)]
            if len(importancesItem[canal]) > 0:
                classement = True

        # IMAGE & LEGEND
        (image, image_default, legend) = self.image(item, isObject)
        (image_full, image_default_full, legend_full) = self.image(item, isObject, 'full')
        image_size = 'image_complete' if '#FilUNSImageComplete' in subjects else ''
        image_position = 'image_top' if '#FilUNSImageHaut' in subjects else ''

        image_alt_word = None
        if image_default:
            words = re.findall(r'\w{4,100}\b', item.Title().decode('utf8'), re.UNICODE)
            if len(words) > 0:
                image_alt_word = words[0].capitalize()
                image_alt_word = '<span>%s</span>%s' % (image_alt_word[0:1], image_alt_word[1:])

        # DIVERS
        try:
            if isObject:
                workflowTool = getToolByName(context, 'portal_workflow')
                state = workflowTool.getStatusOf('simple_publication_workflow', item)['review_state']
            else:
                state = item.review_state()
        except:
            state = 'published'
        url = item.absolute_url() if isObject else item.getURL()

        # TEXTE
        text = item.getText().strip() if hasattr(item, 'getText') else None

        # ICON & POIDS
        icon_url = item.getIcon()
        icon = icon_url.rsplit('/', 1)[-1].split('.')[0] if icon_url else None
        obj_size = item.getObjSize() if isObject else item.getObjSize

        # ACCESS
        (access, roles) = self.access(context, item, isObject)

        return {
            'item': item, 'fields': item, 'isObject': isObject,
            'uuid': str(uuid.uuid1()), 'title': item.Title() or item.id, 'text': text, 'description': item.Description(),
            'desc_trunc': self.smart_truncate(item.Description(), length=desc_max),
            'type': item.portal_type, 'dexterity': item.meta_type == 'Dexterity Container', 'legend': legend,
            'image': image, 'image_full': image_full, 'image_default': image_default, 'image_size': image_size, 'image_position': image_position,
            'dates': self.itemDates(item, context, request, isObject), 'location': self.eventLocation(item),
            'subjects': subjects, 'canaux': canauxItem, 'themes': themesItem, 'importances': importancesItem,
            'theme': theme, 'themeCls': themeCls, 'themeSubject': themeSubject, 'themeLower': themeLower,
            'state': state, 'access': access, 'roles': roles, 'url': url, 'real_url': url,
            'size': obj_size, 'icon_url': icon_url, 'icon': icon,
            'classement': classement, 'image_alt_word': image_alt_word
        }

    def image(self, item, isObject=False, size='large'):
        image = None
        default = False
        legend = None

        if hasattr(item, 'tag'):
            image = item.tag(scale='large', css_class='')
            if hasattr(item, 'getImageCaption'):
                legend = item.getImageCaption()

            if not image and item.getProperty('hasContentLeadImage', True):
                (image, legend) = self.contentLeadImage(item, isObject, size)

        elif item.getProperty('hasContentLeadImage', True):
            (image, legend) = self.contentLeadImage(item, isObject, size)

        if hasattr(item, 'contentleadimage'):
            scale = item.unrestrictedTraverse('@@images') if isObject else item.getObject().unrestrictedTraverse('@@images')
            large = scale.scale('contentleadimage', scale=size)
            image = getattr(large, 'url', None)

        if image and not image.startswith('http://'):
            width = re.findall(r'width\s*=\s*["\']([^"\']*)["\']', image)
            if len(width) > 0 and width[0] == '0':
                image = None
            else:
                src = re.findall(r'src\s*=\s*["\']([^"\']*)["\']', image)
                image = src[0] if len(src) > 0 else None

        if image and image.startswith('/'):
            image = '%s%s' % (item.absolute_url() if isObject else item.getURL(), image)

        if not image:
            image = '++resource++unice.medites.images/placeholder_800x600.gif'
            default = True

        return (image, default, legend)

    def contentLeadImage(self, item, isObject, size='large'):
        image = None
        legend = None

        context = aq_inner(item) if isObject else aq_inner(item.getObject())

        field = context.getField(IMAGE_FIELD_NAME)
        if field is not None:
            if field.get_size(context) != 0:
                image = field.tag(context, scale=size, css_class='', title='')

        field = context.getField(IMAGE_CAPTION_FIELD_NAME)
        legend = field.get(context) if field else ''
        return (image, legend)

    def itemDates(self, item, context, request, isObject=False):
        plone = getMultiAdapter((context, request), name="plone")
        if item.portal_type == 'Event':
            start = item.start() if isObject else item.start
            start_localized = plone.toLocalizedTime(start)
            end = item.end() if isObject else item.end
            end_localized = plone.toLocalizedTime(end)
            localized = start_localized if (end - start < 1) else '%s - %s' % (start_localized, end_localized)

            start_hour_localized = plone.toLocalizedTime(start, time_only=1).replace(':', 'h')
            end_hour_localized = plone.toLocalizedTime(end, time_only=1).replace(':', 'h')
        else:
            start = item.effective_date if isObject else item.EffectiveDate()
            if item.portal_type in ['File', 'Image']:
                start = item.Date()

            if start == 'None':
                start = None
            start_localized = None
            if start and start != 'None':
                start = DateTime(start)
                start_localized = plone.toLocalizedTime(start)
            localized = start_localized
            end = None
            end_localized = None

            start_hour_localized = None
            end_hour_localized = None
        return {
            'start': start, 'start_localized': start_localized, 'start_hour_localized': start_hour_localized,
            'end': end, 'end_localized': end_localized, 'end_hour_localized': end_hour_localized,
            'localized': localized}

    def eventLocation(self, item):
        if not item.portal_type == 'Event':
            return None
        return item.location if item.location else None

    def captions(self, item):
        captions = [item['title']]
        captions.append('<br/><small>%s</small>' % item['description'])
        return ''.join(captions)

    def reduce_css(self, reduce_height):
        h = int(reduce_height)/2
        return 'margin-top:-%spx; margin-bottom:-%spx;' % (h, h)

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

    def dateTime(self):
        return DateTime()

    def access(self, context, item, isObject=True):
        user = self.user(context)
        if user:
            roles = user.getRolesInContext(item if isObject else item.getObject()) if item else []
            return ('Manager' in roles or 'Contributor' in roles or 'Editor' in roles, roles)
        return (False, [])

    def user(self, context):
        mt = getToolByName(context, 'portal_membership')
        return mt.getAuthenticatedMember() if not mt.isAnonymousUser() else None

########################################################################################


class Items():

    def items(self, context, request, batch, excludes, desc_max=100, mobile=False, isObjects=None, prefix_themes=None):
        items = []

        for item in batch:
            isObject = False
            if (isinstance(item, tuple) or isinstance(item, list)) and len(item) > 1:
                item = item[1]
                isObject = True

            if not item.id in excludes:
                details = None

                if isObjects:
                    isObject = True

                if not mobile:
                    item_url = item.absolute_url() if isObject else item.getURL()

                    entete = self.getChildbyId(item if isObject else item.getObject(), excludes[0])
                    (default_page_url, default_page_path) = self.getDefaultPageUrl(item)

                    if entete:
                        # Dossier ou collection a un document d'entete
                        details = self.details(context, request, entete, desc_max, True)
                        details['title'] = re.sub(r'^À propos de "(.*)"$', r"\1", details['title'])
                        details['url'] = item_url
                        details['real_url'] = entete.absolute_url()

                    elif default_page_url:
                        # Dossier ou collection a un document en affichage par défaut
                        if not context.absolute_url() == default_page_url:
                            default_page = context.getFolderContents({'path': default_page_path})
                            if len(default_page) > 0:
                                details = self.details(context, request, default_page[0].getObject(), desc_max, True, prefix_themes=prefix_themes)
                    else:
                        try:
                            print item_url
                            print self.getDefaultPageUrl(item.aq_parent)[0]
                            if not item_url == self.getDefaultPageUrl(item.aq_parent)[0]:
                                details = self.details(context, request, item, desc_max, isObject, prefix_themes=prefix_themes)
                        except:
                            details = self.details(context, request, item, desc_max, isObject, prefix_themes=prefix_themes)
                else:
                    details = self.details(context, request, item, desc_max, isObject, prefix_themes=prefix_themes)

                if details:
                    items.append(details)
        return items

    def getDefaultPageUrl(self, item):
        default_page_id = item.getProperty('default_page')
        if default_page_id:
            try:
                obj = item.getObject()
            except:
                obj = item
            return (obj.absolute_url() + '/' + default_page_id, '/'.join(obj.getPhysicalPath()) + '/' + default_page_id)
        return (None, None)

    def details(self, context, request, item, desc_max, isObject=False, prefix_themes=None):
        itemDetails = Item()
        return itemDetails.itemDetails(item, context, request, prefix_themes, [], '', [], {}, desc_max, None, isObject)

    def getChildbyId(self, parent, childId, default=None):
        parentPath = parent.getPhysicalPath()
        path = '/'.join(parentPath) + '/' + childId
        children = parent.getFolderContents({'path': path})
        if len(children) > 0:
            return children[0].getObject()

        return None

    def getFolderContents(self, folder, context, request, omit_exclude_from_nav=False):
        batch = None
        if folder.portal_type == 'Folder' or folder.__class__.__name__ == 'Container':
            batch = folder.listFolderContents()
        elif folder.portal_type == 'Collection':
            batch = folder.results()
        elif folder.portal_type == 'Plone Site':
            batch = self.getPortalContents(context, request)

        if batch:
            items = []
            for item in batch:
                if (isinstance(item, tuple) or isinstance(item, list)) and len(item) > 1:
                    item = item[1]

                if not omit_exclude_from_nav:
                    items.append(item)
                else:
                    exclude = getattr(item, 'exclude_from_nav', False)
                    exclude = exclude() if callable(exclude) else exclude
                    if not exclude:
                        items.append(item)

            return items

        return []

    def getPortalContents(self, context, request):
        context = aq_inner(context)

        portal_properties = getToolByName(context, 'portal_properties')
        self.navtree_properties = getattr(portal_properties, 'navtree_properties')
        self.site_properties = getattr(portal_properties,  'site_properties')
        self.portal_catalog = getToolByName(context, 'portal_catalog')

        result = []
        query = self._getNavQuery(context, request)
        rawresult = self.portal_catalog.searchResults(query)

        idsNotToList = self.navtree_properties.getProperty('idsNotToList', ())
        for item in rawresult:
            if not (item.getId in idsNotToList or item.exclude_from_nav):
                result.append(item.getObject())

        return result

    def _getNavQuery(self, context, request):
        navtree_properties = self.navtree_properties

        customQuery = getattr(context, 'getCustomNavQuery', False)
        if customQuery is not None and utils.safe_callable(customQuery):
            query = customQuery()
        else:
            query = {}

        rootPath = getNavigationRoot(context)
        query['path'] = {'query': rootPath, 'depth': 1}

        blacklist = navtree_properties.getProperty('metaTypesNotToList', ())
        all_types = self.portal_catalog.uniqueValuesFor('portal_type')
        query['portal_type'] = [t for t in all_types if t not in blacklist]

        sortAttribute = navtree_properties.getProperty('sortAttribute', None)
        if sortAttribute is not None:
            query['sort_on'] = sortAttribute
            sortOrder = navtree_properties.getProperty('sortOrder', None)
            if sortOrder is not None:
                query['sort_order'] = sortOrder

        if navtree_properties.getProperty('enable_wf_state_filtering', False):
            query['review_state'] = navtree_properties.getProperty('wf_states_to_show', [])

        query['is_default_page'] = False

        if self.site_properties.getProperty('disable_nonfolderish_sections', False):
            query['is_folderish'] = True

        return query

########################################################################################


class CouleursAgenda():

    def couleur(self, item):
        default = '#006FA4'
        colors = self.couleurs()
        if item:
            subjects = list(item.Subject)
            themes = filter(lambda k: k.startswith('#FilUNSTheme'), subjects)
            if len(themes) > 0 and themes[0] in colors:
                return colors[themes[0]]
        return default

    def couleurs(self):
        return {
            '#FilUNSThemeCulture': '#CF0505',
            '#FilUNSThemeFormation': '#5E3A3C',
            '#FilUNSThemeInstitutionnel': '#006FA4',
            '#FilUNSThemeInternational': '#6A2790',
            '#FilUNSThemeRecherche': '#468500',
            '#FilUNSThemeSport': '#EF9120'
        }
