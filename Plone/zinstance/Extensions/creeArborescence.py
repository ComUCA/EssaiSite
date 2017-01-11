# -*- coding: utf-8 -*-


def parseLigne(ligne, sep):
    colonnes = ligne.split(sep)
    type = colonnes.pop(0)
    titre = filter(None, colonnes)[0]
    level = colonnes.index(titre)
    return (type, titre, level, colonnes)


def createObject(parent, type, title, force_id=None, restrict=None, layout=None, exclude=False):
    id = parent.generateUniqueId(type)
    parent.invokeFactory(type, id)
    obj = parent[id]
    obj.processForm()
    if force_id:
     obj.setId(force_id)
     obj.reindexObject()
    if type == 'Document':
     obj.setDescription('[CONTENU A REDIGER]')
     obj.setText('<p>[CONTENU A REDIGER]</p>')
    if restrict:
     restrictions(obj, restrict)
    if layout:
     obj.setLayout(layout)
    if exclude:
     obj.setExcludeFromNav(True)
     obj.reindexObject()
    obj = '%s/%s --> %s \n' % (parent, title, type)
    return obj


def restrictions(parent, types):
    parent.setConstrainTypesMode(1)
    parent.setLocallyAllowedTypes(types)
    parent.setImmediatelyAddableTypes(types)


def createRubrique(parent, type, title, layout=None, entete=None):
    if title:
        if not type:
            type = 'Document'

        rubrique = createObject(parent, type, title)
        if rubrique and type == 'Folder':
            document = createObject(rubrique, 'Document', title)
            rubrique.manage_addProperty('default_page', document.getId(), 'string')
            document.setExcludeFromNav(True)
            document.reindexObject()
            if layout:
                document.setLayout(layout)
            if entete:
                document = createObject(rubrique, 'Document', title, entete)
                document.setExcludeFromNav(True)
                document.reindexObject()
        return rubrique
    return None


def createArborescence(ligne, delimiter, output, urlparent, sizeParent, parent, p=None):
    li = ligne.pop()
    champs = li.split(delimiter)
    typeC = determinedTypeForPlone(champs[0])
    lvl = int(champs[1])
    content = champs[2]
    if lvl == 1:
        path = createParent(lvl, urlparent, content, sizeParent)
    else:
        path = createParent(lvl, p, content, sizeParent)
    p = path.replace("/" + content, "")
    output += createObject(parent, typeC, content)
    if len(ligne) == 1:
        return output
    return createArborescence(ligne, delimiter, output, urlparent, sizeParent, parent, path)


def determinedTypeForPlone(typeExcel):
    if typeExcel == "Texte enrichi":
        return "Document"
    if typeExcel == "Formulaire":
         return "Document"
        # return "Form"
    if typeExcel == "Listing/mosaique" or "Sous-rubrique":
        return "Folder"
    else:
        return None


def determinedParent(p, delimiter):
    liste = p.split(delimiter)
    liste.pop()
    str_output = ""
    for x in liste:
        if x == "":
            continue
        str_output += "/" + x
    return str_output


def isGood(p, lvl, sizeParent):
    size = p.count("/")
    if size == sizeParent + lvl:
        return True
    return False


def createParent(lvl, p, title, sizeParent):
        p_tmp = p + "/" + title
        if isGood(p_tmp, lvl, sizeParent):
            return p_tmp
        else:
            p_tmp = determinedParent(p, "/")
            return createParent(lvl, p_tmp, title, sizeParent)


def prepareData(data, separator):
    l_output = []
    if data:
        l_output = data.split(separator)
        l_output.reverse()
        return l_output
    return False


def init(data, context):
    urlparent = context.absolute_url_path()
    parent = context
    lignes = prepareData(data, "&&&")
    futurearbo = ""
    delimiter = "@@@"
    countSlash = urlparent.count("/")
    sortie = createArborescence(lignes, delimiter, futurearbo, urlparent, countSlash, parent)
    return True
