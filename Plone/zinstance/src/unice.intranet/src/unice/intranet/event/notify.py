# -*- coding: utf-8 -*-
from zope.app.component.hooks import getSite
from Products.CMFCore.utils import getToolByName
from zope.globalrequest import getRequest
from Products.statusmessages.interfaces import IStatusMessage
from DateTime.DateTime import DateTime
from plone.registry.interfaces import IRegistry
from zope.component import getUtility
import json

import logging
logger = logging.getLogger('INTRANET')


def SAMLPropertiesExist(object):
    request = getRequest()
    messages = IStatusMessage(request)

    props = object.properties
    logger.info('SAMLProperties : properties : %s' % props)
    messages.add(props, type=u"info")
    if 'eduPersonAffiliation' in props:
        portal = getSite()
        mt = portal.portal_membership
        portal_groups = getToolByName(portal, 'portal_groups')

        # Affiliations CAS
        affiliations = props['eduPersonAffiliation']
        if not isinstance(affiliations, list):
            affiliations = [affiliations]

        # Création du membre
        member = mt.getMemberById(props['uid'])
        if not member:
            mt.addMember(props['uid'], portal.portal_registration.generatePassword(), ('Member',), [])
            member = mt.getMemberById(props['uid'])
            member.setMemberProperties({'fullname': props['displayName'].encode('utf-8'), 'email': props['email'], 'last_login_time': DateTime()})

        # Creation des groupes
        groupes_cas = json.loads(getUtility(IRegistry).get('intranet.groupes_cas'))
        groupes_member = getMemberGroupsFromCAS(groupes_cas, affiliations)
        logger.info('SAMLProperties : groupes du membre : %s' % [g['group_id'] for g in groupes_member])
        messages.add([g['group_id'] for g in groupes_member], type=u"info")

        for old_group in portal_groups.getGroupsByUserId(member.getId()):
            # Suppression des groupes du membre
            if old_group.id not in ['AuthenticatedUsers']:
                portal_groups.removePrincipalFromGroup(member.getUserName(), old_group.id)

        for group in groupes_member:
            group_id = group['group_id']

            # Creation du groupe
            if group_id not in portal_groups.getGroupIds():
                portal_groups.addGroup(group_id, [], [], title=group['group_title'])

            # Ajout des groupes au membre
            portal_groups.addPrincipalToGroup(member.getUserName(), group_id)


def getMemberGroupsFromCAS(specs, affiliations):
    groups = []
    for spec in specs:
        op = spec['operator'] if 'operator' in spec else 'or'

        common = set(affiliations).intersection(spec['affiliations'])
        if (op == 'or' and len(common) > 0) or (op == 'and' and len(common) == len(spec['affiliations'])):
            groups.append(spec)

    return groups


"""

{'username': 'navarro', 'eduPersonAffiliation': ['member', 'staff', 'employee'], 'displayName': u'J\xe9r\xf4me Navarro', 'user': 'navarro', 'email': 'Jerome.NAVARRO@unice.fr', 'uid': 'navarro'}
{'username': 'pdupond', 'eduPersonAffiliation': ['teacher'], 'displayName': 'Philippe Dupond', 'user': 'pdupond', 'email': 'Philippe.DUPOND@unice.fr', 'uid': 'pdupond'}
{'username': 'amoisan', 'eduPersonAffiliation': ['member', 'student'], 'displayName': ['Alexis Moisan'], 'user': ['amoisan'], 'email': ['Alexis.MOISAN@unice.fr'], 'uid': ['amoisan']}
{'username': 'ma308392', 'eduPersonAffiliation': ['member', 'student'], 'displayName': ['Alexis Moisan'], 'user': ['ma308392'], 'email': ['alexis.moisan@etu.unice.fr'], 'uid': ['21308392']}
{'username': 'fsalmon', 'eduPersonAffiliation': ['member', 'staff', 'employee'], 'displayName': ['Frederic Salmon'], 'user': ['fsalmon'], 'email': ['Frederic.SALMON@unice.fr'], 'uid': ['fsalmon']}


ONGLETS PRINCIPAUX :

Administrateurs uPortal
Anonymes
Application Harpege
Etablissement
Etudiants
Invites
Onglet Scolarite
Outils CRI
Personnels

SOUS-ONGLETS :

Administrateurs
Administrateurs uPortal
Anonymes
Application Apogee
Application ApoPortail
Application FSI
Application GOF
Application Harpege
Application Interne DSI
Application OCS Inventory
Application PHP Conges
Application Profetes
Application Trombinos
Enseignants IUT
Etablissement
Etape-MPAES-100
Etudiants
Etudiants BV
Etudiants IUT
Invites
LDAP Tous les Non apprenants
LDAP Tout le personnel
LDAP Tout le personnel
Onglet Scolarite
Outils CRI
Personnels
Personnels IUT
Personnels Service Commun du Systeme d Information (SCSI)
Tous les groupes de personnes

"""
