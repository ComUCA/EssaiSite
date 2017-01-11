#from zope.interface import implements
#from zope.schema.interfaces import IContextSourceBinder
from zope.schema.vocabulary import SimpleVocabulary

from zope.component.hooks import getSite

import pprint
pp = pprint.PrettyPrinter(indent=4)

# class Binder(object):
#     implements(IContextSourceBinder)

#     def __init__(self):
#         pass

#     def __call__(self, context):
#         return SimpleVocabulary.fromValues(['a', 'd', 'f'])


# dummy_binder = Binder()
dummy_vocabulary_instance = SimpleVocabulary.fromItems([(1, 'a'), (2, 'c')])

#pp.pprint(self.context.portal_catalog({'portal_type': 'laboratoire'}))
#catalog = api.portal.get_tool(name='portal_catalog')
#pp.pprint(catalog)


def laboratoires():
    catalog = getSite().portal_catalog
    # pp.pprint(catalog.searchResults({'portal_type': 'laboratoire'}))
    all_brains = catalog.searchResults({'sort_on': 'path'}, show_all=1)
    for brain in all_brains:
        print brain.getPath().split('/')
        #print brain.getURL()
        #print "Name:" + brain["Title"] + " URL:" + brain.getURL()

    return SimpleVocabulary.fromItems([(1, 'zzz'), (2, 'uuu')])

labs = laboratoires()
