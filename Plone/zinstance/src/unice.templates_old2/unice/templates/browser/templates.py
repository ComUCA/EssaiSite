# -*- coding: utf-8 -*-

from Products.Five import BrowserView
from item import Item
from item import Items
from video import Video

from urllib import urlencode
import re
import uuid
import json

# import csv
# import io
# import os

# try:  # check for the Python Imaging Library
#     import PIL
# except ImportError:
#     try:  # sometimes PIL modules are put in PYTHONPATH's root
#         import Image
#         class PIL(object): pass  # dummy wrapper
#         PIL.Image = Image
#     except ImportError:
#         PIL = None
# from PIL import Image
# from PIL import ImageFont
# from PIL import ImageDraw
# import textwrap
# import math

from Products.CMFCore.utils import getToolByName
from ressources_externes import detectUrlOrIframe
from traductions import traduction

import pprint
pp = pprint.PrettyPrinter(indent=4)


class Templates(BrowserView):

    ### CLASSEMENTS ############################################################################################

    def document(self, idIndex, context=None, desc_max=200):
        items = Items()
        document = items.getChildbyId(context or self.context, idIndex)
        details = items.details(context or self.context, self.request, document, desc_max, True) if document else None
        if details:
            details['entete_complete'] = '#EnteteCompleteTemplate' in details['subjects']
        return details

    def items(self, batch, excludes, desc_max=100, mobile=False, isObjects=False):
        items = Items()
        return items.items(self.context, self.request, batch, excludes, desc_max, mobile, isObjects)

    def filtered(self, items, keyword):
        return filter(lambda x: not keyword in x['subjects'], items)

    def getFolderContents(self, folder, omit_exclude_from_nav=True):
        return Items().getFolderContents(folder, self.context, self.request, omit_exclude_from_nav)

    def getFolderContentsByTypes(self, folder=None, omit_exclude_from_nav=True):
        if not folder:
            folder = self.context

        types = {}
        contents = self.getFolderContents(folder, omit_exclude_from_nav)
        for c in contents:
            t = c.portal_type
            if t not in types:
                types[t] = []
            types[t].append(c)
        return types

    def access(self, item=None, isObject=True):
        if not item:
            item = self.context
        (access, roles) = Item().access(self.context, item)
        return {'access': access, 'roles': roles}

    def video(self, url):
        video = Video(url)
        return video.informations()

    def urlencode(self, s):
        return urlencode(s)
    
    def smart_truncate(self, content, length=100, suffix='...'):
        return Item().smart_truncate(content, length, suffix)

    def locale(self):
        for l in ['en', 'zh']:
            if self.context.relative_url_matches(['/%s' % l]):
                return l
        return 'fr'

    def traduction(self, k):
        return traduction(self.locale(), k)


    ############################################################################################################

    # def tutelles(self, tutelles):
    #     liste_tutelles = []
    #     liste = filter(None, tutelles.split('\r\n'))
    #     titres = liste[::3]
    #     sites = liste[1::3]
    #     logos = liste[2::3]
    #     for i in range(len(titres)):
    #         liste_tutelles.append([titres[i], sites[i] if len(sites) > i else None, logos[i] if len(logos) > i else None])
    #     return liste_tutelles

    def tutelles(self, tutelles):
        liste_tutelles = []
        liste = filter(None, tutelles.split('\r\n'))
        keys = liste[::2]
        values = liste[1::2]
        for i in range(len(keys)):
            liste_tutelles.append([keys[i], values[i] if len(values) > i else None])
        return liste_tutelles

    def ds(self):
        ds = self.context.ds.split(' : ')
        return {'numero': ds[0], 'libelle': ds[1], 'code': ds[0].replace(' ', '').lower()}

    def laboratoires(self):
        laboratoires = [l.getObject() for l in self.context.portal_catalog({'portal_type': 'laboratoire'})]
        return {x.id: {'title': x.Title(), 'url': x.absolute_url()} for x in laboratoires}

    def chercheurs(self, lab=None):
        chercheurs = [c.getObject() for c in self.context.portal_catalog({'portal_type': 'chercheur'})]
        if lab:
            return filter(lambda c: lab in [c.fonction_lab1, c.fonction_lab2, c.fonction_lab3, c.fonction_lab4, c.fonction_lab5], chercheurs)
        else:
            return chercheurs

    def chercheur_prix(self):
        prix = [
            {'prix': self.context.prix1, 'prix_html': self.chercheur_prix_html(self.context.prix1), 'url': self.context.prix_lien1},
            {'prix': self.context.prix2, 'prix_html': self.chercheur_prix_html(self.context.prix2), 'url': self.context.prix_lien2},
            {'prix': self.context.prix3, 'prix_html': self.chercheur_prix_html(self.context.prix3), 'url': self.context.prix_lien3},
            {'prix': self.context.prix4, 'prix_html': self.chercheur_prix_html(self.context.prix4), 'url': self.context.prix_lien4},
            {'prix': self.context.prix5, 'prix_html': self.chercheur_prix_html(self.context.prix5), 'url': self.context.prix_lien5},
        ]
        return sorted(prix, key=lambda p: int(re.findall(r'^([0-9]{4})\s+(.*)', p['prix'])[0][0]) if p['prix'] and re.findall(r'^([0-9]{4})\s+(.*)', p['prix']) else 1900, reverse=True)

    def chercheur_prix_html(self, prix):
        if prix:
            if re.findall(r'^([0-9]{4})\s+(.*)', prix):
                return re.sub(r'^([0-9]{4})\s+(.*)', r'<span class="label label-primary">\1</span> <strong>\2</strong>', prix)
            else:
                return '<strong>%s</strong>' % prix
        return prix

    def getIntervenantsByTypes(self, intervenants):
        types = {}
        for i in intervenants:
            t = i.type_responsabilite
            if t not in types:
                types[t] = []
            types[t].append(i)
        return types

    def projets_dsd(self, etats):
        projets = [p.getObject() for p in self.context.portal_catalog({'portal_type': 'projet_dsd'})]
        return [('', p) for p in projets if p.etat_projet in etats]

    def detectUrlOrIframe(self, txt):
        return detectUrlOrIframe(txt)

    def clean(self, txt):
        txt = re.sub(r'\s*style\s*=\s*"[a-zA-Z0-9:;\.\s\(\)\-\,]*"', ' ', txt)  # suppression des attribut "style"
        txt = re.sub(r'\s+/\s+', '/', txt)  # suppression des espaces entre les slashs
        return txt

    ############################################################################################################

    def mobile_link(self, url, portal, suffix):
        #return '%s/%s/%s' % (portal, url, suffix)
        return '%s/%s' % (url, suffix)

    def mobile_folder_items(self, folder=None):
        folder = folder or self.context

        batch = None
        if folder.portal_type == 'Folder' or folder.__class__.__name__ == 'Container':
            batch = folder.listFolderContents()
        elif folder.portal_type == 'Collection':
            batch = folder.results()
        elif folder.portal_type == 'Plone Site':
            batch = Items().getPortalContents(self.context, self.request)

        if batch:
            items = self.items(batch, ['page.html'], mobile=True, isObjects=(folder.portal_type == 'Plone Site' or type(batch) is list))
            return self.filtered(items, '#ExclureContenuTemplate')

        return []

    ############################################################################################################

    def objetsType(self, type, folder=None):
        folder = folder or self.context
        folder_path = '/'.join(folder.getPhysicalPath())
        return self.context.portal_catalog(path=dict(query=folder_path), portal_type=type)

    def tree(self, folder=None, excludes=[]):
        catalog = self.context.portal_catalog
        portal_url = getToolByName(self.context, "portal_url")
        portal = portal_url.getPortalObject()
        acl_users = portal.acl_users

        folder = folder or self.context
        tree = []
        level = 0
        self.tree_recursive(tree, level, folder, catalog, acl_users, excludes)
        return tree

    def tree_recursive(self, tree, level, folder, catalog, acl_users, excludes=[]):
        items = Items()
        folder_path = '/'.join(folder.getPhysicalPath())
        children = catalog(path=dict(query=folder_path, depth=1), sort_on='getObjPositionInParent')
        for child in children:
            childObject = child.getObject()

            if not childObject.id in excludes:
                details = items.details(self.context, self.request, childObject, 100, True)
                details['level'] = level
                details['layout'] = childObject.getLayout()

                sharingView = childObject.unrestrictedTraverse('@@sharing')
                roles = sharingView.role_settings()
                users = [r for r in roles if r['type'] == 'user']
                groups = [r for r in roles if r['type'] == 'group']

                details['readers'] = [u['id'] for u in users if u['roles']['Reader']]
                details['editors'] = [u['id'] for u in users if u['roles']['Editor']]
                details['readers_groups'] = [u['id'] for u in groups if u['roles']['Reader']]
                details['editors_groups'] = [u['id'] for u in groups if u['roles']['Editor']]

                tree.append({'object': details, 'children': []})
                if child.is_folderish:
                    self.tree_recursive(tree[-1]['children'], level+1, childObject, catalog, acl_users, excludes)

    def idDefaultText(self, txt):
        if not txt:
            return True
        else:
            t = txt.lower()
            return (len(t) < 10 or 'lorem ipsum' in t or 'sociis' in t or 'maecenas' in t or 'scelerisque' in t or 'ullamcorper' in t or 'porttitor' in t or t.startswith('a completer'))

    def getTextTrunc(self, txt, limit=100):
        return re.sub('<[^<]+?>', '', txt)[0: limit]+'...' if txt else ''

    #########################################################################################################
    ### ONE PAGE ############################################################################################
    #########################################################################################################

    def getOnePageDefaults(self, scales):
        c = self.context
        t = c.portal_type

        defaults = {}
        if t == 'onepage':
            defaults['display_site_menu'] = c.display_site_menu

            defaults['logo1_image'] = scales.scale('logo1_image', scale='mini').url if getattr(c, 'logo1_image') else None
            defaults['logo1_captions'] = c.logo1_captions
            defaults['logo1_href'] = c.logo1_href

            defaults['logo2_image'] = scales.scale('logo2_image', scale='mini').url if getattr(c, 'logo2_image') else None
            defaults['logo2_captions'] = c.logo2_captions
            defaults['logo2_href'] = c.logo2_href

            defaults['logo3_image'] = scales.scale('logo3_image', scale='mini').url if getattr(c, 'logo3_image') else None
            defaults['logo3_captions'] = c.logo3_captions
            defaults['logo3_href'] = c.logo3_href

            defaults['footer'] = c.footer.output if getattr(c, 'footer') else None
        else:
            details = Items().details(c, self.request, c, 100, True)

            defaults['display_site_menu'] = '#OnePageAfficherMenuSite' in details['subjects']

            defaults['logo1_image'] = details['image']
            defaults['logo1_captions'] = c.portal_url.getPortalObject().Title()
            defaults['logo1_href'] = c.portal_url.getPortalObject().absolute_url()

            defaults['logo2_image'] = None
            defaults['logo2_captions'] = None
            defaults['logo2_href'] = None

            defaults['logo3_image'] = None
            defaults['logo3_captions'] = None
            defaults['logo3_href'] = None

            defaults['footer'] = None

        return defaults

    def getOnePageParts(self):
        context = self.context
        langs = [
            {'code': 'fr', 'lang': 'Français'},
            {'code': 'en', 'lang': 'English'},
            {'code': 'it', 'lang': 'Italiano'},
            {'code': 'ru', 'lang': 'Русский'},
            {'code': 'zh', 'lang': '中文(简体)'},
        ]
        fallback = 'fr'
        general_fields = ['order', 'fa_icon', 'contentleadimage', 'thumbnail1_image', 'thumbnail2_image', 'graphdata1', 'graphdata2', 'iframe']
        locale_fields = ['title', 'subtitle', 'text', 'more_text', 'thumbnail1_captions', 'thumbnail2_captions', 'graph1_title', 'graph1_captions', 'graph2_title', 'graph2_captions', 'iframe_title']
        items = self.getOnePageContents(context) or []

        results = []
        locales = []
        i = 0
        for item in items:
            hero = (i == 0)
            (access, roles) = Item().access(context, item)
            part = {'item': item, 'hero': hero, 'uuid': str(uuid.uuid1()), 'fallbacks': {}, 'access': access, 'roles': roles}
            for lang in langs:
                part[lang['code']] = {}
                noValue = True
                for field in locale_fields:
                    value = self.getOnePagePartValue(item, field, hero, lang=lang['code'], fallback=fallback)
                    part[lang['code']][field] = value
                    if value:
                        noValue = False

                if not noValue:
                    for field in general_fields:
                        value = self.getOnePagePartValue(item, field, hero)
                        part[lang['code']][field] = value

                    if not lang['code'] in locales:
                        locales.append(lang['code'])
                else:
                    part.pop(lang['code'], None)

            results.append(part)
            i = i + 1

        (access, roles) = Item().access(context, context)
        result = {
            'items': results, 'locales': locales,
            'langs': {lang['code']: lang['lang'] for lang in langs}, 'fallback': fallback,
            'access': access, 'roles': roles
        }
        # print '============================================================='
        # print '============================================================='
        # print '============================================================='
        # pp.pprint(results)
        # print '============================================================='
        # print '============================================================='
        # print '============================================================='
        return self.getOnePageLocalesWithFallbacks(result)

    def getOnePageContents(self, el):
        if el.portal_type in ['Folder', 'Collection', 'Plone Site'] or el.__class__.__name__ == 'Container':
            items = Items().getFolderContents(el, el, self.request)
            if el.portal_type in ['Collection']:
                items = [i.getObject() for i in items]

            if items and len(items) > 0 and items[0].portal_type == 'chercheur':
                items.insert(0, items[0])

            return items
        else:
            return []

    def getOnePagePartValue(self, item, key, hero, lang=None, fallback=None):
        t = item.portal_type.replace(' ', '_')
        if t == 'onepagepart':
            scales = item.unrestrictedTraverse('@@images')
            value = getattr(item, '%s_%s' % (key, lang), None) if lang else getattr(item, key, None)

            if value and value.__class__.__name__ == 'RichTextValue':
                value = value.output
            if value and value.__class__.__name__ == 'NamedBlobImage':
                value = scales.scale(key, scale='full').url

            if key == 'text':
                value = {'type': 'string', 'contents': value, 'details': None}

            return value
        elif t in ['Document', 'Folder', 'Collection', 'chercheur', 'video', 'Event', 'News_Item', 'FormFolder']:
            if (not lang) or (lang and fallback == lang):
                desc_br = '<br/>'.join(item.Description().split('\n'))

                if key == 'order':
                    return 'Vignettes | Texte | Graphique'
                if key in ['title', 'subtitle', 'thumbnail1_captions']:
                    # return details['title']
                    return item.Title()
                if key == 'text':
                    details = Items().details(self.context, self.request, item, 100, True, prefix_themes='#FilUNSTheme')

                    if t in ['Folder', 'Collection']:
                        contents = []
                        batch = Items().getFolderContents(item, self.context, self.request, True)
                        for content in batch:
                            contents.append(Item().itemDetails(content, self.context, self.request, '', [], '', [], {}, 100, None, True))

                        foldertype = 'Folder'
                        if [c['type'] for c in contents] == ['Image'] * len(contents):
                            foldertype = 'galerie'
                        return {'type': foldertype, 'contents': contents, 'details': details}

                    elif t in ['chercheur']:
                        return {'type': t, 'contents': item, 'details': details}

                    elif t in ['video']:
                        url = self.detectUrlOrIframe(item.iframe)
                        return {'type': t, 'contents': {'url': url, 'description': desc_br}, 'details': details}

                    elif t in ['Event', 'News_Item']:
                        if not desc_br:
                            desc_br = details['text']
                        return {'type': t, 'contents': desc_br, 'details': details}

                    elif t in ['FormFolder']:
                        form_path = '%s/@@embedded' % '/'.join(item.getPhysicalPath())
                        form_view = self.context.restrictedTraverse(form_path)
                        return {'type': t, 'contents': form_view(), 'details': details}
                    else:
                        if desc_br:
                            imgs = re.findall(r"<img.+?src=[\"'](.+?)[\"'].*?>", details['text'])
                            if len(imgs) > 0:
                                desc_br = '%s<br/><br/><img src="%s"/>' % (desc_br, imgs[0])
                        else:
                            desc_br = details['text']
                        return {'type': 'string', 'contents': desc_br, 'details': details}

                if key == 'more_text':
                    if desc_br:
                        text = item.getText().strip() if hasattr(item, 'getText') else None
                        return text
                    else:
                        return None

                if key in ['contentleadimage', 'thumbnail1_image']:
                    if '#AffichageParallax' in list(self.context.Subject()) and not hero:
                        return None

                    if key == 'contentleadimage' and t == 'chercheur' and hero:
                        return '++resource++unice.templates.images/blurred/%s.jpg' % item.background_image
                    details = Items().details(self.context, self.request, item, 100, True)
                    if not details['image_default']:
                        return details['image_full']

                return None
        else:
            return None

    def getOnePageLocalesWithFallbacks(self, items):
        fallback = items['fallback']
        for lang in items['locales']:
            for item in items['items']:
                if lang in item:
                    item['fallbacks'][lang] = False
                elif fallback in item:
                    item[lang] = item[fallback]
                    item['fallbacks'][lang] = True
                else:
                    item[lang] = None
                    item['fallbacks'][lang] = True
        return items

    def getOnePageItemLocale(self, item, lang):
        fallback = 'fr'
        if lang in item:
            return {'locales': item[lang], 'lang': lang}
        elif fallback in item:
            return {'locales': item[fallback], 'lang': fallback}
        else:
            return None

    def getOnePageItemContents(self, locales):
        cols = {
            'graphdata1': 3,
            'graphdata2': 3,
            'thumbnail1_image': 2,
            'thumbnail2_image': 2,
        }
        cols['text'] = 12 - sum(cols.itervalues())

        if locales['graphdata1'] is None:
            cols['text'] += cols['graphdata1']
            cols['graphdata1'] = 0
        if locales['graphdata2'] is None:
            cols['text'] += cols['graphdata2']
            cols['graphdata2'] = 0
        if locales['thumbnail1_image'] is None:
            cols['text'] += cols['thumbnail1_image']
            cols['thumbnail1_image'] = 0
        if locales['thumbnail2_image'] is None:
            cols['text'] += cols['thumbnail2_image']
            cols['thumbnail2_image'] = 0

        orders = locales['order'].split(' | ')
        offsets = {
            'Texte': ['text'],
            'Vignettes': ['thumbnail1_image', 'thumbnail2_image'],
            'Graphique': ['graphdata1', 'graphdata2'],
        }

        contents = []
        for order in orders:
            offset = offsets[order]
            for key in offset:
                if cols[key] > 0:
                    contents.append({
                        'key': key,
                        'class': 'col-sm-%s %s' % (cols[key], 'col-xs-6' if key in offsets['Vignettes'] else '')
                    })

        return contents

    def getOnePageItemGraph(self, graphdata, captions, id):
        graphcolors = [
            ['#ED5565', '#DA4453'],
            ['#A0D468', '#8CC152'],
            ['#4FC1E9', '#3BAFDA'],
            ['#FFCE54', '#F6BB42'],
            ['#AC92EC', '#967ADC'],
            ['#FC6E51', '#E9573F'],
            ['#CCD1D9', '#AAB2BD'],
        ]

        graphlocales = captions.splitlines() if captions else []
        graphdata1 = graphdata
        if graphdata1:
            datas = graphdata1.splitlines()
            rows = []
            for i in range(len(datas)):
                data = datas[i].replace(',', '.')
                if self.is_number(data):
                    row = {'value': float(data)}

                    color = graphcolors[i] if i < len(graphcolors) else graphcolors[-1]
                    row['color'] = color[0]
                    row['highlight'] = color[1]

                    row['label'] = graphlocales[i] if i < len(graphlocales) else data

                    rows.append(row)
            output = 'var data = %s; new Graph(\'Doughnut\', \'#%s\', data, {});' % (json.dumps(rows), id)
            return output
        return None

    def getOnePageIframe(self, iframe):
        if iframe:
            match = re.search(r'src=["\'](.+?)["\']', iframe)
            if match:
                return match.group(1)
        return None

    def getOnePageSiteContents(self, folder):
        return Items().getFolderContents(folder, self.context, self.request, True)

    def getOnePageSiteMenu(self):
        parent = self.context.aq_parent.aq_parent
        items = Items().getFolderContents(parent, self.context, self.request, True)
        return {'parent': parent, 'items': items}

    def is_number(self, s):
        try:
            float(s)
            return True
        except ValueError:
            pass
        try:
            import unicodedata
            unicodedata.numeric(s)
            return True
        except (TypeError, ValueError):
            pass
        return False

    #########################################################################################################
    ### CSV LABORATOIRES ####################################################################################
    #########################################################################################################

    def laboratoires_csv(self):
        # encoding = 'utf-8'
        # encoding = 'mac_roman'
        keys = [
            'Title',
            'Description',
            'sigle',
            'codification',
            'mots_cles',
            '@contentleadimage',
            'liste_tutelles',
            'directeur_nom',
            'directeur_email',
            'directeur_telephone',
            'directeur_adjoint_nom',
            'directeur_adjoint_email',
            'directeur_adjoint_telephone',
            'adresse_postale',
            'complement_adresse',
            'code_postal',
            'ville',
            'plan_acces',
            'url_site',
            'url_plaquette',
            'contact_nom',
            'contact_email',
            'contact_telephone',
        ]
        lines = []

        lines.append([s for s in keys])

        laboratoires = self.context.portal_catalog(portal_type='laboratoire')
        for lab in laboratoires:
            item = lab.getObject()
            scales = item.unrestrictedTraverse('@@images')
            row = []
            for key in keys:
                if key.startswith('@'):
                    key = key[1:]
                value = getattr(item, key, '')
                value = value() if callable(value) else value

                if value and value.__class__.__name__ == 'RichTextValue':
                    value = value.output
                if value and value.__class__.__name__ == 'NamedBlobImage':
                    value = scales.scale(key, scale='full').url

                if not value:
                    value = ''

                try:
                    value = value.decode('utf-8')
                except:
                    continue

                accents = {
                    u'à': u'à', u'â': u'â', u'ä': u'ä',
                    u'é': u'é', u'è': u'è', u'ê': u'ê',
                    u'ì': u'ì', u'î': u'î', u'ï': u'ï',
                    u'ò': u'ò', u'ô': u'ô', u'ö': u'ö',
                    u'ù': u'ù', u'û': u'û', u'ü': u'ü',
                    u'ç': u'ç',
                }
                for k, v in accents.iteritems():
                    value = value.replace(k, v)
                    value = value.replace(k.upper(), v.upper())

                value = value.replace('\r\n', ' ')
                row.append(value)

            lines.append([s for s in row])

        self.request.response.setHeader('Content-Type', 'application/json; charset=utf-8')
        return json.dumps(lines)

    #########################################################################################################
    ### CARTE DE VOEUX ######################################################################################
    #########################################################################################################

    # def genererCarte(self):
    #     folder = 'src/unice.templates/unice/templates/browser'
    #     # folder = '/home/zope/sites/plone432/src/unice.templates/unice/templates/browser'

    #     img = Image.open('%s/images/carte-de-voeux1.jpg' % folder)
    #     (W, H) = img.size
    #     draw = ImageDraw.Draw(img)

    #     font1 = ImageFont.truetype('%s/stylesheets/fonts/Roboto-Light.ttf' % folder, 58)
    #     font2 = ImageFont.truetype('%s/stylesheets/fonts/Roboto-Thin.ttf' % folder, 46)

    #     margin = 20
    #     top = 450
    #     y = top

    #     text = self.context.Title()
    #     lines, tmp, lineheight = self.textWrap(draw, text, font1, W-2*margin)
    #     lineheight = 58
    #     j = 0
    #     for line in lines:
    #         w, h = draw.textsize(line, font1)
    #         x = math.floor(margin + (W-2*margin - w)/2)
    #         y = y+lineheight
    #         draw.text((x, y), line, font=font1, fill='#cda228')
    #         j = j + 1

    #     y = y + 20

    #     text = self.context.Description()
    #     lines, tmp, lineheight = self.textWrap(draw, text, font2, W-2*margin)
    #     lineheight = 46
    #     j = 0
    #     for line in lines:
    #         w, h = draw.textsize(line, font2)
    #         x = math.floor(margin + (W-2*margin - w)/2)
    #         y = y+lineheight
    #         draw.text((x, y), line, font=font2, fill='#cda228')
    #         j = j + 1

    #     img.save('sample-out.jpg')

    #     return draw

    # def textWrap(self, drawer, text, font, containerWidth):
    #     words = text.split()
    #     lines = []
    #     lines.append(words)
    #     finished = False
    #     line = 0
    #     while not finished:
    #         thistext = lines[line]
    #         newline = []
    #         innerFinished = False
    #         while not innerFinished:
    #             if drawer.textsize(' '.join(thistext), font)[0] > containerWidth:
    #                 newline.insert(0, thistext.pop(-1))
    #             else:
    #                 innerFinished = True
    #         if len(newline) > 0:
    #             lines.append(newline)
    #             line = line + 1
    #         else:
    #             finished = True
    #     tmp = []
    #     for i in lines:
    #         tmp.append(' '.join(i))
    #     lines = tmp
    #     (width, height) = drawer.textsize(lines[0], font)
    #     return (lines, width, height)
