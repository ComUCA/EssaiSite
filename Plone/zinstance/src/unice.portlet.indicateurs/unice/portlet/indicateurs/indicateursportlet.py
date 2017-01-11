#!/usr/bin/env python
# -*- coding: utf-8 -*-

from zope.interface import implements

from plone.portlets.interfaces import IPortletDataProvider
from plone.app.portlets.portlets import base

from zope import schema
from zope.formlib import form

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.CMFCore.utils import getToolByName

try:
    from Products.LinguaPlone.interfaces import ITranslatable
    LINGUAPLONE_SUPPORT = True
except ImportError:
    # Linguaplone not installed
    LINGUAPLONE_SUPPORT = False

from plone.app.vocabularies.catalog import SearchableTextSourceBinder
from plone.app.form.widgets.uberselectionwidget import UberSelectionWidget
from plone.app.controlpanel.widgets import MultiCheckBoxVocabularyWidget
from plone.memoize import instance

from unice.portlet.indicateurs import IndicateursPortletMessageFactory as _
from zope.i18nmessageid import MessageFactory
__ = MessageFactory("plone")

from Acquisition import aq_inner
from collective.contentleadimage.config import IMAGE_FIELD_NAME
from collective.contentleadimage.config import IMAGE_CAPTION_FIELD_NAME
from zope.component import getUtility
from Products.CMFPlone.interfaces import IPloneSiteRoot
from collective.contentleadimage.leadimageprefs import ILeadImagePrefsForm

from zope.component import getMultiAdapter

import re
import urllib2

from unice.templates.browser.item import Item
from unice.templates.browser.item import Items
from services.addthis import AddThis
from services.google_analytics import GoogleAnalytics
from services.locales import Locales


class IIndicateursPortlet(IPortletDataProvider):
    """A portlet

    It inherits from IPortletDataProvider because for this portlet, the
    data that is being rendered and the portlet assignment itself are the
    same.
    """

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Indicateurs affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "Indicateurs portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le indicateurs le l'élément sélectionné"),
        required=False,
    )

    filters = schema.TextLine(
        title=_(u"Rubrique(s) à afficher"),
        description=_('help_filters',
                      default=u"Soit l'identifiant de la rubrique (ex : 'universite'), soit le chemin (ex : 'universite/les-composantes'), soit une liste d'identifiants ou chemins séparés par '|'"),
        required=False,
    )

    google_profile_id = schema.TextLine(
        title=_(u"Google analytics : identifiant du profile"),
        description=_('help_google_profile_id',
                      default=u""),
        required=False,
    )

    addthis_pubid = schema.TextLine(
        title=_(u"AddThis : identifiant du profile"),
        description=_('help_addthis_pubid',
                      default=u""),
        required=False,
    )
    addthis_pubid = schema.TextLine(
        title=_(u"AddThis : identifiant du profile"),
        description=_('help_addthis_pubid',
                      default=u""),
        required=False,
    )
    addthis_username = schema.TextLine(
        title=_(u"AddThis : nom d'utilisateur"),
        description=_('help_addthis_username',
                      default=u""),
        required=False,
    )
    addthis_password = schema.TextLine(
        title=_(u"AddThis : mot de passe"),
        description=_('help_addthis_password',
                      default=u""),
        required=False,
    )

    extra_id = schema.TextLine(
        title=_(u'Identifiant CSS à ajouter au portlet'),
        description=_('help_extra_id',
                      default=u""),
        default=u'',
        required=False,
    )
    extra_css = schema.TextLine(
        title=_(u'Classes CSS à ajouter au portlet'),
        description=_('help_extra_css',
                      default=u""),
        default=u'',
        required=False,
    )

    omit_header = schema.Bool(
        title=_(u"Masquer le header du portlet"),
        description=_('help_omit_header',
                      default=u""),
        required=True,
        default=False)


