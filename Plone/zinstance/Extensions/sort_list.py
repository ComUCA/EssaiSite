# -*- coding: utf-8 -*-
from random import random


def sort_list(iterable, cmp=None, key=None, reverse=False):
    if iterable:
        return sorted(iterable, cmp=cmp, key=key, reverse=reverse)
    return []


def uniqify(iterable):
    return list(set(iterable))


def remove_from_list(iterable, element):
    iterable.remove(element)
    return iterable


def add_to_list(iterable, element, pos):
    iterable.insert(pos, element)
    return iterable


def shuffle(iterable):
    return [t[1] for t in sorted((random(), i) for i in iterable)]
