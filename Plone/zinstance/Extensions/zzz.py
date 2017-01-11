# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName


def zzz_portaltypes(context):
    stats = {}
    x = getToolByName(context, 'portal_catalog')
    index = x._catalog.indexes['portal_type']
    for key in index.uniqueValues():
        t = index._index.get(key)
        if type(t) is not int:
            print '-------------------------------------------------'
            print key
            print t
            for i in t:
                print i
            stats[str(key)] = len(t)
        else:
            stats[str(key)] = 1
    return stats
