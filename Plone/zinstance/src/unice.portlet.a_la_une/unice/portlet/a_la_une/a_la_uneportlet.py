#!/usr/bin/env python
# -*- coding: utf-8 -*-

from zope.interface import implements

from plone.portlets.interfaces import IPortletDataProvider
from plone.app.portlets.portlets import base

from zope import schema
from zope.formlib import form
from zope.schema import Choice

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
from plone.app.controlpanel.widgets import DropdownChoiceWidget
from plone.memoize import instance

from unice.portlet.a_la_une import A_La_UnePortletMessageFactory as _
from zope.i18nmessageid import MessageFactory
__ = MessageFactory("plone")

from unice.templates.browser.item import Items
import uuid


class IA_La_UnePortlet(IPortletDataProvider):

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Titre affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "A_La_Une portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le titre le l'élément sélectionné"),
        required=False,
    )

    portlet_footer = schema.TextLine(
        title=_(u'Texte du footer du portlet'),
        description=_('portlet_footer',
                      default=u'Titre affiché dans le footer du portlet'),
        required=False,
    )

    dossier_actualite = schema.Choice(title=_(u"Dossier contenant l'actualité à afficher"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
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
    implements(IA_La_UnePortlet)

    portlet_title = u''
    portlet_footer = u''
    dossier_actualite = None
    extra_css = u''
    extra_id = u''
    custom_header = u""
    omit_header = False

    def __init__(self, portlet_title=u'', dossier_actualite=None, portlet_footer=u'', extra_css=u'', extra_id=u'', custom_header=None, omit_header=None):
        self.portlet_title = portlet_title
        self.portlet_footer = portlet_footer
        self.dossier_actualite = dossier_actualite
        self.custom_header = custom_header
        self.omit_header = omit_header
        self.extra_css = extra_css
        self.extra_id = extra_id

    @property
    def title(self):
        msg = __(u"A_La_Une portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    render = ViewPageTemplateFile('a_la_uneportlet.pt')

    @instance.memoizedproperty
    def dossier_actualite(self):
        if not self.data.dossier_actualite:
            return None

        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + self.data.dossier_actualite),
            None
        )

        if folder:
            batch = None
            if folder.portal_type == 'Folder':
                batch = folder.items()
            elif folder.portal_type == 'Collection':
                # batch = folder.results()
                batch = self.context.filter_collection_results(folder)
            else:
                batch = [folder]

            if batch:
                items = Items()
                listeItems = items.items(folder, self.request, batch, ['page.html'])
                item = None
                try:
                    item = listeItems[0]
                except:
                    pass

                return {'folder': folder, 'item': item, 'uuid': str(uuid.uuid1())}

        return {'folder': folder, 'item': None, 'uuid': str(uuid.uuid1())}

    def header(self):
        return self.data.custom_header or self.dossier.Title()


class AddForm(base.AddForm):
    form_fields = form.Fields(IA_La_UnePortlet)
    form_fields['dossier_actualite'].custom_widget = UberSelectionWidget

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    form_fields = form.Fields(IA_La_UnePortlet)
    form_fields['dossier_actualite'].custom_widget = UberSelectionWidget
