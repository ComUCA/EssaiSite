# -*- coding: utf-8 -*-

import urllib
import urllib2
import base64
import json
import uuid

from cache import Cache

import pprint
pp = pprint.PrettyPrinter(indent=4)


class AddThis(object):

    def __init__(self, pubid, username, password, dev=False):
        self.pubid = pubid
        self.username = username
        self.password = password
        self.api = 'https://api.addthis.com/analytics/1.0/pub/%s/%s.json?%s'
        self.cache = Cache(service='addthis', duration=12*60, dev=dev)

    #####################################################################################################

    def getUrls(self, sort='shares'):
        return self.getDimension('url', ['shares', 'clicks', 'subscriptions'], sort)

    def getInterests(self, sort='clicks'):
        return self.getDimension('interest', ['clicks', 'sharers', 'shares', 'influencers', 'subscriptions'], sort)

    def getServices(self, sort='shares'):
        #return self.getDimension('service', ['shares', 'clicks', 'subscriptions'], sort)
        return self.getDimension('service', ['shares', 'clicks'], sort)

    #####################################################################################################

    def getDimension(self, dimension, metrics, sort):
        data = self.merge([self.getMetric(metric, dimension) for metric in metrics], dimension, metrics)
        pp.pprint(data)
        data_sorted = sorted(data.iteritems(), key=lambda (k, v): v[sort], reverse=True)
        rows = [{'dimension': d[0], 'metrics': d[1]} for d in data_sorted]
        return {
            'data': {
                'dimensions': [dimension],
                'metrics': metrics,
                'metric_format': None,
                'rows': rows,
            },
            'uuid': str(uuid.uuid1()),
            'error': None,
        }

    def getMetric(self, metric, dimension, params={'period': 'month'}):
        params['pubid'] = self.pubid
        url = self.api % (metric, dimension, urllib.urlencode(params))

        cache_file = '%s_%s' % (metric, dimension)
        data = self.cache.getCache(cache_file)
        if data is None:
            print 'RELOAD -> %s' % url
            request = urllib2.Request(url)
            base64string = base64.encodestring('%s:%s' % (self.username, self.password)).replace('\n', '')
            request.add_header('Authorization', 'Basic %s' % base64string)
            result = urllib2.urlopen(request)
            data = json.loads(result.read())
            self.cache.setCache(data, cache_file)
        return data

    #####################################################################################################

    def merge(self, ds, dimension, metrics):
        print dimension
        pp.pprint(metrics)
        pp.pprint(ds)
        dicts = [{v.pop(dimension, None): v for v in d} for d in ds]
        keys = [set(d.keys()) for d in dicts]
        keys = set().union(*keys)
        result = {}
        print '---------------------------------------------------'
        pp.pprint(dicts)
        for k in keys:
            merge = {}
            for d in dicts:
                merge.update(d.get(k, {}))
            for f in metrics:
                if not f in merge:
                    merge[f] = 0
            result[k] = merge
        return result


if __name__ == '__main__':
    addthis = AddThis('ra-52fc9bec296ec444', 'jeromenavarro@gmail.com', 'U4s-a4d-SNv-yXs', dev=True)

    # data = addthis.getUrls()
    # pp.pprint(data)

    #data = addthis.getDimension('interest', ['sharers', 'shares', 'clicks', 'influencers', 'subscriptions'], 'clicks')
    #urldata = addthis.getInterests()
    #pp.pprint(data)

    # data = addthis.getDimension('service', ['shares', 'clicks', 'subscriptions'], 'clicks')
    data = addthis.getServices()
    #pp.pprint(data)

    # data = addthis.getDimension('domain', ['referers'], 'referers')
    # pp.pprint(data)

    # url = 'http://filuns.unice.fr/fil/service-communication/evenements-1/visites-guidees-du-site-historique-de-l2019observatoire-de-nice'
    # url = '%s?ajax_load=1' % url
    # html = urllib2.urlopen(url).read()
    # matches = re.findall(r'<\s*h1[^>]*>([^<]*)<\s*\/\s*h1\s*>', html)
    # if len(matches) > 0:
    #     print matches[0].strip()

    # 'day': shares', 'clicks', 'subscriptions', 'sharers', 'influencers', 'clickers', 'users'
    # 'url': 'shares', clicks, 'subscriptions'
    # 'domain': 'shares', clicks, 'subscriptions', 'referers'
    # 'continent': 'shares', clicks, 'subscriptions'
    # 'country': 'clicks', 'subscriptions'
    # 'service': 'shares', 'clicks', 'subscriptions'
    # 'interest': 'shares', 'clicks', 'subscriptions', 'sharers', 'influencers', 'clickers', 'users'
    # 'term': 'searches'
