# -*- coding: utf-8 -*-

import csv
import codecs
import StringIO

import pprint
pp = pprint.PrettyPrinter(indent=4)


def parse(data, headers):

    filepath = 'GREDEG015.csv'
    f = codecs.open(filepath, 'r', 'latin-1')
    data = f.read().encode('utf-8')
    f.close()

    reader = csv.DictReader(StringIO.StringIO(data), delimiter=';', quoting=csv.QUOTE_NONE)
    lines = []
    for row in reader:
        line = {}
        for k, v in headers.iteritems():
            if v[0] in row:
                key = k
                value = None
                if len(v) > 1:
                    for i, j in v[1].iteritems():
                        if row[v[0]].lower().strip(' \t\n\r') == j.lower().strip(' \t\n\r'):
                            value = i
                else:
                    value = row[v[0]]

                line[key] = value
        lines.append(line)
    return sorted(lines, key=lambda k: k['nom'])

if __name__ == "__main__":
    headers = {
        'civilite': ['COD_QAL', {
            'M': 'M.',
            'Mme': 'Mme',
            'Mlle': 'Mlle',
        }],
        'nom': ['NOM_PER'],
        'prenom': ['PRN_PER'],
        'status': ['LIB_TYP_PER', {
            'Chercheur': 'chercheur',
            'Enseignant-Chercheur': 'enseignant-chercheur',
            'Technicien/Administratif': 'technicien/administratif',
            'Ingénieur': 'ingénieur',
            'Ingénieur de Recherche': 'ingénieur de recherche',
            'CDD': 'temporaire sur CDD',
        }],
        'service': ['COD_SCN1'],
        'institution': ['COD_ORG'],
        'tel': ['TEL_PER'],
        'mail': ['MEL_PER'],
        'adresse': ['BAT_IMP_PER'],
    }

    filepath = 'GREDEG015.csv'
    f = codecs.open(filepath, 'r', 'latin-1')
    data = f.read().encode('utf-8')
    f.close()

    lines = parse(data, headers)
    for line in lines:
        print line['prenom']
