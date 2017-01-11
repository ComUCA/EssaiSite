# -*- coding: utf-8 -*-
from zope import schema
from Products.CMFDefault.formlib.schema import SchemaAdapterBase
from zope.formlib.textwidgets import TextAreaWidget
from zope.interface import Interface
from Products.CMFPlone.interfaces import IPloneSiteRoot
from zope.interface import implements
from zope.component import adapts
from zope.formlib import form
from plone.app.controlpanel.form import ControlPanelForm
from plone.registry.interfaces import IRegistry
from zope.component import getUtility


class IIntranetControlPanel(Interface):
    groupes_cas = schema.Text(
        title=u'Schéma des groupes CAS',
        description=u'',
        default=u'',
        required=False,
    )


class IntranetControlPanelAdapter(SchemaAdapterBase):
    adapts(IPloneSiteRoot)
    implements(IIntranetControlPanel)

    def __init__(self, context):
        super(IntranetControlPanelAdapter, self).__init__(context)
        self.registry = getUtility(IRegistry)

    def get_groupes_cas(self):
        return self.registry['intranet.groupes_cas']

    def set_groupes_cas(self, value):
        self.registry['intranet.groupes_cas'] = value

    groupes_cas = property(get_groupes_cas, set_groupes_cas)


class MaxTextAreaWidget(TextAreaWidget):
    height = 20


class IntranetControlPanelForm(ControlPanelForm):
    form_fields = form.FormFields(IIntranetControlPanel)
    form_fields['groupes_cas'].custom_widget = MaxTextAreaWidget

    label = u'Intranet Settings'
    description = u'Intranet Settings'
    form_name = u'Intranet Settings'
