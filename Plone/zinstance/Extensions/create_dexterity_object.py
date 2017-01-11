# -*- coding: utf-8 -*-

from plone.dexterity.utils import createContentInContainer
from zope.component import queryUtility
try:
    from plone.i18n.normalizer.interfaces import IURLNormalizer
    URL_NORMALIZER = True
except ImportError:
    URL_NORMALIZER = False


def create_dexterity_object(folder, type, contents):
    return createContentInContainer(folder, type, checkConstraints=True, **contents)


def get_dexterity_field_data(field):
    return field.data


def remane_dexterity_object(obj, title):
    new_id = queryUtility(IURLNormalizer).normalize(title)
    obj.setId(new_id)
