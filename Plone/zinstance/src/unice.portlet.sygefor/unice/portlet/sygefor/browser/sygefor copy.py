# -*- coding: utf-8 -*-

from Products.Five import BrowserView

from xml.dom.minidom import parseString
from urllib2 import Request, urlopen
import unicodedata
import string
#import json

import pprint
pp = pprint.PrettyPrinter(indent=4)


class Sygefor(BrowserView):

    # def getJson(self):
    #     if 'sygefor' in self.request.form:
    #         sygefor = self.sygefor(self.request.form['sygefor'])
    #         return json.dumps(sygefor)

    #     return None

    def getSygefor(self):
        if 'sygefor' in self.request.form:
            sygefor = self.sygefor(self.request.form['sygefor'])
            return sygefor

        return None

    def stages(self, stages, public, thematique):
        print '==================================='
        print len(stages)
        print public
        print thematique
        for s in stages:
            print s['publics']
            print s['thematiques']
        stages = [s for s in stages if public in s['publics'] and thematique in s['thematiques']]
        return sorted(stages, key=lambda k: k['intitule'])

    def sygefor(self, url):
        source = self.readUrl(url)

        if source[0]:
            stages = []
            publics = {}
            keys = {}

            xmldoc = parseString(source[1])

            nodesStage = self.searchNodes(xmldoc, 'stage')
            for nodeStage in nodesStage:

                # Determination des publics et des thématique
                stagePublics = [n.childNodes[0].nodeValue for n in self.searchNodes(nodeStage, 'public')]
                stageThematiques = [n.childNodes[0].nodeValue for n in self.searchNodes(nodeStage, 'thematique')]

                # Eclusion des stages sans public ou thématique
                if len(stagePublics) > 0 and len(stageThematiques) > 0:

                    print '---------------------------------------------------------------------------------'
                    print self.nodeValue(nodeStage, 'intitule').encode('utf-8')
                    pp.pprint(stageThematiques)

                    for public in stagePublics:
                        keyPublic = self.remove_accents(public)
                        keys[keyPublic] = public
                        if not keyPublic in publics:
                            publics[keyPublic] = []

                    for thematique in stageThematiques:
                        keyThematique = self.remove_accents(thematique)
                        keys[keyThematique] = thematique
                        if not keyThematique in publics[keyPublic]:
                            publics[keyPublic].append(keyThematique)

                    stage = {}
                    stage['publics'] = stagePublics
                    stage['thematiques'] = stageThematiques
                    stage['public'] = ', '.join(stagePublics)

                    tags = ['id', 'num', 'annee', 'semestre', 'intitule', 'objectifs', 'contenu', 'prerequis',  'publicconcernes', 'type', 'tp', 'evaluation']
                    for tag in tags:
                        stage[tag] = self.nodeValue(nodeStage, tag)

                    nodesSession = self.searchNodes(nodeStage, 'session')
                    stage['sessions'] = {}
                    for nodeSession in nodesSession:
                        session = {}

                        idSession = self.nodeValue(nodeSession, 'id')  # or '1' * randint(1, 2)
                        session['id'] = idSession

                        tags = ['date', 'datefin', 'duree', 'max', 'tarif', 'lieu', 'lieugeneralSession', 'horairesdeb', 'horairesfin']
                        for tag in tags:
                            session[tag] = self.nodeValue(nodeSession, tag)

                        session['horairesdeb'] = self.formatDate(session['horairesdeb'])
                        session['horairesfin'] = self.formatDate(session['horairesfin'])

                        if not idSession in stage['sessions']:
                            stage['sessions'][idSession] = []
                        stage['sessions'][idSession].append(session)

                    stages.append(stage)

            return {'stages': stages, 'publics': publics, 'keys': keys}
        else:
            return None

    #########################################################################################

    def searchNodes(self, doc, tag):
        return doc.getElementsByTagName(tag)

    def nodeValue(self, doc, tag):
        nodes = self.searchNodes(doc, tag)
        if len(nodes) > 0:
            children = nodes[0].childNodes
            if len(children) > 0:
                value = children[0].nodeValue
                return value
        return None

    def readUrl(self, someurl):
        req = Request(someurl)
        try:
            handle = urlopen(req)
            return (True, handle.read())
        except IOError, e:
            if hasattr(e, 'reason'):
                return (False, 'Echec à joindre le serveur : ', e.reason)
            elif hasattr(e, 'code'):
                return (False, 'La demande n\'a pu etre satisfaite : ', e.code)
            else:
                return (False, 'Erreur inconnue')
        else:
            return (False, 'Erreur inconnue')

    def remove_accents(self, data):
        return ''.join(x for x in unicodedata.normalize('NFKD', data) if x in string.ascii_letters).lower()

    def formatDate(self, date):
        if date and date != '0000-00-00':
            return '/'.join(reversed(date.split('-')))
        else:
            return None
