# -*- coding: utf-8 -*-

import pickle
import os
import time

import pprint
pp = pprint.PrettyPrinter(indent=4)


class Cache(object):

    def __init__(self, service, duration, dev=False):
        self.service = service
        self.duration = duration
        self.folder = 'caches' if dev else 'src/unice.portlet.indicateurs/unice/portlet/indicateurs/services/caches'
        #self.folder = './caches'

    def getCache(self, cache):
        cache = self.getCacheFile(cache)
        if os.path.isfile(cache):
            if (time.time() - os.stat(cache).st_mtime) < self.duration*60:
                f = open(cache, 'rb')
                data = pickle.load(f)
                f.close()
                return data
        return None

    def setCache(self, data, cache):
        cache = self.getCacheFile(cache)
        f = open(cache, 'wb')
        pickle.dump(data, f)
        f.close()

    def getCacheFile(self, cache):
        return '%s/cache_%s_%s.pkl' % (self.folder, self.service, cache)
