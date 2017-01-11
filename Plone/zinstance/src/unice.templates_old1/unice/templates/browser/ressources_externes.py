#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re

import pprint
pp = pprint.PrettyPrinter(indent=4)


def detectUrlOrIframe(txt):
    txt = txt.replace('\n', '').replace('\r', '').strip()
    print txt

    if re.match(r'(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))', txt, re.I | re.M):
        return txt

    if re.match(r'(<iframe\b[^>]*>(.*?)</iframe>)', txt, re.I | re.M):
        m = re.search(r'src=[\'"]?([^\'" >]+)', txt, re.I | re.M)
        if m:
            return m.group(1)

    return None


# def sanitize_html(html):
#     for tag in ['style', 'link', 'script']:
#         html = re.sub(r'<%s(.|\s)*?\s\/>' % tag, '', html, re.I | re.M).strip()
#     return html


if __name__ == '__main__':
    uris = [
        ' http://unssante.unice.fr/\n360  ',
        'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida http://unssante.unice.fr/360 at eget metus. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.',
        '   <iframe width="560" height="315" src="http://www.youtube.com/embed/2Eex1-DTbgc?rel=0"\n\r frameborder="0" allowfullscreen></iframe>',
        '<iframe width="560" height="315" src="http://www.youtube.com/embed/2Eex1-DTbgc?rel=0" frameborder="0" allowfullscreen></iframe> \
        \
        <style type="text/css"> .enews .screenread {\
        height: 1px;\
        left: -1000em;\
        overflow: hidden;\
        position: absolute;\
        top: -1000em;\
        width: 1px; }\
        </style>\
        \
        <link rel=\'stylesheet\' id=\'sharedaddy-css\'  href=\'http://pythontesting.net/wp-content/plugins/jetpack/modules/sharedaddy/sharing.css?ver=3.0.2\' type=\'text/css\' media=\'all\' />',
        'http://unssante.unice.fr/360/#.U9jyql4e7HU',
    ]

    for uri in uris:
        if uri:
            pp.pprint(detectUrlOrIframe(uri))
