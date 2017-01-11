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
    # from Products.LinguaPlone.interfaces import ITranslatable
    LINGUAPLONE_SUPPORT = True
except ImportError:
    # Linguaplone not installed
    LINGUAPLONE_SUPPORT = False

from plone.app.vocabularies.catalog import SearchableTextSourceBinder
from plone.app.form.widgets.uberselectionwidget import UberSelectionWidget
from plone.app.controlpanel.widgets import DropdownChoiceWidget
from plone.memoize import instance

from unice.portlet.navigation import NavigationPortletMessageFactory as _
from zope.i18nmessageid import MessageFactory
__ = MessageFactory("plone")

from unice.templates.browser.item import Item
from unice.templates.browser.item import Items
from urllib import urlencode


class INavigationPortlet(IPortletDataProvider):

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Titre affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "Navigation portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le titre le l'élément sélectionné"),
        required=False,
    )

    omit_header = schema.Bool(
        title=_(u"Masquer le titre du portlet"),
        description=_('help_omit_header',
                      default=u""),
        required=True,
        default=False)


    item_display = Choice(title=_(u'Style graphique du menu'),
        description=_(u'''Choisir le type de menu à utiliser.'''),
        required=True,
        missing_value=tuple(),
        vocabulary="unice.portlet.navigation.item_display_vocabulary")

    logo_img = schema.TextLine(
        title=_(u"Chemin vers le logo"),
        description=_('help_logo_img',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )
    logo_url = schema.TextLine(
        title=_(u"Lien cliquable sur le logo"),
        description=_('help_logo_url',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )
    logo_text = schema.TextLine(
        title=_(u"Texte décrivant le logo"),
        description=_('help_logo_text',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )

    logo2_img = schema.TextLine(
        title=_(u"Chemin vers le logo #2"),
        description=_('help_logo2_img',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )
    logo2_url = schema.TextLine(
        title=_(u"Lien cliquable sur le logo #2"),
        description=_('help_logo2_url',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )
    logo2_text = schema.TextLine(
        title=_(u"Texte décrivant le logo #2"),
        description=_('help_logo2_text',
                      default=u"Uniquement si le style choisi est \"Dégradé avec logo\""),
        required=False,
    )

    z_index = schema.TextLine(
        title=_(u"Valeur du z-index"),
        description=_('help_z_index',
                      default=u"10 par défaut"),
        required=False,
    )

    right_align = schema.Bool(
        title=_(u"Aligner le menu à droite"),
        description=_('help_right_align',
                      default=u""),
        required=True,
        default=False)

    yamm = schema.Bool(
        title=_(u"Utiliser Yamm"),
        description=_('help_yamm',
                      default=u""),
        required=True,
        default=False)

    hide_images = schema.Bool(
        title=_(u"Masquer les images"),
        description=_('help_hide_images',
                      default=u""),
        required=True,
        default=False)

    small_height = schema.Bool(
        title=_(u"Diminuer la hauteur du menu"),
        description=_('help_small_height',
                      default=u""),
        required=True,
        default=False)

    padding_bottom = schema.Bool(
        title=_(u"Ajouter une marge sous le menu"),
        description=_('help_padding_bottom',
                      default=u""),
        required=True,
        default=False)

    hero_mode = schema.Bool(
        title=_(u"Activer le mode \"Hero\""),
        description=_('help_hero_mode',
                      default=u"Affiche la 1ere image du carousel en plein écran, les menus de navigation s'affichent en transparence"),
        required=True,
        default=False)
    hero_mode_top = schema.TextLine(
        title=_(u"Valeur du top en mode \"Hero\" (en px)"),
        description=_('help_hero_mode_top',
                      default=u""),
        required=False,
    )

    icons = schema.Text(title=_(u"Icônes"),
        description=_(u"Une icône par ligne avec le format numero_element|code_icone|masquer_texte (ex : 2|icon-user|1). Voir la liste : http://fortawesome.github.io/Font-Awesome/3.2.1/icons/"),
        required=False)

    dossier_racine = schema.Choice(title=_(u"Dossier contenant le menu à afficher"),
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


class Assignment(base.Assignment):
    implements(INavigationPortlet)

    portlet_title = u''
    dossier_racine = None
    extra_css = u''
    extra_id = u''
    custom_header = u""
    item_display = []
    logo_img = u""
    logo_url = u""
    logo_text = u""
    logo2_img = u""
    logo2_url = u""
    logo2_text = u""
    z_index = u""
    icons = u""
    right_align = False
    yamm = False
    hide_images = False
    small_height = False
    padding_bottom = False
    hero_mode = False
    hero_mode_top = u""
    omit_header = False

    def __init__(self, portlet_title=u'', dossier_racine=None, extra_css=u'', extra_id=u'', custom_header=None, item_display=[], logo_img=None, logo_url=None, logo_text=None, logo2_img=None, logo2_url=None, logo2_text=None, z_index=None, right_align=None, yamm=None, hide_images=None, small_height=None, padding_bottom=None, hero_mode=None, hero_mode_top=None, icons=None, omit_header=None):
        self.portlet_title = portlet_title
        self.dossier_racine = dossier_racine
        self.custom_header = custom_header
        self.logo_img = logo_img
        self.logo_url = logo_url
        self.logo_text = logo_text
        self.logo2_img = logo2_img
        self.logo2_url = logo2_url
        self.logo2_text = logo2_text
        self.z_index = z_index
        self.item_display = item_display
        self.right_align = right_align
        self.yamm = yamm
        self.hide_images = hide_images
        self.small_height = small_height
        self.padding_bottom = padding_bottom
        self.hero_mode = hero_mode
        self.hero_mode_top = hero_mode_top
        self.icons = icons
        self.omit_header = omit_header
        self.extra_css = extra_css
        self.extra_id = extra_id

    @property
    def title(self):
        msg = __(u"Navigation portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    render = ViewPageTemplateFile('navigationportlet.pt')

    @instance.memoizedproperty
    def dossier_racine(self):
        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + (self.data.dossier_racine if self.data.dossier_racine else '')),
            None
        )
        itemDetails = Item()
        listeItems = []
        if folder:
            items = Items()
            batch = items.getFolderContents(folder, self.context, self.request, True)
            if batch:
                for item in batch:
                    details = itemDetails.itemDetails(item, self.context, self.request, '', [], '', [], {}, 100, None, True)
                    # details['contents'] = items.getFolderContents(item, self.context, self.request, True)
                    details['contents'] = []
                    contents = items.getFolderContents(item, self.context, self.request, True)
                    for content in contents:
                        isObject = True
                        if item.portal_type == 'Collection':
                            isObject = False
                        details['contents'].append(items.details(self.context, self.request, content, 100, isObject))
                    listeItems.append(details)

        return listeItems

    def document(self, idIndex, context=None, desc_max=200):
        items = Items()
        document = items.getChildbyId(context or self.context, idIndex)
        return items.details(context or self.context, self.request, document, desc_max, True) if document else None

    def header(self):
        return self.data.custom_header or 'Portlet navigation'

    def cls(self, cls=''):
        if self.data.item_display:
            cls += ' navbar-style-%s' % self.data.item_display

        if self.data.right_align:
            cls += ' navbar-align-right'

        if self.data.yamm:
            cls += ' yamm'

        if self.data.hide_images:
            cls += ' navbar-images-hide'
        else:
            cls += ' navbar-images-show'

        if self.data.small_height:
            cls += ' navbar-height-small'
        else:
            cls += ' navbar-height-normal'

        if self.data.padding_bottom:
            cls += ' navbar-padding-bottom'

        if self.data.hero_mode:
            cls += ' navbar-hero-mode'

        return cls

    def icons(self):
        icons = {}
        if self.data.icons:
            liste = filter(None, self.data.icons.split('\n'))

            def icon(x):
                x = x.split('|')
                x[0] = int(x[0]) - 1
                x[2] = (x[2] == '1')
                return x

            liste = map(icon, liste)
            for l in liste:
                icons[l[0]] = {'icon': 'fa %s' % l[1], 'notext': l[2]}
        return icons

    def urlencode(self, s):
        return urlencode(s)


class AddForm(base.AddForm):
    form_fields = form.Fields(INavigationPortlet)
    form_fields['dossier_racine'].custom_widget = UberSelectionWidget
    form_fields['item_display'].custom_widget = DropdownChoiceWidget

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    form_fields = form.Fields(INavigationPortlet)
    form_fields['dossier_racine'].custom_widget = UberSelectionWidget
    form_fields['item_display'].custom_widget = DropdownChoiceWidget
