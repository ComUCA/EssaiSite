# -*- coding: utf-8 -*-


def traduction(loc, k):
    trads = {
        'Présentation': {
            'en': 'Presentation',
        },
        'Plaquette recherche': {
            'en': 'Research brochure',
        },
        'Site internet': {
            'en': 'Website',
        },
        'Tutelles': {
            'en': 'Supervisory authorities',
        },
        'Directeur': {
            'en': 'Director',
        },
        'Directeur adjoint': {
            'en': 'Assistant director',
        },
        'Chercheurs médaillés': {
            'en':  'Awarded researchers',
        },
        'Implantation': {
            'en': 'Location',
        },
        'Voir le plan d\'accès': {
            'en': 'Access map',
        },
        'Carte': {
            'en': 'Map',
        },
        'Responsables': {
            'en': 'Head',
        },
        'Comité de pilotage': {
            'en': 'Steering committee',
        },
        'Résumé': {
            'en': 'Summary',
        },
        'Thèmes principaux': {
            'en': 'Main topics',
        },
        'Laboratoires impliqués': {
            'en': 'Laboratoires impliqués',
        },
    }

    if k in trads:
        if loc in trads[k]:
            return trads[k][loc]
    return k
