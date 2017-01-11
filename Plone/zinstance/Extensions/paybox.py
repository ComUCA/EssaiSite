# -*- coding: utf-8 -*-
import binascii
import hashlib
import hmac
import uuid
from datetime import datetime

import pprint
pp = pprint.PrettyPrinter(indent=4)

class Paybox(object):

	def __init__(self, site=None, rang=None, identifiant=None, key=None):
		super(Paybox, self).__init__()
		self.site = site
		self.rang = rang
		self.identifiant = identifiant
		self.key = key

	def genererHMAC(self, reference=None, total=None, porteur=None, retour_effectue=None, retour_refuse=None, retour_annule=None, retour_attente=None):
		# Verification des parametres de connexion
		if not self.site or not self.rang or not self.identifiant or not self.key:
			return None

		# Verification des donnees de l'achat
		if not total or not reference or not porteur or not retour_effectue or not retour_refuse or not retour_annule or not retour_attente:
			return None

		# Parametres du formulaire
		date = datetime.now().isoformat()
		params = [
			('PBX_SITE', self.site),
			('PBX_RANG', self.rang),
			('PBX_IDENTIFIANT', self.identifiant),
			('PBX_TOTAL', str(int(total)*100)),
			('PBX_DEVISE', '978'),
			('PBX_CMD', reference),
			('PBX_PORTEUR', porteur),
			('PBX_RETOUR', 'Mt:Mt:M;Ref:R;Auto:A;Erreur:E'),
			('PBX_EFFECTUE', retour_effectue),
			('PBX_REFUSE', retour_refuse),
			('PBX_ANNULE', retour_annule),
			('PBX_ATTENTE', retour_attente),
			('PBX_HASH', 'SHA512'),
			('PBX_TIME', date)
		]
		msg = '&'.join(['='.join(p) for p in params])

		# Generation de la cle HMAC
		binary_key = binascii.unhexlify(self.key)
		pbx_hmac = hmac.new(binary_key, msg, hashlib.sha512).hexdigest().upper()

		# Generation des parametres GET
		get = '%s&PBX_HMAC=%s' % (msg, pbx_hmac)

		print date
		print pbx_hmac
		return {'msg': msg, 'params': params, 'hmac': pbx_hmac, 'get': get}

################################################################################################

def genererHMAC(site, rang, identifiant, key, reference, total, porteur, retour_effectue, retour_refuse, retour_annule, retour_attente):
	paybox = Paybox(site, rang, identifiant, key)
	return paybox.genererHMAC(reference, total, porteur, retour_effectue, retour_refuse, retour_annule, retour_attente)

def uniqueID():
	return uuid.uuid1()

if __name__ == '__main__':
	site = '2342046';
	rang = '01';
	identifiant = '533887902';
	key = 'FFEFB4394ACB64BDC18CF847E68C9F5463A405677091F24FA1F6580060A073F6EDAFBE18837B51707061B6D102EF80E44B85E501C44E72B8343AC1E813C1E7A5';

	reference = 'eaed2e3d-7eca-11e3-aa3e-3c07545a9674'
	total = '15'
	porteur = 'jeromenavarro@gmail.com'

	retour_effectue = 'http://tice207.unice.fr/paybox/paybox_retour_effectue.php'
	retour_refuse = 'http://tice207.unice.fr/paybox/paybox_retour_refuse.php'
	retour_annule = 'http://tice207.unice.fr/paybox/paybox_retour_annule.php'
	retour_attente = 'http://tice207.unice.fr/paybox/paybox_retour_attente.php'

	pp.pprint(genererHMAC(site, rang, identifiant, key, reference, total, porteur, retour_effectue, retour_refuse, retour_annule, retour_attente))
