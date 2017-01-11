# -*- coding: utf-8 -*-

from zope.interface import implements
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleVocabulary, SimpleTerm

from unice.portlet.a_la_une import A_La_UnePortletMessageFactory as _


class ItemDisplayVocabulary(object):
    """Vocabulary factory for item_display.
    """
    implements(IVocabularyFactory)

    def __call__(self, context):
        terms = [
            SimpleTerm('documents_utiles', 'documents_utiles', _(u'Documents utiles')),
            SimpleTerm('faq', 'faq', _(u'Questions fréquentes')),
            SimpleTerm('profils', 'profils', _(u'Focus profils')),
            SimpleTerm('dates_liens', 'dates_liens', _(u'Dates / Liens')),
            SimpleTerm('chiffres_cles', 'chiffres_cles', _(u'Chiffres clés'))
        ]
        return SimpleVocabulary(terms)

ItemDisplayVocabularyFactory = ItemDisplayVocabulary()
