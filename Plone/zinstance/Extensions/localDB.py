# -*- coding: utf-8 -*-

import json
from objectpath import *


def json_xpath(query, dumps=False):
    output = None
    try:
        folder = '/Applications/Plone/zinstance/Extensions/db'
        # folder = '/home/zope/sites/exportBD/db'
        query = query.split('/')
        path = '%s/%s/%s.json' % (folder, query[0], query[1])
        xpath = '/'.join(query[2:])

        with open(path) as data_file:
            data = json.load(data_file)
            if not xpath:
                return json.dumps(data, sort_keys=True)

            tree = Tree(data)
            output = tree.execute(xpath)

            if type(output) == generator:
                output = tree.execute('array('+xpath+')')
    except:
        pass

    if dumps:
        return json.dumps(output if output else False)
    else:
        return output
