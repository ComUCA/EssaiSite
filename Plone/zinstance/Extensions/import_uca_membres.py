# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName

users = [
    ['Brigitte.Papin@dr20.cnrs.fr', 'uca_brigitte_papin', 'StYAUt6G'],
    ['Beatrice.SAINT-CRICQ@dr20.cnrs.fr', 'uca_beatrice_saint_cricq', 'VwGyvzmy'],
    ['michel.bernasconi@skema.edu', 'uca_michel_bernasconi', 'SsSZtNgS'],
    ['Claire.BERGERY-NOEL@edhec.edu', 'uca_claire_bergery_noel', 'ybeH8jcs'],
    ['gerard.giraudon@inria.fr', 'uca_gerard_giraudon', 'PV6fyAGK'],
    ['philippe.henry@inria.fr', 'uca_philippe_henry', '4Wf58SSb'],
    ['sweertvaegher.s@chu-nice.fr', 'uca_sweertvaegher_s', '3UhY83dX'],
    ['thierry.lanz@oca.eu', 'uca_thierry_lanz', 'bm3LtJdH'],
    ['sophie.rouziere@oca.eu', 'uca_sophie_rouziere', 'CcxPuMd8'],
    ['maurille.lariviere@gmail.com', 'uca_maurille_lariviere', 'tRfLutec'],
    ['tcollard.esra@wanadoo.fr', 'uca_tcollard_esra', 'JWgr2GHE'],
    ['jean.zieger@pacaemergence.com', 'uca_jean_zieger', 'CsTZ53JU'],
    ['pjbarre@unice.fr', 'uca_pjbarre', 'yyQBCkUK'],
    ['Jean-Christophe.BOISSE@unice.fr', 'uca_jean_christophe_boisse', 'jhr4Qj4n'],
    ['laurent.giroux@unice.fr', 'uca_laurent_giroux', 'xpPEYKtK'],
    ['Sylvie.MELLET@unice.fr', 'uca_sylvie_mellet', 'pwBh9BAM'],
    ['Caty.CONRAUX@unice.fr', 'uca_caty_conraux', 'xbdrR38b'],
    ['Christophe.ROUSSEAU@unice.fr', 'uca_christophe_rousseau', '6G7h9YcV'],
    ['olivier.lubrano@unice.fr', 'uca_olivier_lubrano', 'M8rMyP58'],
    ['wladimir.boric@nicecotedazur.org', 'uca_wladimir_boric', 'kbCHHSqr'],
    ['veronique.paquis@ville-nice.fr', 'uca_veronique_paquis', '9R7WrsnN'],
    ['masson@incubateurpacaest.org', 'uca_masson', 'ysj9PJrq'],
    ['jean-francois.agassant@mines-paristech.fr', 'uca_jean_francois_agassant', 'ENSFSMUe'],
    ['Pierre.Abad@sophia.inra.fr', 'uca_pierre_abad', 'aqsLfGJw'],
    ['michel.bariteau@paca.inra.fr', 'uca_michel_bariteau', 'GyKHQw43'],
    ['dominique.nobile@inserm.fr', 'uca_dominique_nobile', '9R9BYcpZ'],
    ['aurelie.philippe@inserm.fr', 'uca_aurelie_philippe', 'mq2dyd7x'],
    ['ulrich.finger@eurecom.fr', 'uca_ulrich_finger', 'rf3Ld2b5'],
    ['philippe.charvis@geoazur.unice.fr', 'uca_philippe_charvis', 'BE8jApNx'],
    ['Gaby.gorsky@obs-vlfr.fr', 'uca_gaby_gorsky', '9jDVsRwW'],
    ['david.izoard@skema.edu', 'uca_david_izoard', 'mdApEdv5'],
    ['michel.tani@agglo-paysdelerins.fr', 'uca_michel_tani', 'JxPsK7UB'],
    ['mathieu.roussennac@ville-cannes.fr', 'uca_mathieu_roussennac', 'KGGAHnYq'],
    ['stephane.amarger@eitictlabs.eu', 'uca_stephane_amarger', '8vrTzXxB'],
    ['frobine@cg06.fr', 'uca_frobine', 'BbpJ2XeC'],
    ['jerome.chifflet@eitictlabs.eu', 'uca_jerome_chifflet', 'bhvJjYcB'],
    ['bruno.ledantec@eitictlabs.eu', 'uca_bruno_ledantec', 'm8s7QNnp'],
    ['bernard.kleynhoff@cote-azur.cci.fr', 'uca_bernard_kleynhoff', 'JX2gGZ49'],
    ['jlesieur@teamcotedazur.fr', 'uca_jlesieur', 'UqX94MqS'],
    ['p.molager@agglo-casa.fr', 'uca_p_molager', 'M2N4gy6d'],
    ['fx.koempgen@agglo-casa.fr', 'uca_fx_koempgen', 'AzBbN3BY'],
    ['maryam.rousta-giroud@ville-cannes.fr', 'uca_maryam_rousta_giroud', 'bRyqnqNX'],
    ['michel.baravalle@apave.com', 'uca_michel_baravalle', '7gDDrpFE'],
    ['president@upe06.com', 'uca_president_upe06', 'jtYpHagP'],
]
regtool = getToolByName(context, 'portal_registration')

for user in users:
    properties = {'username': user[1], 'fullname': user[1], 'email': user[0]}
    regtool.addMember(user[1], user[2], properties=properties)

return True
