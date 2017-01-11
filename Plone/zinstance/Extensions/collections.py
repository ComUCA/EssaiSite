# -*- coding: utf-8 -*-

from Products.CMFPlone.PloneBatch import Batch
from sets import Set


def filter_collection_results(context):
    results = context.results()

    if '#CollectionAndOperator' in context.Subject():
        subjects = [q['v'] for q in context.query if 'v' in q and q['i'] == 'Subject']
        subjects = [item for sublist in subjects for item in sublist]

        filtered = []
        for result in results:
            if len(list(Set(subjects) & Set(result.Subject()))) == len(subjects):
                filtered.append(result)

        return Batch(filtered, len(filtered))
    else:
        return results
