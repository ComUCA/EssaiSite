# -*- coding: utf-8 -*-


def parseLigne(ligne, sep):
    colonnes = ligne.split(sep)
    type = colonnes.pop(0)
    titre = filter(None, colonnes)[0]
    level = colonnes.index(titre)
    return (type, titre, level, colonnes)


def createObject(type, title, parent, force_id=None, restrict=None, layout=None, exclude=False, c=context):
    c.plone_log(parent.generateUniqueId(type))
    id = parent.generateUniqueId(type)
    parent.invokeFactory(type, id, title=title)
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


def createArborescence(ligne, delimiter, urlparent, sizeParent, p=None, parent=context, output="", old_lvl=0):
    li = ligne.pop()
    champs = li.split(delimiter)
    typeC = determinedTypeForPlone(champs[0])
    lvl = int(champs[1])
    content = champs[2]
    if lvl == 1:
        path = createParent_url(lvl, urlparent, content, sizeParent)
        parent = context
    else:
        path = createParent_url(lvl, p, content, sizeParent)
        if old_lvl > lvl:
            parent = parent.aq_parent.aq_parent
    p = path.replace("/" + content, "")
    output += path + "\n"
    parent = createObject(typeC, content, parent)
    if len(ligne) == 1:
        return output
    return createArborescence(ligne, delimiter, urlparent, sizeParent, path, parent, output, lvl)


def determinedTypeForPlone(typeExcel):
    if typeExcel == "Texte enrichi":
        return "Document"
    if typeExcel == "Formulaire":
        return "FormFolder"
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


def createParent_url(lvl, p, title, sizeParent):
        p_tmp = p + "/" + title
        if isGood(p_tmp, lvl, sizeParent):
            return p_tmp
        else:
            p_tmp = determinedParent(p, "/")
            return createParent_url(lvl, p_tmp, title, sizeParent)


def prepareData(data, separator):
    l_output = []
    if data:
        l_output = data.split(separator)
        l_output.reverse()
        return l_output
    return False


"""
Pour crée un objet de type formFolder, il faut dans la zmi dans portal_type:
    - desactiver le filtre sur le type FormFolder
    - Rendre les types FormMailerAdapter, FormTextFiled, FormThanksPage "implicitly adable"
"""
urlparent = context.absolute_url_path()
parent = context
lignes = prepareData(data, "&&&")
delimiter = "@@@"
countSlash = urlparent.count("/")
sortie = createArborescence(lignes, delimiter, urlparent, countSlash)
print sortie
return printed
