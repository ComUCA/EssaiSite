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

from unice.portlet.listing import ListingPortletMessageFactory as _
from zope.i18nmessageid import MessageFactory
__ = MessageFactory("plone")

from unice.templates.browser.item import Items


class IListingPortlet(IPortletDataProvider):

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Titre affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "Listing portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le titre le l'élément sélectionné"),
        required=False,
    )

    item_display = Choice(title=_(u'Type de portlet'),
        description=_(u'''Choisir le type de porlet à utiliser.'''),
        required=True,
        missing_value=tuple(),
        vocabulary="unice.portlet.listing.item_display_vocabulary")

    count_limit = schema.TextLine(
        title=_(u'Nombre maximum d\'éléments dans la liste'),
        description=_('count_limit',
                      default=u'Pensez à renseigner le champs "Texte du footer du portlet" pour afficher un lien vers le dossier ou la collection'),
        required=False,
    )

    portlet_footer = schema.TextLine(
        title=_(u'Texte du footer du portlet'),
        description=_('portlet_footer',
                      default=u'Titre affiché dans le footer du portlet'),
        required=False,
    )

    listing = schema.Choice(title=_(u"DOSSIER À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )

    element01 = schema.Choice(title=_(u"OU ELEMENT 1 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon01 = schema.TextLine(
        title=_(u'Icône de l\'élément 1'),
        required=False,
    )
    cls01 = schema.TextLine(
        title=_(u'Classe CSS du bouton 1'),
        required=False,
    )
    desc01 = schema.TextLine(
        title=_(u'Description de l\'élément 1'),
        required=False,
    )

    element02 = schema.Choice(title=_(u"OU ELEMENT 2 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon02 = schema.TextLine(
        title=_(u'Icône de l\'élément 2'),
        required=False,
    )
    cls02 = schema.TextLine(
        title=_(u'Classe CSS du bouton 2'),
        required=False,
    )
    desc02 = schema.TextLine(
        title=_(u'Description de l\'élément 2'),
        required=False,
    )

    element03 = schema.Choice(title=_(u"OU ELEMENT 3 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon03 = schema.TextLine(
        title=_(u'Icône de l\'élément 3'),
        required=False,
    )
    cls03 = schema.TextLine(
        title=_(u'Classe CSS du bouton 3'),
        required=False,
    )
    desc03 = schema.TextLine(
        title=_(u'Description de l\'élément 3'),
        required=False,
    )

    element04 = schema.Choice(title=_(u"OU ELEMENT 4 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon04 = schema.TextLine(
        title=_(u'Icône de l\'élément 4'),
        required=False,
    )
    cls04 = schema.TextLine(
        title=_(u'Classe CSS du bouton 4'),
        required=False,
    )
    desc04 = schema.TextLine(
        title=_(u'Description de l\'élément 3'),
        required=False,
    )

    element05 = schema.Choice(title=_(u"OU ELEMENT 5 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon05 = schema.TextLine(
        title=_(u'Icône de l\'élément 5'),
        required=False,
    )
    cls05 = schema.TextLine(
        title=_(u'Classe CSS du bouton 5'),
        required=False,
    )
    desc05 = schema.TextLine(
        title=_(u'Description de l\'élément 5'),
        required=False,
    )

    element06 = schema.Choice(title=_(u"OU ELEMENT 6 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon06 = schema.TextLine(
        title=_(u'Icône de l\'élément 6'),
        required=False,
    )
    cls06 = schema.TextLine(
        title=_(u'Classe CSS du bouton 6'),
        required=False,
    )
    desc06 = schema.TextLine(
        title=_(u'Description de l\'élément 6'),
        required=False,
    )

    element07 = schema.Choice(title=_(u"OU ELEMENT 7 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon07 = schema.TextLine(
        title=_(u'Icône de l\'élément 7'),
        required=False,
    )
    cls07 = schema.TextLine(
        title=_(u'Classe CSS du bouton 7'),
        required=False,
    )
    desc07 = schema.TextLine(
        title=_(u'Description de l\'élément 7'),
        required=False,
    )

    element08 = schema.Choice(title=_(u"OU ELEMENT 8 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon08 = schema.TextLine(
        title=_(u'Icône de l\'élément 8'),
        required=False,
    )
    cls08 = schema.TextLine(
        title=_(u'Classe CSS du bouton 8'),
        required=False,
    )
    desc08 = schema.TextLine(
        title=_(u'Description de l\'élément 8'),
        required=False,
    )

    element09 = schema.Choice(title=_(u"OU ELEMENT 9 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon09 = schema.TextLine(
        title=_(u'Icône de l\'élément 9'),
        required=False,
    )
    cls09 = schema.TextLine(
        title=_(u'Classe CSS du bouton 9'),
        required=False,
    )
    desc09 = schema.TextLine(
        title=_(u'Description de l\'élément 9'),
        required=False,
    )

    element10 = schema.Choice(title=_(u"OU ELEMENT 10 À AFFICHER"),
        required=False,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )
    icon10 = schema.TextLine(
        title=_(u'Icône de l\'élément 10'),
        required=False,
    )
    cls10 = schema.TextLine(
        title=_(u'Classe CSS du bouton 10'),
        required=False,
    )
    desc10 = schema.TextLine(
        title=_(u'Description de l\'élément 10'),
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

    popup = schema.Bool(
        title=_(u"Afficher les contenus sous forme de pop-up"),
        description=_('help_popup',
                      default=u""),
        required=True,
        default=False)


class Assignment(base.Assignment):
    implements(IListingPortlet)

    portlet_title = u''
    portlet_footer = u''
    count_limit = u''
    item_display = []
    listing = None
    element01 = None
    element02 = None
    element03 = None
    element04 = None
    element05 = None
    element06 = None
    element07 = None
    element08 = None
    element09 = None
    element10 = None
    icon01 = None
    icon02 = None
    icon03 = None
    icon04 = None
    icon05 = None
    icon06 = None
    icon07 = None
    icon08 = None
    icon09 = None
    icon10 = None
    cls01 = None
    cls02 = None
    cls03 = None
    cls04 = None
    cls05 = None
    cls06 = None
    cls07 = None
    cls08 = None
    cls09 = None
    cls10 = None
    desc01 = None
    desc02 = None
    desc03 = None
    desc04 = None
    desc05 = None
    desc06 = None
    desc07 = None
    desc08 = None
    desc09 = None
    desc10 = None
    extra_css = u''
    extra_id = u''
    custom_header = u""
    omit_header = False
    popup = False

    def __init__(self, portlet_title=u'', count_limit=u'', item_display=[], listing=None, element01=None, element02=None, element03=None, element04=None, element05=None, element06=None, element07=None, element08=None, element09=None, element10=None, icon01=None, icon02=None, icon03=None, icon04=None, icon05=None, icon06=None, icon07=None, icon08=None, icon09=None, icon10=None,  cls01=None, cls02=None, cls03=None, cls04=None, cls05=None, cls06=None, cls07=None, cls08=None, cls09=None, cls10=None, desc01=None, desc02=None, desc03=None, desc04=None, desc05=None, desc06=None, desc07=None, desc08=None, desc09=None, desc10=None, portlet_footer=u'', extra_css=u'', extra_id=u'', custom_header=None, omit_header=None, popup=None):
        self.portlet_title = portlet_title
        self.count_limit = count_limit
        self.portlet_footer = portlet_footer
        self.item_display = item_display
        self.element01 = element01
        self.element02 = element02
        self.element03 = element03
        self.element04 = element04
        self.element05 = element05
        self.element06 = element06
        self.element07 = element07
        self.element08 = element08
        self.element09 = element09
        self.element10 = element10

        self.icon01 = icon01
        self.icon02 = icon02
        self.icon03 = icon03
        self.icon04 = icon04
        self.icon05 = icon05
        self.icon06 = icon06
        self.icon07 = icon07
        self.icon08 = icon08
        self.icon09 = icon09
        self.icon10 = icon10

        self.cls01 = cls01
        self.cls02 = cls02
        self.cls03 = cls03
        self.cls04 = cls04
        self.cls05 = cls05
        self.cls06 = cls06
        self.cls07 = cls07
        self.cls08 = cls08
        self.cls09 = cls09
        self.cls10 = cls10

        self.desc01 = desc01
        self.desc02 = desc02
        self.desc03 = desc03
        self.desc04 = desc04
        self.desc05 = desc05
        self.desc06 = desc06
        self.desc07 = desc07
        self.desc08 = desc08
        self.desc09 = desc09
        self.desc10 = desc10

        self.listing = listing
        self.custom_header = custom_header
        self.omit_header = omit_header
        self.extra_css = extra_css
        self.extra_id = extra_id
        self.popup = popup

    @property
    def title(self):
        msg = __(u"Listing portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    render = ViewPageTemplateFile('listingportlet.pt')

    @instance.memoizedproperty
    def listing(self):
        allItems = []
        items = Items()

        debug = 'init'
        if not self.data.listing:
            debug = 'no listing'

        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + self.data.listing),
            None
        ) if self.data.listing else None

        if not folder:
            debug = 'restrictedTraverse : '+portal_path

        if folder:
            batch = None
            if folder.portal_type == 'Folder':
                batch = folder.items()
            elif folder.portal_type == 'Collection':
                batch = self.context.filter_collection_results(folder)
            else:
                batch = [folder]

            if batch:
                listeItems = items.items(folder, self.request, batch, ['page.html'])
                if self.data.count_limit and not self.data.count_limit == '':
                    try:
                        listeItems = listeItems[0: int(self.data.count_limit)]
                    except:
                        pass

                for item in listeItems:
                    item['n_chiffre'] = len(item['item'].chiffre) if item['type'] == 'chiffre_cle' else 0
                    item['cls'] = ''

                allItems = listeItems

        elements = [self.data.element01, self.data.element02, self.data.element03, self.data.element04, self.data.element05, self.data.element06, self.data.element07, self.data.element08, self.data.element09, self.data.element10]
        icons = [self.data.icon01, self.data.icon02, self.data.icon03, self.data.icon04, self.data.icon05, self.data.icon06, self.data.icon07, self.data.icon08, self.data.icon09, self.data.icon10]
        clss = [self.data.cls01, self.data.cls02, self.data.cls03, self.data.cls04, self.data.cls05, self.data.cls06, self.data.cls07, self.data.cls08, self.data.cls09, self.data.cls10]
        descs = [self.data.desc01, self.data.desc02, self.data.desc03, self.data.desc04, self.data.desc05, self.data.desc06, self.data.desc07, self.data.desc08, self.data.desc09, self.data.desc10]
        for i in range(len(elements)):
            element = elements[i]
            icon = icons[i]
            cls = clss[i]
            desc = descs[i]
            if element:
                el = self.context.restrictedTraverse(
                    str(portal_path + element),
                    None
                )
                details = items.details(self.context, self.request, el, 100, True)
                details['n_chiffre'] = 0
                details['icon'] = icon
                details['cls'] = cls
                details['desc'] = desc
                allItems.append(details)

        return {'folder': folder, 'items': allItems, 'debug': debug}

    def header(self):
        if self.data.custom_header:
            return self.data.custom_header
        else:
            folder = self.listing['folder']
            if folder:
                return folder.Title()
        return ''


class AddForm(base.AddForm):
    form_fields = form.Fields(IListingPortlet)
    form_fields['listing'].custom_widget = UberSelectionWidget
    form_fields['element01'].custom_widget = UberSelectionWidget
    form_fields['element02'].custom_widget = UberSelectionWidget
    form_fields['element03'].custom_widget = UberSelectionWidget
    form_fields['element04'].custom_widget = UberSelectionWidget
    form_fields['element05'].custom_widget = UberSelectionWidget
    form_fields['element06'].custom_widget = UberSelectionWidget
    form_fields['element07'].custom_widget = UberSelectionWidget
    form_fields['element08'].custom_widget = UberSelectionWidget
    form_fields['element09'].custom_widget = UberSelectionWidget
    form_fields['element10'].custom_widget = UberSelectionWidget
    form_fields['item_display'].custom_widget = DropdownChoiceWidget

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    form_fields = form.Fields(IListingPortlet)
    form_fields['listing'].custom_widget = UberSelectionWidget
    form_fields['element01'].custom_widget = UberSelectionWidget
    form_fields['element02'].custom_widget = UberSelectionWidget
    form_fields['element03'].custom_widget = UberSelectionWidget
    form_fields['element04'].custom_widget = UberSelectionWidget
    form_fields['element05'].custom_widget = UberSelectionWidget
    form_fields['element06'].custom_widget = UberSelectionWidget
    form_fields['element07'].custom_widget = UberSelectionWidget
    form_fields['element08'].custom_widget = UberSelectionWidget
    form_fields['element09'].custom_widget = UberSelectionWidget
    form_fields['element10'].custom_widget = UberSelectionWidget
    form_fields['item_display'].custom_widget = DropdownChoiceWidget
