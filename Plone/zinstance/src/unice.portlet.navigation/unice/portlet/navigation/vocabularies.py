# -*- coding: utf-8 -*-

from zope.interface import implements
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleVocabulary, SimpleTerm

from unice.portlet.navigation import NavigationPortletMessageFactory as _


class ItemDisplayVocabulary(object):
    """Vocabulary factory for item_display.
    """
    implements(IVocabularyFactory)

    def __call__(self, context):
        terms = [
            SimpleTerm('default', 'default', _(u'Par défaut')),
            SimpleTerm('noir', 'noir', _(u'Fond noir')),
            SimpleTerm('blanc', 'blanc', _(u'Fond blanc')),
            SimpleTerm('logo', 'logo', _(u'Dégradé avec logo')),
            SimpleTerm('principal', 'principal', _(u'Menu principal')),
            SimpleTerm('plan', 'plan', _(u'Plan du site')),
            SimpleTerm('footer', 'footer', _(u'Pied de page')),
        ]
        return SimpleVocabulary(terms)

ItemDisplayVocabularyFactory = ItemDisplayVocabulary()