class Assignment(base.Assignment):
    """Portlet assignment.

    This is what is actually managed through the portlets UI and associated
    with columns.
    """

    implements(IIndicateursPortlet)

    portlet_title = u''
    filters = u''
    google_profile_id = u''
    addthis_pubid = u''
    addthis_username = u''
    addthis_password = u''
    extra_css = u''
    extra_id = u''
    custom_header = u""
    omit_header = False

    def __init__(self, portlet_title=u'', filters=u'', google_profile_id=u'', addthis_pubid=u'', addthis_username=u'', addthis_password=u'', extra_css=u'', extra_id=u'', custom_header=None, omit_header=None):
        self.portlet_title = portlet_title
        self.filters = filters
        self.google_profile_id = google_profile_id
        self.addthis_pubid = addthis_pubid
        self.addthis_username = addthis_username
        self.addthis_password = addthis_password
        self.custom_header = custom_header
        self.omit_header = omit_header
        self.extra_css = extra_css
        self.extra_id = extra_id

    @property
    def title(self):
        """This property is used to give the title of the portlet in the
        "manage portlets" screen.
        """
        msg = __(u"Indicateurs portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    """Portlet renderer.

    This is registered in configure.zcml. The referenced page template is
    rendered, and the implicit variable 'view' will refer to an instance
    of this class. Other methods can be added and referenced in the template.
    """

    render = ViewPageTemplateFile('indicateursportlet.pt')

    def widgets(self):
        google = self.google_analytics()
        #addthis = self.addthis()

        widgets = []
        if google:
            widgets.append(google.getTotalUsers(filters=self.data.filters))
            widgets.append(google.getTopPagesViews(filters=self.data.filters))
            widgets.append(google.getSocialTraffic(filters=self.data.filters))
            widgets.append(google.getKeywords(filters=self.data.filters))

        return widgets

    def addthis(self):
        if self.data.addthis_pubid and self.data.addthis_username and self.data.addthis_password:
            return AddThis(self.data.addthis_pubid, self.data.addthis_username, self.data.addthis_password)
        return None

    def google_analytics(self):
        if self.data.google_profile_id:
            return GoogleAnalytics(self.data.google_profile_id)
        return None

    def locale(self, key, format=None):
        locales = Locales().locales()
        locale = locales[key] if key in locales else key
        l = format % locale if format else locale
        try:
            l = l.encode('utf-8')
        except:
            pass
        title = ' — %s' % self.context.portal_url.getPortalObject().Title()
        return self.trim_end(l, title)

    def icon(self, key):
        icons = Locales().icons()
        return '<i class="%s fa-fw"></i>' % icons[key] if key in icons else ''

    def page_title(self):
        if 'url' in self.request.form:
            url = '%s?ajax_load=1' % self.request.form['url']
            html = urllib2.urlopen(url).read()
            matches = re.findall(r'<\s*h1[^>]*>([^<]*)<\s*\/\s*h1\s*>', html)
            if len(matches) > 0:
                return matches[0].strip()
        return ''

    def format(self, interger):
        return '{0:,}'.format(interger).replace(',', ' ')

    def access(self, item=None):
        if not item:
            item = self.context
        (access, roles) = Item().access(self.context, item)
        return access

    def header(self):
        if self.data.custom_header:
            return self.data.custom_header
        else:
            return 'Indicateurs'

    def trim_end(self, astring, trailing):
        thelen = len(trailing)
        if astring.endswith(trailing):
            return astring[:-thelen]
        return astring


class AddForm(base.AddForm):
    """Portlet add form.

    This is registered in configure.zcml. The form_fields variable tells
    zope.formlib which fields to display. The create() method actually
    constructs the assignment that is being added.
    """
    form_fields = form.Fields(IIndicateursPortlet)

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    """Portlet edit form.

    This is registered with configure.zcml. The form_fields variable tells
    zope.formlib which fields to display.
    """
    form_fields = form.Fields(IIndicateursPortlet)
