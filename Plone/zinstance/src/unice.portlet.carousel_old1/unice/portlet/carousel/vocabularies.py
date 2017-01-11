# -*- coding: utf-8 -*-

from zope.interface import implements
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleVocabulary, SimpleTerm

from unice.portlet.carousel import CarouselPortletMessageFactory as _


class ItemDisplayVocabulary(object):
    """Vocabulary factory for item_display.
    """
    implements(IVocabularyFactory)

    def __call__(self, context):
        terms = [
            SimpleTerm('bandeau', 'bandeau', _(u'Bandeau principal')),
            SimpleTerm('composante', 'composante', _(u'Carousel dans une composante')),
            SimpleTerm('contenu', 'contenu', _(u'Carousel dans le contenu')),
            SimpleTerm('colonne', 'colonne', _(u'Carousel dans une colonne')),
        ]
        return SimpleVocabulary(terms)

ItemDisplayVocabularyFactory = ItemDisplayVocabulary()
