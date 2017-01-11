def fillField():
	context = context
	request = request
	fields = fields
	saver_key = "enregistrement-formulaire-de-location-de-studio"
	parent = context.aq_parent.aq_parent
	
	formulaireDelocation =  getattr(parent, "formulaire-de-location-de-studio")
	clef = ["civilite", "nom", "prenom", "mail", "telephone", "typeLogement", "occupant", "enfant", "contextVisite", "arrivee", "depart", "etablissement", "etablissementAutre","UCAJEDI", "priseEnCharge", "contact", "mailContact", "token", "prix", "duree", "dt", "HTTP_X_FORWARDED_FOR", "REMOTE_ADDR",  "HTTP_USER_AGENT", "Navigateur"]
	row_result = checkEmail(saver_key, formulaireDelocation, tokenGET)
	dico = genDico(clef,row_result)


def checkEmail(saver_key, context_tmp, token):
    savedData = context_tmp[saver_key].getSavedFormInputForEdit()
    for x in savedData.split('\r\n'):
        row = x.split(',')
        if token in row:
            return row
    return None

def genDico(clef, valeur):
    i = 0
    dico = {}
    longueurKey = len(clef)
    longueurVal = len(valeur)
    if longueurKey != longueurVal:
        return None
    else:
        for k in clef:
            dico[k] = valeur[i] 
            i = i+1
    return dico


def log(str):
    context.plone_log(str)


def findRowinSavedData(saver, key, value, delimiter):
    savedData = saver.getSavedFormInputForEdit()
    for row in savedData.split('\r\n'):
        cols = dict(zip(saver.getColumnNames(), row.split(delimiter)))
        if key in cols and cols[key] == value:
            return cols
    return None

def findData(token)
	saver = getattr(getattr(context, 'formulaire-de-location-de-studio'), 'enregistrement-formulaire-de-location-de-studio')
	dictrow = findRowinSavedData(saver, 'token', 'e5ef26b8-83f3-11e6-8745-3c07544e59ea', ',')
	if dictrow:
	    log(dictrow)
	    return dictrow










