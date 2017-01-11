# -*- coding: utf-8 -*-

from Products.Five import BrowserView
from Products.CMFCore.utils import getToolByName
from item import Item
from item import Items

import pprint
pp = pprint.PrettyPrinter(indent=4)


class Medites(BrowserView):

    def infos(self):
        return Items().details(self.context, self.request, self.context, isObject=True, desc_max=100)

    def contenus(self):
        return self.navigation(self.context)['items']

    def navigation(self, folder=None):
        if not folder:
            portal_path = getToolByName(self.context, 'portal_url').getPortalPath()
            folder = self.context.restrictedTraverse(str(portal_path), None)

        if folder:
            items = Items()
            batch = items.getFolderContents(folder, self.context, self.request, True)
            listeItems = []
            if batch:
                itemDetails = Item()
                for item in batch:
                    listeItems.append({
                        'item': item,
                        'infos': itemDetails.itemDetails(item, self.context, self.request, '', [], '', [], {}, 100, None, True),
                        'contents': items.getFolderContents(item, self.context, self.request, True)
                    })

                return {'folder': folder, 'items': listeItems}

        return {'folder': folder, 'items': []}

    def champsRepeat(self, type_objet):
        if type_objet:
            # batch = Items().getFolderContents(self.context, self.context, self.request)
            return self.context.listFolderContents(contentFilter={'portal_type': type_objet})
        return []