# -*- coding: utf-8 -*-

from Products.Five import BrowserView
from Products.CMFCore.utils import getToolByName
from zope.component import getMultiAdapter

from unice.templates.browser.item import Item
from unice.templates.browser.item import Items
from unice.templates.browser.item import CouleursAgenda

from DateTime import DateTime
from urllib import urlencode

from ical import iCal

import urllib2 as urllib
from PIL import Image
from cStringIO import StringIO

from nomenclatureERC import ERC

import pprint
pp = pprint.PrettyPrinter(indent=4)


class AffichageFilUNS(BrowserView):

    # CLASSEMENTS ############################################################################################

    def classementItems(self, batch, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max):
        subjects = list(self.context.Subject())
        canal = subjects[0] if len(subjects) > 0 else None
        canal = canal[len(prefix_canaux):] if canal else None

        importances = {}
        if canal:
            # itemDetails = ItemDetails()
            itemDetails = Item()
            for item in batch:
                details = itemDetails.itemDetails(item, self, self.request, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, '%s%s' % (prefix_canaux, canal))
                if details:
                    importancesItem = details['importances'][canal]
                    for importance in importancesItem:
                        if importance not in importances:
                            importances[importance] = []
                        importances[importance].append(details)

        return importances

    def classementGestion(self, batch, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, suject_filter):
        # classement = {
        #     'sans-canal': {'title': 'Non diffusés', 'parents': {}, 'icon': 'fa fa-remove-sign'},
        #     'avec-canal': {'title': 'Diffusés', 'parents': {}, 'icon': 'fa fa-check-sign'},
        #     'sans-theme': {'title': 'Sans thème', 'parents': {}, 'icon': 'fa fa-remove-sign'},
        #     'avec-theme': {'title': 'Avec thème', 'parents': {}, 'icon': 'fa fa-check-sign'}
        # }
        # ordre = ['sans-theme', 'avec-theme', 'sans-canal', 'avec-canal']

        # #itemDetails = ItemDetails()
        # itemDetails = Item()
        # for item in batch:
        #     parent = item.getObject().aq_parent
        #     details = itemDetails.itemDetails(item, self, self.request, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, suject_filter)
        #     if details:
        #         parents = classement['avec-canal' if details['classement'] else 'sans-canal']['parents']
        #         if not parent in parents:
        #             parents[parent] = []
        #         parents[parent].append(details)

        #         parents = classement['sans-theme' if details['theme'] == '' else 'avec-theme']['parents']
        #         if not parent in parents:
        #             parents[parent] = []
        #         parents[parent].append(details)

        # return {'classement': classement, 'ordre': ordre}
        details = Item()
        return [details.itemDetails(item, self, self.request, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, suject_filter) for item in batch]

    def items(self, batch, excludes, desc_max=100, mobile=False, isObjects=False, prefix_themes=None):
        items = Items()
        return items.items(self.context, self.request, batch, excludes, desc_max, mobile, isObjects, prefix_themes=prefix_themes)

    # GESTION ############################################################################################

    def allSubjects(self):
        subjects = list(getToolByName(self.context, 'portal_catalog').uniqueValuesFor('Subject'))
        subjects.sort()
        return subjects

    def themes(self, prefix):
        return self.filterSubjects(prefix)

    def canaux(self, prefix, prefixes_importances):
        canaux = self.filterSubjects(prefix)
        return dict((canal, self.importance(canal, prefixes_importances)) for canal in canaux)

    def importance(self, canal, prefixes):
        return prefixes[canal] if canal in prefixes else '%s%s' % (prefixes['*'], canal)

    def importances(self, canaux):
        prefixes = canaux.values()
        return dict((prefix, self.filterSubjects(prefix)) for prefix in prefixes)

    def filterSubjects(self, prefix):
        subjects = list(getToolByName(self.context, 'portal_catalog').uniqueValuesFor('Subject'))
        subjects.sort()
        prefix = prefix.encode('utf-8')
        return [s[len(prefix):] for s in subjects if s.startswith(prefix)]

    # NEWSLETTER ##########################################################################################

    def classement(self, batch, desc_max):
        items = self.items(batch, excludes=['page.html'], prefix_themes='#FilUNSTheme', desc_max=desc_max)
        public = [item for item in items if item['state'] == 'published']

        imp3 = [item for item in public if '#FilUNSImpNewsletter3' in item['subjects']]
        imp3_sorted = sorted(imp3, key=lambda k: k['dates']['start'])

        return {
            'niveau1': [item for item in public if '#FilUNSImpNewsletter1' in item['subjects']],
            'niveau2': [item for item in public if '#FilUNSImpNewsletter2' in item['subjects']],
            'niveau3': imp3_sorted,
        }

    def image_size(self, url, width=None):
        image = Image.open(StringIO(urllib.urlopen(url).read()))
        w, h = image.size
        if width:
            h = int(h * width / w)
            w = width
        return {'width': w, 'height': h}

    def css(self, css):
        site_url = self.context.portal_url.getPortalObject().absolute_url()
        url = '%s/%s' % (site_url, css)
        f = urllib.urlopen(url)
        return f.read()

    def constants(self):
        return {
            'cols': {
                'one': 'one',
                'two': 'two',
                'three': 'three',
                'four': 'four',
                'five': 'five',
                'six': 'six',
                'seven': 'seven',
                'eight': 'eight',
                'nine': 'nine',
                'ten': 'ten',
                'eleven': 'eleven',
                'twelve': 'twelve'
            },

            'offset': {
                'no': '',
                'one': 'offset-by-one',
                'two': 'offset-by-two',
                'three': 'offset-by-three',
                'four': 'offset-by-four',
                'five': 'offset-by-five',
                'six': 'offset-by-six',
                'seven': 'offset-by-seven',
                'eight': 'offset-by-eight',
                'nine': 'offset-by-nine',
                'ten': 'offset-by-ten',
                'eleven': 'offset-by-eleven',
                'twelve': 'offset-by-twelve'
            },

            'last': {
                'yes': 'last',
                'no': '',
            },

            'center': {
                'yes': True,
                'no': False,
            },

            'img': {
                'one': 30,
                'two': 80,
                'three': 130,
                'four': 180,
                'five': 230,
                'six': 280,
                'seven': 330,
                'eight': 380,
                'nine': 430,
                'ten': 480,
                'eleven': 530,
                'twelve': 580
            },

            'btn': {
                'xs': 'tiny-button',
                'sm': 'small-button',
                'md': 'medium-button',
                'lg': 'large-button',

                'primary': 'primary',
                'secondary': 'secondary',
                'alert': 'alert',
                'success': 'success',
            }
        }

    # ITEM DETAILS ########################################################################################

    def selfDetails(self, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max):
        # itemDetails = ItemDetails()
        itemDetails = Item()
        return itemDetails.itemDetails(self.context, self, self.request, prefix_themes, themes, prefix_canaux, canaux, importances, desc_max, None, True)

    def captions(self, item):
        captions = [item['title']]
        captions.append('<br/><small>%s</small>' % item['description'])
        return ''.join(captions)

    def dateTime(self):
        return DateTime()

    # ICAL ###########################################################################################

    def ical(self):
        cal = iCal('12345', 'Fil UNS', 'Europe/Paris')
        events = self.context.portal_catalog({'portal_type': 'Event'})
        for e in events:
            if len(self.themes_match(list(e.Subject))) > 0:
                url = '%s/@@article_view' % e.getURL()
                cal.addEvent(e.UID, e.Title, e.Description, url, e.location, e.start, e.end, e.created, e.modified)
        self.request.response.setHeader('Content-Type', 'text/calendar; charset=utf-8')
        return cal.to_ical()

    # GESTION ########################################################################################

    def themes_agenda(self):
        return CouleursAgenda().couleurs()

    def themes_match(self, subjects):
        return set(self.themes_agenda().keys()).intersection(subjects)

    def hasGroupAccess(self, goupId, item):
        membership = getToolByName(self.context, 'portal_membership')
        user = membership.getAuthenticatedMember()
        return goupId in user.getGroups() or user.has_role(['Manager'], item)

    def urlencode(self, s):
        return urlencode(s)

    def permissions(self, item):
        return Permissions().permissions(item, self.context, self.request)

