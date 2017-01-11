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

from unice.portlet.agenda import AgendaPortletMessageFactory as _
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

from unice.templates.browser.item import Items

class IAgendaPortlet(IPortletDataProvider):
    """A portlet

    It inherits from IPortletDataProvider because for this portlet, the
    data that is being rendered and the portlet assignment itself are the
    same.
    """

    portlet_title = schema.TextLine(
        title=_(u'Titre du portlet dans le manager'),
        description=_('help_portlet_title',
                      default=u'Agenda affiché dans l\'ecran "@@manage-portlets". '
                               'Laisser vide pour "Agenda portlet".'),
        required=False,
    )

    custom_header = schema.TextLine(
        title=_(u"Titre du portlet"),
        description=_('help_custom_header',
                      default=u"Laisser vide pour afficher le agenda le l'élément sélectionné"),
        required=False,
    )

    count_limit = schema.TextLine(
        title=_(u'Nombre maximum d\'éléments dans la liste'),
        description=_('count_limit',
                      default=u'Pensez à renseigner le champs "Texte du footer du portlet" pour afficher un lien vers le dossier ou la collection'),
        required=False,
    )

    agenda = schema.Choice(title=_(u"Elément à afficher"),
        required=True,
        source=SearchableTextSourceBinder(
            {},
            default_query='path:'
        )
    )

    more_link = schema.TextLine(
        title=_(u'Lien "En savoir plus"'),
        description=_('help_more_link',
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
    """Portlet assignment.

    This is what is actually managed through the portlets UI and associated
    with columns.
    """

    implements(IAgendaPortlet)

    portlet_title = u''
    count_limit = u''
    agenda = None
    more_link = u''
    extra_css = u''
    extra_id = u''
    custom_header = u""
    omit_header = False

    def __init__(self, portlet_title=u'', count_limit=u'', agenda=None, more_link=u'', extra_css=u'', extra_id=u'', custom_header=None, omit_header=None):
        self.portlet_title = portlet_title
        self.count_limit = count_limit
        self.agenda = agenda
        self.custom_header = custom_header
        self.omit_header = omit_header
        self.more_link = more_link
        self.extra_css = extra_css
        self.extra_id = extra_id

    @property
    def title(self):
        """This property is used to give the title of the portlet in the
        "manage portlets" screen.
        """
        msg = __(u"Agenda portlet")
        return self.portlet_title or msg


class Renderer(base.Renderer):
    """Portlet renderer.

    This is registered in configure.zcml. The referenced page template is
    rendered, and the implicit variable 'view' will refer to an instance
    of this class. Other methods can be added and referenced in the template.
    """

    render = ViewPageTemplateFile('agendaportlet.pt')

    @instance.memoizedproperty
    def agenda(self):
        allItems = []
        items = Items()

        portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
        folder = self.context.restrictedTraverse(
            str(portal_path + self.data.agenda),
            None
        ) if self.data.agenda else None

        if folder:
            batch = None
            if folder.portal_type == 'Folder':
                batch = folder.items()
            elif folder.portal_type == 'Collection':
                batch = folder.results()
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

                allItems = listeItems

        return {'folder': folder, 'items': allItems}

    def captions(self, item):
        start = item['dates']['start']
        parts = start.parts() if start else ['', 0, '-']
        mois = ['-', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
        date = '<em>%s<br/>%s</em>' % (parts[2], mois[parts[1]])
        return '%s<strong>%s</strong><br/><small>%s</small>' % (date, item['title'], item['description'])

    def header(self):
        if self.data.custom_header:
            return self.data.custom_header
        else:
            folder = self.agenda['folder']
            if folder:
                return folder.Title()
        return ''


class AddForm(base.AddForm):
    """Portlet add form.

    This is registered in configure.zcml. The form_fields variable tells
    zope.formlib which fields to display. The create() method actually
    constructs the assignment that is being added.
    """
    form_fields = form.Fields(IAgendaPortlet)
    form_fields['agenda'].custom_widget = UberSelectionWidget

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    """Portlet edit form.

    This is registered with configure.zcml. The form_fields variable tells
    zope.formlib which fields to display.
    """
    form_fields = form.Fields(IAgendaPortlet)
    form_fields['agenda'].custom_widget = UberSelectionWidget
