# -*- coding: utf-8 -*-
import json

import pprint
pp = pprint.PrettyPrinter(indent=4)

GROUPS_SPECS = """
[
    {"group_id": "personnels", "group_title": "Personnels", "affiliations": ["member", "employee"], "operator": "and"},
    {"group_id": "enseignants", "group_title": "Enseignants", "affiliations": ["teacher"]}
]
"""


def getMemberGroupsFromCAS(specs, affiliations):
    groups = []
    for spec in specs:
        op = spec['operator'] if 'operator' in spec else 'or'

        common = set(affiliations).intersection(spec['affiliations'])
        if (op == 'or' and len(common) > 0) or (op == 'and' and len(common) == len(spec['affiliations'])):
            groups.append(spec)

    pp.pprint(groups)
    return groups


if __name__ == '__main__':
    groups_specs = GROUPS_SPECS
    groups_specs = json.loads(groups_specs)

    getMemberGroupsFromCAS(groups_specs, ['member', 'staff', 'employee'])
    getMemberGroupsFromCAS(groups_specs, ['member', 'teacher'])
    getMemberGroupsFromCAS(groups_specs, ['member', 'student'])