################################################################################################################
################################################################################################################
################################################################################################################


class Permissions(object):

    def permissions(self, item, context, request, limit=False):
        canaux = []
        portal_state = getMultiAdapter((context, request), name='plone_portal_state')
        if not portal_state.anonymous():
            membership = getToolByName(context, 'portal_membership')
            user = membership.getAuthenticatedMember()
            groups = user.getGroups()
            groups = groups + item['roles']

            for permission in self.all_permissions(context):
                if 'sep' not in permission:
                    if any(len(set(subject[2]).intersection(groups)) > 0 for subject in permission['subjects']):
                        for subject in permission['subjects']:
                            subject[2] = ('1' if len(set(subject[2]).intersection(groups)) > 0 else '0')
                        canaux.append(permission)
                else:
                    canaux.append(permission)

                    if limit:
                        return canaux
        return canaux

    def all_permissions(self, context):
        admin = 'Manager'
        editor = 'Editor'

        color1 = '#E9573F'
        color2 = '#F6BB42'
        color3 = '#37BC9B'

        ###############################################################################
        # UCA #########################################################################
        ###############################################################################

        if context.portal_url.getPortalObject().getId() == 'UCA':
            gest_uca = 'gestionnaires_uca'

            erc_fil = ERC().nomenclature_fil('#UCANomenclatureERC', [admin, gest_uca], color3)

            return [
                {
                    'title': 'UCA IDEX',
                    'icon': 'fa fa-certificate fa-lg',
                    'subjects': [
                        ['UCA IDEX', '#UCAStructureIDEX', [admin, gest_uca], color3],
                    ],
                    'default': 'Non catégorisé',
                }, {
                    'sep': True,
                }, {
                    'title': 'UCA Programmes',
                    'icon': 'fa fa-university fa-lg',
                    'subjects': [
                        ['Research Program', '#UCAProgramResearch', [admin, gest_uca], color3],
                        ['Training Program', '#UCAProgramTraining', [admin, gest_uca], color3],
                        ['International Program', '#UCAProgramInternational', [admin, gest_uca], color3],
                        ['Innovation Program', '#UCAProgramInnovation', [admin, gest_uca], color3],
                    ],
                    'default': 'Non catégorisé',
                }, {
                    'title': 'UCA Académies',
                    'icon': 'fa fa-star fa-lg',
                    'subjects': [
                        ['Networks, Information and Digital society', '#UCAAcademieNetwork', [admin, gest_uca], color3],
                        ['Complex systems', '#UCAProgramTraining', [admin, gest_uca], color3],
                        ['Space, Environment, risk and resilience', '#UCAAcademieSystems', [admin, gest_uca], color3],
                        ['Living systems Complexity and Diversity', '#UCAAcademieLiving', [admin, gest_uca], color3],
                        ['Human societies, Ideas and Environments', '#UCAAcademieHuman', [admin, gest_uca], color3],
                    ],
                    'default': 'Non catégorisé',
                }, {
                    'title': 'UCA Centres',
                    'icon': 'fa fa-bullseye fa-lg',
                    'subjects': [
                        ['Center of Modeling, Simulation & Interactions', '#UCACenterModeling', [admin, gest_uca], color3],
                        ['Health, Well-Being and Aging', '#UCACenterHealth', [admin, gest_uca], color3],
                        ['Smart Territory, Risk Prevention and Management', '#UCACenterTerritory', [admin, gest_uca], color3],
                        ['Digital Challenge', '#UCACenterDigital', [admin, gest_uca], color3],
                    ],
                    'default': 'Non catégorisé',
                }, {
                    'sep': True,
                }, {
                    'title': 'UCA Disciplines',
                    'icon': 'fa fa-flask fa-lg',
                    'subjects': erc_fil['disciplines'],
                    'default': 'Non classé',
                }, {
                    'title': 'UCA Sous-disciplines',
                    'icon': 'fa fa-flask fa-lg',
                    'subjects': erc_fil['subdisciplines'],
                    'default': 'Non classé',
                    'filter': True,
                }, {
                    'sep': True,
                }, {
                    'title': 'UCA News',
                    'icon': 'fa fa-bullhorn fa-lg',
                    'subjects': [
                        ['Niveau 1', '#UCANewsImportance1', [admin, gest_uca], color1],
                        ['Niveau 2', '#UCANewsImportance2', [admin, gest_uca], color2],
                        ['Niveau 3', '#UCANewsImportance3', [admin, gest_uca], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'UCA Newsletter',
                    'icon': 'fa fa-envelope fa-lg',
                    'subjects': [
                        ['Niveau 1', '#UCANewsletterImportance1', [admin, gest_uca], color1],
                        ['Niveau 2', '#UCANewsletterImportance2', [admin, gest_uca], color2],
                        ['Niveau 3', '#UCANewsletterImportance3', [admin, gest_uca], color3],
                    ],
                    'default': 'Non affiché',
                }
            ]

        ###############################################################################
        # UNS #########################################################################
        ###############################################################################

        else:
            gest_fil = 'gestionnaires_filuns'
            gest_ecrans = 'gestionnaires_ecrans'
            gest_types = 'gestionnaires_type_evenements'
            redac_fil = 'redacteurs_filuns'
            redac_fil_culture = 'redacteurs_filuns_culture'
            redac_uca = 'redacteurs_uca'
            gest_ecrans = 'gestionnaires_ecrans'
            redac_ecran_formation = 'redacteurs_ecran_formation'
            redac_ecran_chateauvalrose = 'redacteurs_ecran_chateauvalrose'
            redac_ecran_imredd = 'redacteurs_ecran_imredd'
            redac_ecran_suaps = 'redacteurs_ecran_suaps'
            redac_ecran_saintjean = 'redacteurs_ecran_saintjean'
            redac_ecran_staps = 'redacteurs_ecran_staps'
            redac_minisites_50ans = 'redacteurs_minisites_50ans'
            redac_campus_trotabas = 'redacteurs_campus_trotabas'
            redac_campus_staps = 'redacteurs_campus_staps'
            tous = [admin, editor, gest_fil, gest_types, redac_fil, redac_fil_culture, redac_uca, gest_ecrans, redac_ecran_formation, redac_ecran_chateauvalrose, redac_ecran_imredd, redac_ecran_suaps, redac_ecran_saintjean, redac_ecran_staps, redac_minisites_50ans, redac_campus_trotabas, redac_campus_staps]

            return [
                {
                    'title': 'Thèmes',
                    'icon': 'fa fa-tags fa-lg',
                    'subjects': [[t.replace('#FilUNSTheme', ''), t, tous, c] for t, c in CouleursAgenda().couleurs().iteritems()],
                    'default': 'Sans thème',
                }, {
                    'title': 'Profils',
                    'icon': 'fa fa-user fa-lg',
                    'subjects': [
                        ['Lycéen', '#ProfilLyceen', tous, color3],
                        ['Etudiant', '#ProfilEtudiant', tous, color3],
                        ['Etudiant étranger', '#ProfilEtudiantEtranger', tous, color3],
                        ['Enseignant-Chercheur', '#ProfilEnseignantChercheur', tous, color3],
                        ['Personnel', '#ProfilPersonnel', tous, color3],
                        ['Adulte en reprise d\'études', '#ProfilRepriseEtude', tous, color3],
                        ['Entreprise/Partenaire', '#ProfilEntreprisePartenaire', tous, color3],
                        ['Ancien étudiant', '#ProfilAncienEtudiant', tous, color3],
                        ['Presse', '#ProfilPresse', tous, color3],
                    ],
                    'default': 'Non profilé',
                }, {
                    'title': 'Types',
                    'icon': 'fa fa-info-circle fa-lg',
                    'subjects': [
                        ['Colloque', '#TypeColloque', [admin, gest_types], color3],
                        ['Conference', '#TypeConference', [admin, gest_types], color3],
                        ['Congrès', '#TypeCongres', [admin, gest_types], color3],
                        ['Enseignement', '#TypeEnseignement', [admin, gest_types], color3],
                        ['HDR', '#TypeHDR', [admin, gest_types], color3],
                        ['Journée d’étude', '#TypeJourneeEtude', [admin, gest_types], color3],
                        ['Offre de poste', '#TypeOffrePoste', [admin, gest_types], color3],
                        ['Presse', '#TypePresse', [admin, gest_types], color3],
                        ['Publication', '#TypePublication', [admin, gest_types], color3],
                        ['Séminaire', '#TypeSeminaire', [admin, gest_types], color3],
                        ['Thèse', '#TypeThese', [admin, gest_types], color3],
                    ],
                    'default': 'Sans type',
                }, {
                    'sep': True,
                }, {
                    'title': 'Accueil Fil UNS',
                    'icon': 'fa fa-paper-plane fa-lg',
                    'subjects': [
                        ['Niveau 1', '#FilUNSCanalHomepage,#FilUNSImpHomepage1', [admin, gest_fil], color1],
                        ['Niveau 2', '#FilUNSCanalHomepage,#FilUNSImpHomepage2', [admin, gest_fil], color2],
                        ['Niveau 3', '#FilUNSCanalHomepage,#FilUNSImpHomepage3', [admin, gest_fil], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Fil UNS',
                    'icon': 'fa fa-paper-plane fa-lg',
                    'subjects': [
                        ['Niveau 1', '#FilUNSCanalFilUNS,#FilUNSImportance1', [admin, gest_fil], color1],
                        ['Niveau 2', '#FilUNSCanalFilUNS,#FilUNSImportance2', [admin, gest_fil], color2],
                        ['Niveau 3', '#FilUNSCanalFilUNS,#FilUNSImportance3', [admin, gest_fil, redac_fil], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Rubriques Fil UNS',
                    'icon': 'fa fa-paper-plane fa-lg',
                    'subjects': [
                        ['Culture', '#FilUNSCanalFilUNS,#FilUNSThemeCulture', [admin, redac_fil_culture], color3],
                        ['Niveau 1', '#FilUNSImportance1', [admin, redac_fil_culture], color1],
                        ['Niveau 2', '#FilUNSImportance2', [admin, redac_fil_culture], color2],
                        ['Niveau 3', '#FilUNSImportance3', [admin, redac_fil_culture], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Newsletter',
                    'icon': 'fa fa-envelope fa-lg',
                    'subjects': [
                        ['Niveau 1', '#FilUNSCanalNewsletter,#FilUNSImpNewsletter1', [admin, gest_fil], color1],
                        ['Niveau 2', '#FilUNSCanalNewsletter,#FilUNSImpNewsletter2', [admin, gest_fil], color2],
                        ['Niveau 3', '#FilUNSCanalNewsletter,#FilUNSImpNewsletter3', [admin, gest_fil], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'sep': True,
                }, {
                    'title': 'Accueil du portail',
                    'icon': 'fa fa-home fa-lg',
                    'subjects': [
                        ['affiché', '#FilUNSCanalAccueilPortail', [admin, gest_fil], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Votre accueil',
                    'icon': 'fa fa-home fa-lg',
                    'subjects': [
                        ['Niveau 1', '#FilUNSCanalComposanteHomepage,#FilUNSImpComposanteHomepage1', [admin, editor], color1],
                        ['Niveau 2', '#FilUNSCanalComposanteHomepage,#FilUNSImpComposanteHomepage2', [admin, editor], color2],
                        ['Niveau 3', '#FilUNSCanalComposanteHomepage,#FilUNSImpComposanteHomepage3', [admin, editor], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Accueil espace',
                    'icon': 'fa fa-users fa-lg',
                    'subjects': [
                        ['affiché', '#FilUNSCanalAccueilEspace', [admin, editor], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Ecrans',
                    'icon': 'fa fa-youtube-play fa-lg',
                    'subjects': [
                        ['FLUX GLOBAL', '#FilUNSCanalEcransGlobal', [admin, gest_ecrans], color3],
                        ['Valrose', '#FilUNSCanalEcransChateauValrose', [admin, gest_ecrans, redac_ecran_chateauvalrose], color3],
                        ['IMREDD', '#FilUNSCanalEcransIMREDD', [admin, gest_ecrans, redac_ecran_imredd], color3],
                        ['SUAPS', '#FilUNSCanalEcransSUAPS', [admin, gest_ecrans, redac_ecran_suaps], color3],
                        ['Saint Jean d\'Angely', '#FilUNSCanalEcransSaintJean', [admin, gest_ecrans, redac_ecran_saintjean], color3],
                        ['Formation', '#FilUNSCanalEcransFormation', [admin, gest_ecrans, redac_ecran_formation], color3],
                        ['STAPS', '#FilUNSCanalEcransSTAPS', [admin, gest_ecrans, redac_ecran_staps], color3],
                    ],
                    'default': 'Non affiché',
                }, {
                    'title': 'Mini-sites',
                    'icon': 'fa fa-globe fa-lg',
                    'subjects': [
                        ['Site des 50 ans', '#MiniSites50ans', [admin, redac_minisites_50ans], color3],
                        ['Site des 50 ans (anglais)', '#MiniSites50ansEnglish', [admin, redac_minisites_50ans], color3],
                        ['Campus Trotabas', '#MiniSitesCampusTrotabas', [admin, redac_campus_trotabas], color3],
                        ['Campus Staps', '#MiniSitesCampusStaps', [admin, redac_campus_staps], color3],
                    ],
                    'default': 'Non affiché',
                },
            ]
