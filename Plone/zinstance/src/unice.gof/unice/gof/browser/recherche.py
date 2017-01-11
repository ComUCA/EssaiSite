# -*- coding: utf-8 -*-

import re
import HTMLParser
import unicodedata
import pickle
import json

from plone.dexterity.interfaces import IDexterityFTI
from zope.component import getUtility
from zope.schema import getFieldsInOrder

import pprint
pp = pprint.PrettyPrinter(indent=4)


class RechercheGOF(object):

    def __init__(self, context=None, params=None):
        self.context = context
        self.params = params

    def recherche(self):
        matches = []
        recherche = self.param('recherche')
        mode = self.param('mode')
        mode_recherche = self.param('mode_recherche')
        searchAllMode = (mode_recherche == 'all')
        searchExactMode = (mode_recherche == 'exact')
        filteTitre = self.param('filtre_titre')  # TEMPORAIRE

        print '====================================================='
        print self.params
        print self.searchFields()

        if self.context.portal_type == 'Folder':
            formations = self.context.getFolderContents({'portal_type': 'formation', 'sort_on': 'sortable_title'}, batch=False)
        else:
            formations = self.context.results()

        if recherche:
            recherche = unicode(recherche, 'utf-8')
            recherche = self.cleanText(recherche) if not searchExactMode else [recherche.encode('utf-8')]
            searchFields = self.searchFields()

            for formation in formations:
                searchables = pickle.loads(formation.getObject().keywords)

                fields = searchFields if searchFields else searchables.keys()
                setlist = set.union(*[set(searchables[k]) for k in fields])
                searchList = set(recherche)
                results = setlist.intersection(searchList)
                if not searchAllMode and len(results) > 0:
                    if not filteTitre:   # TEMPORAIRE
                        matches.append(formation)
                    else:   # TEMPORAIRE
                        if filteTitre.lower() in formation.Title.lower():   # TEMPORAIRE
                            matches.append(formation)   # TEMPORAIRE

                elif searchAllMode and len(results) == len(searchList):
                    if not filteTitre:   # TEMPORAIRE
                        matches.append(formation)
                    else:   # TEMPORAIRE
                        if filteTitre.lower() in formation.Title.lower():   # TEMPORAIRE
                            matches.append(formation)   # TEMPORAIRE
        else:
            matches = formations

        return self.rechercheReponseJSON(matches, mode) if mode in ['json_all', 'json_light'] else self.rechercheReponseHTML(matches, recherche, mode)

    def rechercheReponseHTML(self, formations, recherche=None, mode=None):
        #mode = 'mobile'
        if len(formations) == 0 or not recherche:
            return '<div class="alert alert-warning"><strong><i class="fa fa-warning-sign"></i> Aucune formation ne correspond à votre recherche</strong></div>'
        else:
            # out = []
            # #out.append('<div class="text-center"><div class="alert alert-info">')
            # out.append('<div class="panel panel-info"><div class="panel-heading">')
            # out.append('<strong>%s formations</strong> <span>correspondent aux mots-clés "%s"' % (len(formations), ', '.join(recherche)))
            # if self.param('multicriteres') and len(self.filteredParams()) > 0:
            #     out.append(', sur les critères "%s"' % ', '.join(sorted(self.filteredParams())))
            # #out.append('</span></div></div>')
            # out.append('</span></div>')

            # out.append('<div class="list-group">' if mode == 'mobile' else '<ul>')

            # for formation in formations:
            #     out.append('' if mode == 'mobile' else '<li>')
            #     if mode == 'mobile':
            #         out.append('<a href="%s/@@formation_mobile_view" class="list-group-item">' % formation.getURL())
            #     else:
            #         out.append('<a href="%s">' % formation.getURL())
            #     out.append('<i class="fa fa-bookmark-empty text-muted"></i> ' if mode == 'mobile' else '<i class="fa fa-quote-left"></i> ')
            #     out.append('<strong>')
            #     try:
            #         out.append(formation.Title())
            #     except:
            #         out.append(formation.Title)
            #     out.append('</strong>')
            #     out.append('</a>')
            #     out.append('' if mode == 'mobile' else '</li>')
            # out.append('</div>' if mode == 'mobile' else '</ul>')

            # out.append('</div>')

            out = []
            out.append('<div class="panel panel-info"><div class="panel-heading">')
            out.append('<span><i class="fa fa-search"></i></span> <strong>%s formations</strong> ' % len(formations))
            out.append('<span>correspondent aux mots-clés "%s"' % ', '.join(recherche))
            if self.param('multicriteres') and len(self.filteredParams()) > 0:
                out.append(', sur les critères "%s"' % ', '.join(sorted(self.filteredParams())))
            out.append('</span></div>')

            out.append('<div class="list-group">')

            for formation in formations:
                url_suffix = '/@@formation_mobile_view' if mode == 'mobile' else ''
                if 'inscription' in self.params:
                    url_suffix = '?inscription'
                out.append('<a href="%s%s" class="list-group-item">' % (formation.getURL(), url_suffix))
                out.append('<i class="fa fa-bookmark-empty text-muted"></i> <strong>')
                try:
                    out.append(formation.Title())
                except:
                    out.append(formation.Title)
                out.append('</strong></a>')

            out.append('</div></div>')

            return ''.join(out)

    def rechercheReponseJSON(self, formations, mode):
        exclude_keys = ['keywords']
        light_keys = ['id_formation', 'titre_formation', 'cod_dip', 'cod_vrs_vdi']

        schema = getUtility(IDexterityFTI, name='formation').lookupSchema()
        out = []
        for formation in formations:
            obj = formation.getObject()
            f = {'titre_formation': formation.Title}
            for name, field in getFieldsInOrder(schema):
                if name not in exclude_keys:
                    if mode == 'json_all' or (mode == 'json_light' and name in light_keys):
                        f[name] = getattr(obj, name, '')
            out.append(f)
        return json.dumps(out)

    def filteredParams(self):
        return filter(lambda x: not x in ['recherche', 'multicriteres', 'mode', 'mode_recherche', 'titre_initial', 'filtre_titre', 'inscription'], self.params)

    def searchFields(self):
        #pp.pprint(self.params)
        if self.param('multicriteres'):
            return self.filteredParams()
        return None

    ######################################################################################
    ### UTILS ############################################################################
    ######################################################################################

    def param(self, key):
        return self.params[key] if key in self.params else None

    def cleanDict(self, d, exact, min=4):
        clean = {k: self.cleanText(v, min) if not exact[k] else self.cleanExactList(v) for k, v in d.items()}
        return pickle.dumps(clean)

    def cleanText(self, t, min=4):
        s = t

        # Unescape
        h = HTMLParser.HTMLParser()
        s = h.unescape(s).lower()

        # Tags
        s = re.sub(r'<.*?>', '', s)

        # Accents
        s = ''.join((c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn'))

        # Ponctuation
        s = re.sub(r'[^\w\s]', ' ', s)

        # Mots courts
        s = re.sub(r'\b\w{1,%i}\b' % (min-1), ' ', s)

        # Espaces
        s = re.sub(r'\s+', ' ', s)
        s = re.sub(r'^\s*', '', s)
        s = re.sub(r'\s*$', '', s)

        # UTF-8
        s = s.encode('utf-8')

        # Conversion en liste et suppression doublons
        l = s.split(' ')
        l = list(set(l))
        l.sort()
        #n = len(l)

        # Suppression des mots courants
        l = self.supprimerMotsCourants(l)
        #print 100*float(n - len(l))/float(n)

        return l

    def cleanExactList(self, t):
        return [i.strip() for i in re.findall(r"<a.*?href=(?:\".*?\"|'.*?').*?>(.*?)</a>", t)]

    def formationLinkTag(self, item):
        keywords = item.getObject().keywords
        searchables = self.unpickle(keywords)
        attrs = ''.join('data-search-{}="{}" '.format(key, ','.join(val)) for key, val in searchables.items())
        return '<li %s><a href="%s">%s</a></li>' % (attrs, item.getURL(), item.Title)

    def unpickle(self, s):
        return pickle.loads(s)

    def supprimerMotsCourants(self, l):
        mots = [u'a', u'abord', u'absolument', u'admirablement', u'ailleurs', u'ainsi', u'alentour', u'alors', u'apparemment', u'approximativement', u'apres', u'arriere', u'assez', u'assurement', u'attendu', u'aujourd', u'auparavant', u'aussi', u'aussitot', u'autant', u'autour', u'autrefois', u'autrement', u'avant', u'avec', u'beaucoup', u'bien', u'bientot', u'bon', u'ca', u'carrement', u'ceans', u'cependant', u'certainement', u'certes', u'chez', u'ci', u'combien', u'comme', u'comment', u'completement', u'concernant', u'contre', u'dans', u'davantage', u'de', u'debout', u'deca', u'dedans', u'dehors', u'deja', u'dela', u'demain', u'depuis', u'derechef', u'derriere', u'des', u'desormais', u'dessous', u'dessus', u'devant', u'devers', u'diablement', u'divinement', u'dixit', u'dorenavant', u'doucement', u'drolement', u'durant', u'egalement', u'en', u'encore', u'endeans', u'enfin', u'ensemble', u'ensuite', u'entenant', u'entierement', u'entre', u'envers', u'environ', u'es', u'excepte', u'expres', u'extrêmement', u'fort', u'franco', u'grandement', u'gratis', u'guere', u'hier', u'hormis', u'hors', u'hui', u'ici', u'impromptu', u'incognito', u'infiniment', u'insuffisamment', u'jadis', u'jamais', u'joignant', u'joliment', u'jouxte', u'jusque', u'la', u'lentement', u'les', u'lez', u'loin', u'longtemps', u'lors', u'maintenant', u'mal', u'malgre', u'même', u'mieux', u'moins', u'moyennant', u'naguere', u'nonobstant', u'ou', u'oui', u'outre', u'par', u'parfois', u'parmi', u'partout', u'passablement', u'passe', u'pendant', u'peu', u'pis', u'plein', u'plus', u'plutot', u'pour', u'precisement', u'premierement', u'pres', u'presque', u'probablement', u'proche', u'prou', u'puis', u'quand', u'quasi', u'quasiment', u'quelque', u'quelquefois', u'question', u'recta', u'rudement', u'sans', u'sauf', u'selon', u'si', u'sitot', u'soit', u'soudain', u'sous', u'souvent', u'sub', u'subito', u'suffisamment', u'suivant', u'sur', u'sus', u'tandis', u'tant', u'tantot', u'tard', u'tellement', u'terriblement', u'tot', u'totalement', u'touchant', u'toujours', u'tout', u'toutefois', u'tres', u'trop', u'vers', u'versus', u'via', u'vite', u'voici', u'voila', u'volontiers', u'vraiment', u'vraisemblablement', u'vs', u'vu', u'y']
        return list(set(l) - set(mots))
