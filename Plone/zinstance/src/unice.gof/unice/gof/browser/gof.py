# -*- coding: utf-8 -*-

from Products.Five import BrowserView

from plone.dexterity.utils import createContentInContainer
from Products.CMFCore.utils import getToolByName
from Products.CMFCore.WorkflowCore import WorkflowException
from Acquisition import aq_parent, aq_inner

from time import gmtime, strftime
# import urllib2
# import socket
import json
import pickle
import re
import unicodedata
import string

from recherche import RechercheGOF
from unice.templates.browser.item import Items

import logging
logger = logging.getLogger("Plone")

import pprint
pp = pprint.PrettyPrinter(indent=4)


class GOF(BrowserView):

    def parseGOF(self):
        # try:
        #     #url = 'http://tice207.unice.fr/exportJSON.php'
        #     url = 'http://tice207.unice.fr/export.json'
        #     response = urllib2.urlopen(url, timeout=6000)
        #     data = json.load(response)
        #     return data
        # except urllib2.URLError, e:
        #     if isinstance(e.reason, socket.timeout):
        #         raise Exception("There was an error: %r" % e)
        #     else:
        #         raise
        # except socket.timeout, e:
        #     raise Exception("There was an error: %r" % e)
        try:
            # filepath = '/Users/j/Dropbox/Portail/Offre de formation/portail/export.json'
            filepath = '/home/zope/sites/exportBD/export.json'
            with open(filepath) as data_file:
                return json.load(data_file)
        except:
            return None

    def creerObjectsGOF(self):
        print '============================================================='
        print strftime('%d.%m.%Y %Hh%Mm%Ss', gmtime())
        print '============================================================='
        folder = self.context
        self.archiver(folder, 'formation')

        gof = self.parseGOF()

        if gof:
            formations = gof['formations']
            i = 0
            for id_formation in formations:
                	#if i < 10:
                    formation = formations[id_formation]
                    formation['title'] = id_formation

                    item = createContentInContainer(folder, 'formation', checkConstraints=True, **formation)

                    keywords = RechercheGOF().cleanDict({k: formation[k] for k in self.searchablesList()}, self.searchablesExactMode())
                    item.keywords = keywords

                    item.setLayout('formation_view')
                    item.setTitle(formation['titre_formation'])
                    item.setExcludeFromNav(True)
                    item.reindexObject()

                    self.changerState(item, 'publish')

                    i = i+1
        else:
            return 'Erreur lors de la lecture du fichier JSON !'

    def archiver(self, folder, type):
        date = strftime('%d.%m.%Y %Hh%Mm%Ss', gmtime())
        id = 'Archive %s' % date
        folder.invokeFactory('Folder', id)
        folder.setExcludeFromNav(True)
        archive = folder[id]

        items = folder.getFolderContents({'portal_type': type}, full_objects=True)
        for item in items:
            self.changerState(item, 'retract')
            self.deplacer(item, folder, archive)

    def deplacer(self, obj=None, parent=None, dest=None, newid=None):
        id = obj.getId()
        if parent is None:
            parent = aq_parent(aq_inner(obj))
        clipboard = parent.manage_cutObjects([id])
        result = dest.manage_pasteObjects(clipboard)
        if newid is not None:
            dest.manage_renameObject(result[0]['new_id'], newid)

    def changerState(self, item, state):
        workflowTool = getToolByName(item, 'portal_workflow')
        try:
            workflowTool.doActionFor(item, state)
        except WorkflowException:
            logger.info("Could not " + state + ':' + str(item.getId()))
            pass

    def searchables(self):
        return [
            {'name': 'informations', 'label': 'Informations générales', 'values': [
                {'name': 'lib_composante', 'label': 'Composante', 'exact': True},
                {'name': 'responsable', 'label': 'Responsable', 'exact': False},
                {'name': 'accessibilite', 'label': 'Accessible en', 'exact': True},
                {'name': 'motscles', 'label': 'Mots Cles', 'exact': False},
            ]},
            {'name': 'presentation', 'label': 'Présentation', 'values': [
                {'name': 'domaine', 'label': 'Domaine', 'exact': True},
                {'name': 'mention', 'label': 'Mention', 'exact': False},
                {'name': 'specialite', 'label': 'Spécialité', 'exact': False},
                {'name': 'niveau', 'label': 'Année de sortie', 'exact': True},
                {'name': 'lieux', 'label': 'Lieu(x) de formation', 'exact': False},
                {'name': 'objectifs', 'label': 'Objectifs', 'exact': False},
                {'name': 'competences', 'label': 'Savoir-faire et Compétences', 'exact': False},
            ]},
            {'name': 'admission_programme', 'label': 'Admission & Programme', 'values': [
                {'name': 'conditions', 'label': 'Conditions', 'exact': False},
                {'name': 'programme', 'label': 'Programme', 'exact': False},
                {'name': 'controle', 'label': 'Contrôle de connaissance', 'exact': False},
            ]},
            {'name': 'debouches', 'label': 'Débouchés', 'values': [
                {'name': 'poursuite', 'label': 'Poursuite d\'études', 'exact': False},
                {'name': 'metiers', 'label': 'Emplois et métiers possibles', 'exact': False},
            ]}
        ]

    def searchablesList(self):
        return [j['name'] for i in self.searchables() for j in i['values']]

    def searchablesExactMode(self):
        return {j['name']: j['exact'] for i in self.searchables() for j in i['values']}

    def type_item(self, type_item):
        type_item = type_item if type_item == 'text' or type_item == 'textarea' else 'text'
        types = {
            'checkbox': 'zope.schema.Set',
            'radio': 'zope.schema.Choice',
            'select': 'zope.schema.Choice',
            'text': 'zope.schema.TextLine',
            'textarea': 'zope.schema.Text',
        }
        return types[type_item] if type_item in types else ''

    ######################################################################################
    ### INSCRIPTIONS #####################################################################
    ######################################################################################

    def codes_inscriptions(self):
        inscription = 'http://sco-web.unice.fr/cgi-bin/WebObjects/APOWEB-PROD.woa/wa/inscriptionEtape?codDip={cod_dip}&codVrsVdi={cod_vrs_vdi}&codEtp={cod_etp}&codVrsVet={cod_vrs_vet}'
        #reinscription = 'http://sco-web.unice.fr/cgi-bin/WebObjects/APOWEB-PROD.woa/wa/reinscriptionEtape?codDip={cod_dip}&codVrsVdi={cod_vrs_vdi}&codEtp={cod_etp}&codVrsVet={cod_vrs_vet}'
        if self.context.portal_type == 'formation':
            id_formation = self.context.id_formation
            filepath = '/home/zope/sites/exportBD/exportGOF.json'
            # filepath = '/Users/j/Downloads/exportGOF.json'
            with open(filepath) as data_file:
                data = json.load(data_file)
                if id_formation in data:
                    diplomes = data[id_formation]
                    inscriptions = {}
                    for code, etapes in diplomes.items():
                        for etape in etapes:
                            etape['inscription'] = inscription.format(**etape)
                            #etape['reinscription'] = reinscription.format(**etape)
                        #inscriptions[code] = sorted(etapes, key=lambda e: e['lib_web_vet'])
                        inscriptions[code] = etapes
                    flat = [item for sublist in inscriptions.values() for item in sublist]
                    #return inscriptions
                    return sorted(flat, key=lambda e: e['lib_web_vet'])
            return None

    ######################################################################################
    ### RECHERCHE ########################################################################
    ######################################################################################

    def recherche(self):
        if 'mode' in self.request.form and self.request.form['mode'] in ['json_all', 'json_light']:
            self.request.response.setHeader('Content-Type', 'application/json; charset=utf-8')
        return RechercheGOF(self.context, self.request.form).recherche()

    def unpickle(self, s):
        return pickle.loads(s)

    ######################################################################################
    ### FICHES ###########################################################################
    ######################################################################################

    def fiche_composante(self):
        codes = {
            u'U.F.R.   Sciences': 'sciences',
            u'U.F.R.  Lettres Arts  Sciences Humaines': 'lash',
            u'U.F.R. Droit et Sciences Politiques': 'droit',
            u'Institut du Droit de la Paix et du Développement (IDPD)': 'idpd',
            u'Institut Supérieur d\'Economie et de Management (ISEM)': 'isem',
            u'Institut Administration des Entreprises': 'iae',
            u'Institut Universitaire de Technologie': 'iut',
            u'U.F.R. d\'Odontologie': 'odonto',
            u'U.F.R. Médecine': 'medecine',
            u'Ecole Supérieur du Professorat et de l\'Enseignement': 'espe',
            u'Ecole Polytechnique Universitaire': 'epu',
            u'Espaces et Cultures': 'cultures',
            u'U.F.R.  Sciences du Sport-STAPS': 'staps',
        }

        lib = re.sub('<[^>]*>', '', self.context.lib_composante)
        code = codes[lib] if lib in codes else None
        return {'code': code, 'lib': lib}

    def fiche_layout(self):
        forced = {
            'ocbi12': 1,
            'slm12120': 1,
            'sli12120': 1,
            'slte12120': 1,
            'slvs12120': 1,
            'slpc12120': 1,
            'slp12120': 1,
            'slc12120': 1,
            'hlvn12120': 1,
            'clgm12120': 1,
            'hlim12120': 1,
            'hlet12121': 1,
            'hlar12121': 1,
            'hmet12120': 1,
            'hmco12125': 1,
            'hmet12125': 1,
            'hmet12121': 1,
            'hmla12121': 1,
            'hmso12121': 1,

            'hlgc12120': 2,
        }
        if self.context.id_formation.lower() in forced:
            return forced[self.context.id_formation.lower()]
        else:
            layout = self.request['layout'] if 'layout' in self.request else '0'
            if layout == '0':
                return 0
            elif layout in ['', '1']:
                return 1
            else:
                return 2

    def clean(self, txt):
        txt = re.sub(r'\s*style\s*=\s*"[a-zA-Z0-9:;\.\s\(\)\-\,]*"', ' ', txt)  # suppression des attribut "style"
        txt = re.sub(r'\s+/\s+', '/', txt)  # suppression des espaces entre les slashs
        return txt

    ######################################################################################
    ### COMPOSANTES ######################################################################
    ######################################################################################

    def items(self, batch, excludes, desc_max=100, mobile=False, isObjects=False):
        items = Items()
        return items.items(self.context, self.request, batch, excludes, desc_max, mobile, isObjects)

    def codes_composantes(self):
        return {
            'epu': u'Ecole Polytechnique Universitaire',
            'espe': u'Ecole Supérieur du Professorat et de l\'Enseignement',
            'cultures': u'Espaces et Cultures',
            'iae': u'Institut Administration des Entreprises',
            'idpd': u'Institut du Droit de la Paix et du Développement (IDPD)',
            'isem': u'Institut Supérieur d\'Economie et de Management (ISEM)',
            'iut': u'Institut Universitaire de Technologie',
            'sciences': u'U.F.R.   Sciences',
            'lash': u'U.F.R.  Lettres Arts  Sciences Humaines',
            'staps': u'U.F.R.  Sciences du Sport-STAPS',
            'odonto': u'U.F.R. d\'Odontologie',
            'droit': u'U.F.R. Droit et Sciences Politiques',
            'medecine': u'U.F.R. Médecine',
        }

    def niveaux(self):
        return [
            {'libelle': u'Licences et Licences Professionnelles', 'code': u'bac + 3', 'filtre': u'licence'},
            {'libelle': u'Premieres années de Master', 'code': u'bac + 4', 'filtre': u'master 1'},
            {'libelle': u'Deuxièmes années de Master', 'code': u'bac + 5', 'filtre': u'master 2'},
            {'libelle': u'Doctorats', 'code': u'bac + 8', 'filtre': u'doctorat'},
            {'libelle': u'Diplômes Universitaires', 'code': u'bac + 3', 'filtre': u'(du)'},
            {'libelle': u'Diplômes Universitaires de Technologie', 'code': u'bac + 2', 'filtre': u'(dut)'},
        ]

    def accessibilites(self):
        return [
            'Alternance / Apprentissage',
            'Formation Continue',
            'Validation d\'acquis',
            'Formation Initiale',
        ]

    def niveaux_sorted(self):
        return [n['libelle'] for n in self.niveaux()]

    def formations_composantes(self, composante):
        niveaux = self.niveaux()

        output = {
            'formations': {},
            'composantes': {},
            'domaines': {},
            'mentions': {},
            'specialites': {},
            'niveaux': {},
            'accessibilites': {},
            'tabs': [
                {'code': 'niveaux', 'libelle': 'Niveaux'},
                {'code': 'domaines', 'libelle': 'Domaines'},
                {'code': 'mentions', 'libelle': 'Mentions'},
                {'code': 'specialites', 'libelle': 'Spécialités'},
            ]
        }

        if composante:
            formations = [f.getObject() for f in self.context.portal_catalog({'portal_type': 'formation', 'review_state': 'published'})]
            for f in formations:
                if self.strip_tags(f.lib_composante) == self.codes_composantes()[composante]:
                    # print '-------------------------------------------------'
                    # if self.strip_tags(f.lib_composante) == self.strip_tags(composante):
                    id_formation = f.id_formation.lower()
                    domaine = self.strip_tags(f.domaine)
                    mention = self.strip_tags(f.mention)
                    specialite = self.strip_tags(f.specialite)
                    niveau = self.strip_tags(f.niveau)
                    # accessibilite = self.strip_tags(f.accessibilite)
                    # print accessibilite

                    output['formations'][id_formation] = f

                    if domaine:
                        if not domaine in output['domaines']:
                            output['domaines'][domaine] = []
                        output['domaines'][domaine].append(id_formation)

                    if mention:
                        if not mention in output['mentions']:
                            output['mentions'][mention] = []
                        output['mentions'][mention].append(id_formation)

                    if specialite:
                        if not specialite in output['specialites']:
                            output['specialites'][specialite] = []
                        output['specialites'][specialite].append(id_formation)

                    if niveau:
                        niveau_match = None
                        for n in niveaux:
                            if niveau.lower() == n['code'] and n['filtre'] in unicode(f.Title().lower(), 'utf-8'):
                                niveau_match = n

                        if niveau_match:
                            if not niveau_match['libelle'] in output['niveaux']:
                                output['niveaux'][niveau_match['libelle']] = []
                            output['niveaux'][niveau_match['libelle']].append(id_formation)

                    # if accessibilite:
                    #     if 'formation continue' in accessibilite:

            for tab in output['tabs']:
                for k, v in output[tab['code']].iteritems():
                    output[tab['code']][k] = sorted(v, key=lambda e: self.remove_accents(unicode(output['formations'][e].Title(), 'utf-8')))

        return output

    def strip_tags(self, txt):
        # try:
        #     txt = unicode(txt, 'utf-8')
        # except Exception, e:
        #     pass

        txt = re.sub(r'<[^>]*?>', '', txt).strip()
        # txt = self.remove_accents(txt)
        # txt = re.sub(r'\s+', ' ', txt)
        return txt

    def sorted(self, d):
        return sorted(d.keys(), key=lambda e:  self.remove_accents(re.sub(r'\s+', ' ', e.strip())).lower())

    def remove_accents(self, data):
        return ''.join(x for x in unicodedata.normalize('NFKD', data) if x in string.ascii_letters).lower()
