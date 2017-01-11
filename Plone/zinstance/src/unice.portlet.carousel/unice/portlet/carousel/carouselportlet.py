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

from unice.portlet.carousel import CarouselPortletMessageFactory as _
from zope.i18nmessageid import MessageFactory
__ = MessageFactory("plone")

from unice.templates.browser.item import Items
import uuid


class ICarouselPortlet(IPortletDataProvider):

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Titre affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "Carousel portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le titre le l'élément sélectionné"),
        required=False,
    )

    captions_hidden = schema.Bool(
        title=_(u"Masquer les légendes"),
        description=_('captions_hidden',
                      default=u""),
        required=True,
        default=False)

    captions_out = schema.Bool(
        title=_(u"Ne pas superposer les légendes et les images"),
        description=_('captions_out',
                      default=u""),
        required=True,
        default=False)

    captions_block = schema.Bool(
        title=_(u"Afficher les légendes sous forme de blocs"),
        description=_('captions_block',
                      default=u""),
        required=True,
        default=False)

    display_type = Choice(title=_(u'Mode d\'affichage'),
        description=_(u'''Choisir le mode d'affiche du porlet'''),
        required=True,
        missing_value=tuple(),
        vocabulary="unice.portlet.carousel.display_type_vocabulary")

    hero_mode = schema.Bool(
        title=_(u"Activer le mode \"Hero\""),
        description=_('help_hero_mode',
                      default=u"Affiche la 1ere image du carousel en plein écran, les menus de navigation s'affichent en transparence"),
        required=True,
        default=False)

    dossier_carousel = schema.Choice(title=_(u"Dossier contenant le carousel à afficher"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )

    dossier_listing = schema.Choice(title=_(u"Dossier contenant le listing à afficher"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    listing_color = schema.TextLine(
        title=_(u'Couleur de fond du listing'),
        description=_('help_extra_id',
                      default=u""),
        default=u'',
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
    implements(ICarouselPortlet)

    portlet_title = u''
    dossier_carousel = None
    dossier_listing = None
    listing_color = None
    captions_hidden = False
    captions_out = False
    captions_block = False
    display_type = []
    hero_mode = False
    extra_css = u''
    extra_id = u''
    custom_header = u""
    omit_header = False

    def __init__(self, portlet_title=u'', dossier_carousel=None, dossier_listing=None, listing_color=None, captions_hidden=None, captions_out=None, captions_block=None, display_type=[], hero_mode=None, extra_css=u'', extra_id=u'', custom_header=None, omit_header=None):
        self.portlet_title = portlet_title
        self.dossier_carousel = dossier_carousel
        self.dossier_listing = dossier_listing
        self.listing_color = listing_color
        self.captions_hidden = captions_hidden
        self.captions_out = captions_out
        self.captions_block = captions_block
        self.display_type = display_type
        self.hero_mode = hero_mode
        self.custom_header = custom_header
        self.omit_header = omit_header
        self.extra_css = extra_css
        self.extra_id = extra_id

    @property
    def title(self):
        msg = __(u"Carousel portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    render = ViewPageTemplateFile('carouselportlet.pt')

    @instance.memoizedproperty
    def dossier_carousel(self):
        if not self.data.dossier_carousel:
            return None

        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + self.data.dossier_carousel),
            None
        )

        if folder:
            batch = None
            if folder.portal_type == 'Folder':
                batch = folder.items()
            elif folder.portal_type == 'Collection':
                batch = folder.results()
            else:
                batch = [folder]

            if batch:
                items = Items()
                listeItems = items.items(folder, self.request, batch, ['page.html'])

                return {'folder': folder, 'items': listeItems, 'uuid': str(uuid.uuid1())}

        return {'folder': folder, 'items': [], 'uuid': str(uuid.uuid1())}

    def dossier_listing(self):
        if not self.data.dossier_listing:
            return None

        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + self.data.dossier_listing),
            None
        )

        if folder:
            batch = None
            if folder.portal_type == 'Folder':
                batch = folder.items()
            elif folder.portal_type == 'Collection':
                batch = folder.results()
            else:
                batch = [folder]

            if batch:
                items = Items()
                listeItems = items.items(folder, self.request, batch, ['page.html'])
                try:
                    listeItems = listeItems[0:6]
                except:
                    pass

                return {'folder': folder, 'items': listeItems, 'uuid': str(uuid.uuid1())}

        return None

    def captions(self, item):
        return '<strong>%s</strong><br/><small>%s</small>' % (item['title'], item['description'])

    def header(self):
        return self.data.custom_header or self.dossier.Title()


class AddForm(base.AddForm):
    form_fields = form.Fields(ICarouselPortlet)
    form_fields['dossier_carousel'].custom_widget = UberSelectionWidget
    form_fields['dossier_listing'].custom_widget = UberSelectionWidget
    form_fields['display_type'].custom_widget = DropdownChoiceWidget

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    form_fields = form.Fields(ICarouselPortlet)
    form_fields['dossier_carousel'].custom_widget = UberSelectionWidget
    form_fields['dossier_listing'].custom_widget = UberSelectionWidget
    form_fields['display_type'].custom_widget = DropdownChoiceWidget
