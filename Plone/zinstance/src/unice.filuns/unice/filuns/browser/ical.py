# -*- coding: utf-8 -*-

# from geopy.geocoders import Nominatim
# import string
import re


class iCal():

    def __init__(self, uid, title, timezone):
        self.cal_uid = self.clean(uid)
        self.cal_title = self.clean(title)
        self.cal_timezone = self.clean(timezone)
        self.events = []

        self.geolocs = {}

    def addEvent(self, uid, title, desc, url, loc, start, end, creation, modification):
        day_only = not start.Date() == end.Date()
        if day_only:
            end = end + 1

        self.events.append('BEGIN:VEVENT')
        self.events.append('UID:%s' % self.clean(uid))
        self.events.append('SUMMARY:%s' % self.clean(title))
        self.events.append('DESCRIPTION:%s' % self.clean(desc.replace('\n', ' ')))
        self.events.append('URL:%s' % url)
        self.events.append('CREATED;VALUE=DATE-TIME:%s' % self.date(creation))
        self.events.append('LAST-MODIFIED;VALUE=DATE-TIME:%s' % self.date(modification))
        self.events.append('DTSTART;TZID=%s;VALUE=DATE-TIME:%s' % (self.cal_timezone, self.date(start, day_only)))
        self.events.append('DTEND;TZID=%s;VALUE=DATE-TIME:%s' % (self.cal_timezone, self.date(end, day_only)))

        if loc:
            loc = loc.strip()
            loc = re.sub(r'\s+', ' ', loc)
            self.events.append('LOCATION:%s' % self.clean(loc))

            # print '-------------------------------------'
            # print loc
            # if not loc in self.geolocs:
            #     print 'NEW'
            #     geoloc = Nominatim().geocode(loc, timeout=20)
            #     self.geolocs[loc] = geoloc
            # else:
            #     print 'OLD'
            #     geoloc = self.geolocs[loc]

            # if geoloc:
            #     print geoloc.latitude
            #     print geoloc.longitude
            # loc = loc.replace(',', ' ')
            # loc = loc.replace(';', ' ')
            # print loc.strip()
            # geoloc = Nominatim().geocode(loc, timeout=20)
            # if geoloc:
            #     print geoloc.latitude
            #     print geoloc.longitude
            #     self.events.append('X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="%s";X-APPLE-RADIUS=72;X-TITLE="%s":geo:%s,%s' % (loc, loc, geoloc.latitude, geoloc.longitude))

        self.events.append('END:VEVENT')

    def to_ical(self):
        cal = []
        cal.append('BEGIN:VCALENDAR')
        cal.append('X-WR-RELCALID:%s' % self.cal_uid)
        cal.append('VERSION:2.0')
        cal.append('PRODID:-//unice.fr//NONSGML iCamUNSCreator//FR')
        cal.append('CALSCALE:GREGORIAN')
        cal.append('METHOD:PUBLISH')
        cal.append('NAME:%s' % self.cal_title)
        cal.append('X-WR-CALNAME:%s' % self.cal_title)
        cal.append('DESCRIPTION:%s' % self.cal_title)
        cal.append('X-WR-CALDESC:%s' % self.cal_title)
        cal.append('TIMEZONE-ID:%s' % self.cal_timezone)
        cal.append('X-WR-TIMEZONE:%s' % self.cal_timezone)
        cal.append('REFRESH-INTERVAL;VALUE=DURATION:PT15M')
        cal.append('X-PUBLISHED-TTL:PT15M')

        cal = cal + self.events

        cal.append('END:VCALENDAR')

        # print '========================================='
        # print '\n'.join(cal)
        # print '========================================='

        return '\n'.join(cal)

    def date(self, d, day_only=False):
        date = d.HTML4()
        date = date.replace('-', '')
        date = date.replace(':', '')
        if day_only:
            date = date.split('T')[0]
        return date

    def clean(self, txt):
        txt = txt.strip()
        txt = txt.replace('\\', '\\\\').replace(',', '\,').replace(';', '\;')
        return txt
