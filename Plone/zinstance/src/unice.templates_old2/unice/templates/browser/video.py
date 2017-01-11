# -*- coding: utf-8 -*-

import urlparse
import urllib2
import socket
import json

# import pprint
# pp = pprint.PrettyPrinter(indent=4)


class Video(object):
    def __init__(self, url):
        super(Video, self).__init__()
        self.url = url

    def informations(self):
        if self.url:
            if 'youtube' in self.url.lower():
                return self.youtube()
            if 'vimeo' in self.url.lower():
                return self.vimeo()
        return None

    def youtube(self):
        video_id = self.getQuery(self.url, 'v')
        if video_id and len(video_id) > 0:
            vid = video_id[0]
            data = self.getJSON('http://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=%s' % vid)
            if data and 'thumbnail_url' in data and 'width' in data and 'height' in data:
                src = 'http://www.youtube.com/embed/%s?rel=0&wmode=transparent&showinfo=0' % vid
                embed = self.getIframe(src, data['width'], data['height'])
                return {'embed': embed, 'picture': data['thumbnail_url'], 'width': data['width'], 'height': data['height']}

        return None

    def vimeo(self):
        path = urlparse.urlparse(self.url).path.split('/')
        if path and len(path) > 1:
            vid = path[1]
            data = self.getJSON('http://vimeo.com/api/v2/video/%s.json' % vid)
            if data and len(data) > 0 and 'thumbnail_large' in data[0] and 'width' in data[0] and 'height' in data[0]:
                src = 'http://player.vimeo.com/video/%s' % vid
                embed = self.getIframe(src, data[0]['width'], data[0]['height'])
                return {'embed': embed, 'picture': data[0]['thumbnail_large'], 'width': data[0]['width'], 'height': data[0]['height']}

        return None

    #####################################################

    def getQuery(self, url, query):
        if url:
            parsed = urlparse.urlparse(url).query
            querys = urlparse.parse_qs(parsed)
            if query in querys:
                return querys[query]

        return None

    def getIframe(self, src, w, h):
        return '<iframe src="%s" width="%s" height="%s" scrolling="no" allowtransparency="true" frameborder="0" allowfullscreen></iframe>' % (src, w, h)

    def getJSON(self, url):
        #print url
        try:
            response = urllib2.urlopen(url, timeout=5)
            data = json.load(response)
            return data
        except urllib2.URLError:
            return None
        except socket.timeout:
            return None


# url = 'http://www.youtube.com/watch?v=steaBwd1jHA'
# #url = 'http://www.youtube.com/watch?v=OJ-Mv1O_ffA'
# #url = 'http://vimeo.com/78512933'
# video = Video(url)
# pp.pprint(video.informations())
