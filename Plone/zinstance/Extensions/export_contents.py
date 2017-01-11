# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName
import re


def export_contents(urls, context):
    portal_url = context.portal_url.getPortalObject().absolute_url()
    portal_path = getToolByName(context, 'portal_url').getPortalPath()
    contents = []
    for url in urls:
        if url.startswith(portal_url):
            url = url[len(portal_url):]
            item = context.restrictedTraverse(str(portal_path + url), None)
            if item:
                (default_page_url, default_page_path) = getDefaultPageUrl(item)
                if default_page_url:
                    default_page = context.getFolderContents({'path': default_page_path})
                    if len(default_page) > 0:
                        item = default_page[0].getObject()

                contents.append({
                    'title': item.Title(),
                    'description': item.Description(),
                    'text': striphtml(item.getText()).strip() if hasattr(item, 'getText') else ''
                })

    return contents


def getDefaultPageUrl(item):
    default_page_id = item.getProperty('default_page')
    if default_page_id:
        try:
            obj = item.getObject()
        except:
            obj = item
        return (obj.absolute_url() + '/' + default_page_id, '/'.join(obj.getPhysicalPath()) + '/' + default_page_id)
    return (None, None)


def striphtml(data):
    p = re.compile(r'<.*?>')
    return p.sub('', data)
