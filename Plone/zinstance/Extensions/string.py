# -*- coding: utf-8 -*-

import string
import random
import re

# from zope.component import getUtility
# from plone.i18n.normalizer.interfaces import IIDNormalizer
from plone.i18n.normalizer import idnormalizer
from plone.app.textfield.value import RichTextValue


def randomstring(n):
    return ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(n))


def regex_replace(p, r, s):
    return re.sub(p, r, s)


def normalize(s):
    return idnormalizer.normalize(s)
    # return getUtility(IIDNormalizer).normalize(s)


def password(length):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    mypw = ""

    for i in range(length):
        next_index = random.randrange(len(alphabet))
        mypw = mypw + alphabet[next_index]

    for i in range(random.randrange(1, 3)):
        replace_index = random.randrange(len(mypw)//2)
        mypw = mypw[0:replace_index] + str(random.randrange(10)) + mypw[replace_index+1:]

    for i in range(random.randrange(1, 3)):
        replace_index = random.randrange(len(mypw)//2, len(mypw))
        mypw = mypw[0:replace_index] + mypw[replace_index].upper() + mypw[replace_index+1:]

    return mypw


def richTextValue(s):
    return RichTextValue(s, 'text/plain', 'text/plain')
