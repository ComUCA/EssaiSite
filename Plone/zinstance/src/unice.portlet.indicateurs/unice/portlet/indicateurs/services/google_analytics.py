# -*- coding: utf-8 -*-

import argparse
import httplib2
from time import sleep
import hashlib
import uuid
import unicodedata
import datetime

from apiclient.errors import HttpError
from apiclient import discovery
from oauth2client.client import AccessTokenRefreshError
from oauth2client import client
from oauth2client import file
from oauth2client import tools

from cache import Cache

import pprint
pp = pprint.PrettyPrinter(indent=4)


class GoogleAnalytics(object):

    def __init__(self, profile_id=None, dev=False):
        self.service_id = 'google_analytics'
        self.profile_id = profile_id
        self.cache = Cache(service=self.service_id, duration=(12*60 if not dev else 0), dev=dev)

        CLIENT_SECRETS = '%s/google_analytics.json' % self.cache.folder
        TOKEN_FILE_NAME = '%s/google_analytics.dat' % self.cache.folder
        SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
        parent_parsers = [tools.argparser]
        parent_parsers.extend([])
        parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter, parents=parent_parsers)
        self.flags = parser.parse_args([])
        flow = client.flow_from_clientsecrets(CLIENT_SECRETS, scope=SCOPE, message=tools.message_if_missing(CLIENT_SECRETS))
        storage = file.Storage(TOKEN_FILE_NAME)
        credentials = storage.get()
        if credentials is None or credentials.invalid:
            credentials = tools.run_flow(flow, storage, self.flags)
        http = credentials.authorize(http=httplib2.Http())
        self.service = discovery.build('analytics', 'v3', http=http)

    #####################################################################################################

    def getTopPagesViews(self, start='30daysAgo', end='today', filters=None):
        results = self.query({
            'start_date': start, 'end_date': end,
            'dimensions': 'ga:pageTitle,ga:pagePath', 'metrics': 'ga:pageviews',
            'filters': 'ga:pagePath=~.*%s.*' % filters if filters else None,
            'sort': '-ga:pageviews',
        }, group='ga:pageTitle')
        results['icon'] = 'fa-eye'
        return results

    def getTotalUsers(self, start='30daysAgo', end='today', filters=None):
        results = self.query({
            'start_date': start, 'end_date': end,
            'dimensions': 'ga:userType', 'metrics': 'ga:users',
            'filters': 'ga:pagePath=~.*%s.*' % filters if filters else None,
            'sort': '-ga:users',
        })
        results['icon'] = 'fa-users'
        return results

    def getSocialTraffic(self, start='30daysAgo', end='today', filters=None):
        results = self.query({
            'start_date': start, 'end_date': end,
            'dimensions': 'ga:socialNetwork', 'metrics': 'ga:pageviews,ga:users',
            'filters': 'ga:socialNetwork!=(not set)%s' % (';ga:pagePath=~.*%s.*' % filters if filters else ''),
            'sort': '-ga:pageviews',
        })
        results['icon'] = 'fa-share-alt'
        results['data']['metric_format'] = '%s <small>via les réseaux</small>'
        return results

    def getKeywords(self, start='30daysAgo', end='today', filters=None):
        results = self.query({
            'start_date': start, 'end_date': end,
            'dimensions': 'ga:keyword', 'metrics': 'ga:pageviews',
            'filters': 'ga:keyword!=(not set);ga:keyword!=(not provided)%s' % (';ga:pagePath=~.*%s.*' % filters if filters else ''),
            'sort': '-ga:pageviews',
        }, group='ga:keyword')
        results['icon'] = 'fa-search'
        results['data']['metric_format'] = '%s <small>via recherches</small>'
        return results

    def getDailyPagesViews(self, start='30daysAgo', end='today', filters=None):
        results = self.query({
            'start_date': start, 'end_date': end,
            'dimensions': 'ga:date', 'metrics': 'ga:pageviews',
            'filters': 'ga:pagePath=~.*%s.*' % filters if filters else None,
            'sort': 'ga:date',
        })
        results['icon'] = 'fa-eye'
        return results

    #####################################################################################################

    def query(self, params={}, group=None):
        cache_file = '%s_%s_%s' % (params.get('metrics', ''), params.get('dimensions', ''), params.get('filters', ''))
        cache_file = hashlib.sha224(cache_file).hexdigest()
        results = self.cache.getCache(cache_file)
        if results is None:
            results = {'data': None, 'error': None, 'uuid': str(uuid.uuid1())}
            if self.profile_id:
                try:
                    self.setParams(params, {
                        'ids': 'ga:' + self.profile_id,
                        'start_index': 1, 'max_results': 50,
                        'start_date': '30daysAgo', 'end_date': 'today'
                    })

                    count = params['max_results']
                    if group:
                        params['max_results'] *= 2

                    print 'RELOAD -> %s' % params
                    data = self.service.data().ga().get(**params).execute()
                    results['data'] = self.results(data, group, count)

                except TypeError, error:
                    results['error'] = 'There was an error in constructing your query : %s' % error
                except HttpError, error:
                    results['error'] = 'API error : %s : %s' % (error.resp.status, error._get_reason())
                except AccessTokenRefreshError:
                    results['error'] = 'The credentials have been revoked or expired, please re-run the application'
            else:
                results['error'] = 'Could not find a valid profile for this user'

            self.cache.setCache(results, cache_file)

        pp.pprint(results)
        return results

    def setParams(self, params, keys):
        for k, v in keys.items():
            if not k in params:
                params[k] = v

    def results(self, results, group=None, count=0):
        #pp.pprint(results)
        # Headers
        headers = [h['name'] for h in results.get('columnHeaders')]
        integers = [h['name'] for h in results.get('columnHeaders') if h['dataType'] == 'INTEGER']

        # Rows
        rows = results.get('rows', []) or []
        rowsDict = [dict(zip(headers, r)) for r in rows]
        rowsGrouped = []
        i = 0
        for row in rowsDict:
            for integer in integers:
                row[integer] = int(row[integer])
            if not group:
                rowsGrouped.append(row)
            else:
                if i == 0:
                    rowsGrouped.append(row)
                else:
                    prev = next((r for r in rowsDict[0:i] if self.accents(r[group]) == self.accents(row[group])), None)
                    if prev:
                        for integer in integers:
                            prev[integer] += row[integer]
                    else:
                        rowsGrouped.append(row)
            i += 1

        if group:
            rowsGrouped = sorted(rowsGrouped, key=lambda k: k[integers[0]], reverse=True)
            rowsGrouped = rowsGrouped[0:count]

        # Totals
        totals = {'count': results['totalResults'], 'metrics': results['totalsForAllResults']}
        for integer in integers:
            totals['metrics'][integer] = int(totals['metrics'][integer])
        totals['total'] = totals['metrics'][results['query']['metrics'][0]]

        dimensions = results['query']['dimensions'].split(',') if 'dimensions' in results['query'] else []
        return {
            'metrics': results['query']['metrics'], 'dimensions': dimensions,
            'rows': rowsGrouped, 'totals': totals,
            'metric_format': None
        }

    def accents(self, s):
        return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

    #####################################################################################################

    def getProfiles(self):
        cache_file = 'profiles'
        data = self.cache.getCache(cache_file)
        if data is None:
            data = []
            accounts = self.service.management().accounts().list().execute()
            if accounts.get('items'):
                for account in accounts.get('items'):
                    sleep(0.5)
                    accountId = account.get('id').encode('utf-8')

                    properties = self.service.management().webproperties().list(accountId=accountId).execute()
                    if properties.get('items'):
                        for propertie in properties.get('items'):
                            propertieId = propertie.get('id').encode('utf-8')
                            propertieName = propertie.get('name').encode('utf-8')

                            profiles = self.service.management().profiles().list(accountId=accountId, webPropertyId=propertieId).execute()
                            if profiles.get('items'):
                                for profile in profiles.get('items'):
                                    profileId = profile.get('id').encode('utf-8')
                                    profileName = profile.get('name').encode('utf-8')
                                    data.append({
                                        'accountId': accountId,
                                        'accountName': account.get('name').encode('utf-8'),
                                        'propertieId': propertieId,
                                        'propertieName': propertieName,
                                        'profileId': profileId,
                                        'profileName': profileName,
                                    })
            data.sort(key=lambda k: k['profileName'])
            self.cache.setCache(data, cache_file)

        return data

if __name__ == '__main__':
    analytics = GoogleAnalytics('79564042', dev=True)

    #results = analytics.getKeywords(filters='formation-initiale')
    #pp.pprint(results)

    results = analytics.getDailyPagesViews(filters='formation-initiale')
    for row in results['data']['rows']:
        print row['ga:date']
        print datetime.datetime.strptime(row['ga:date'], '%Y%m%d').strftime('%d/%m/%y')
