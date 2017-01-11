# -*- coding: utf-8 -*-

from Products.Five import BrowserView
from item import Items
from video import Video

import pprint
pp = pprint.PrettyPrinter(indent=4)


class ESPE(BrowserView):

    ### CLASSEMENTS ############################################################################################

    def document(self, idIndex, desc_max=200):
        items = Items()
        document = items.getChildbyId(self.context, idIndex)
        return items.details(self.context, self.request, document, desc_max, True) if document else None

    def items(self, batch, excludes, desc_max=100):
        items = Items()
        return items.items(self.context, self.request, batch, excludes, desc_max)

    def filtered(self, items, keyword):
        return filter(lambda x: not keyword in x['subjects'], items)

    def video(self, url):
        video = Video(url)
        return video.informations()

    ############################################################################################################

    def tutelles(self, tutelles):
        liste_tutelles = []
        liste = filter(None, tutelles.split('\r\n'))
        keys = liste[::2]
        values = liste[1::2]
        for i in range(len(keys)):
            liste_tutelles.append([keys[i], values[i] if len(values) > i else None])
        return liste_tutelles

    ############################################################################################################

    def laboratoires(self):
        laboratoires = [l.getObject() for l in self.context.portal_catalog({'portal_type': 'laboratoire'})]
        return {x.id: {'title': x.Title(), 'url': x.absolute_url()} for x in laboratoires}

    def chercheurs(self, lab=None):
        chercheurs = [c.getObject() for c in self.context.portal_catalog({'portal_type': 'chercheur'})]
        if lab:
            return filter(lambda c: lab in [c.fonction_lab1, c.fonction_lab2, c.fonction_lab3, c.fonction_lab4, c.fonction_lab5], chercheurs)
        else:
            return chercheurs
