# -*- coding: utf-8 -*-

from lxml import html
import requests
import re
# import paramiko

import pprint
pp = pprint.PrettyPrinter(indent=4)


def activites_suaps(zoom=None):
    url = 'http://suapsweb.unice.fr/cgi-bin/WebObjects/SIUAPSWeb.woa/wa/activites'
    url = 'http://localhost/timeout.php'
    page = requests.get(url, timeout=5)
    tree = html.fromstring(page.content)
    tags = tree.xpath('//div[@class="libelleActivite"]/a')

    activites = []
    for tag in tags[0:5000]:
        href = 'http://suapsweb.unice.fr%s' % tag.get('href')
        id = re.findall(r'\?activite=([0-9\.]+)', href)
        id = id[0] if len(id) > 0 else ''

        activite = {
            'href': href,
            'title': tag.text_content(),
            'id': id
        }

        if (not zoom) or (zoom and id in zoom):
            print '---------------------------------------------'
            print id

            # Description
            page2 = requests.get(href)
            tree2 = html.fromstring(page2.content)
            tags2 = tree2.xpath('//div[@class="descriptionActivite"]/div[@class="description"]')
            desc = '\n'.join([html.tostring(t) for t in tags2])

            desc = re.sub(r'<(?!img|br).*?\>', ' ', desc)
            desc = re.sub(r'\s+', ' ', desc)
            desc = re.sub(r'\t', ' ', desc)
            desc = desc.strip()

            activite['description'] = desc
            activites.append(activite)

    return activites


if __name__ == "__main__":
    activites = activites_suaps(['213.0', '199.0', '1254.0', '277.0'])
    # pp.pprint(activites)
    pp.pprint([a['description'] for a in activites])
