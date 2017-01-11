# -*- coding: utf-8 -*-

# from Products.Five.browser import BrowserView
# from Products.CMFCore.utils import getToolByName
from zope.component import getUtility, getMultiAdapter, queryMultiAdapter
from zope.app.component.hooks import getSite
# from zope.app.component.hooks import setHooks, setSite, getSite
# from plone.portlets.interfaces import IPortletType
# from plone.portlets.interfaces import ILocalPortletAssignable
from plone.portlets.interfaces import IPortletRetriever, IPortletManager, IPortletRenderer
# from plone.portlets.interfaces import IPortletAssignment
# from plone.portlets.interfaces import IPortletDataProvider
# from plone.portlets.interfaces import IPortletRenderer
from plone.portlets.interfaces import IPortletAssignmentMapping
# from plone.portlets.interfaces import ILocalPortletAssignable
# from plone.portlets.interfaces import IPortletRetriever
# from Products.CMFCore.interfaces import IContentish


# def render_slope_info():
#     context = self.context.aq_inner
#     request = self.request
#     view = self
#     column = "isleofback.app.frontpageportlets"
#     from isleofback.app.portlets.slopeinfo import ISlopeInfo

#     manager = get_portlet_manager(column)
#     html = render_portlet(context, request, view, manager, ISlopeInfo)
#     return html


# def get_portlet_manager(column):
#     return getUtility(IPortletManager, name=column)


# def render_portlet(context, request, view, manager, interface):
def render_portlet(context, request, column):
    print '########################################################'
    print context
    try:
        out = []
        portal = getSite()
        view = portal.restrictedTraverse('@@plone')
        manager = getUtility(IPortletManager, name=column, context=context)
        mapping = getMultiAdapter((context, manager), IPortletAssignmentMapping)
        for id, assignment in mapping.items():
            renderer = getMultiAdapter((context, request, view, manager, assignment), IPortletRenderer)
            renderer = renderer.__of__(context)
            renderer.update()
            html = renderer.render()
            out.append(html)

        return ''.join(out)
    except:
        return []

    # manager = getUtility(IPortletManager, name=column)
    # view = context.unrestrictedTraverse('@@view')
    # retriever = getMultiAdapter((context, manager), IPortletRetriever)
    # portlets = retriever.getPortlets()
    # assignment = None

    # for portlet in portlets:
    #     if interface.providedBy(portlet["assignment"]):
    #         assignment = portlet["assignment"]
    #         break

    # if assignment is None:
    #     return ""

    # renderer = queryMultiAdapter((context, request, view, manager, assignment), IPortletRenderer)
    # renderer = renderer.__of__(context)

    # if renderer is None:
    #     raise RuntimeError("No portlet renderer found for portlet assignment:" + str(assignment))

    # renderer.update()
    # html = renderer.render()
    # return html


# def getView(context, name):
#     try:
#         view = context.unrestrictedTraverse("@@" + name)
#     except AttributeError:
#         raise RuntimeError("Instance %s did not have view %s" % (str(context), name))

#     # view = view.__of__(context)
#     return view


#################################################################################

# def portlets_list(context, request):
#     urltool = getToolByName(context, "portal_url")
#     site = urltool.getPortalObject()
#     catalog = getToolByName(site, 'portal_catalog')

#     context_path = '/'.join(context.getPhysicalPath())
#     # query = {'query': context_path}
#     # query = {}
#     all_brains = catalog(path={'query': context_path})
#     all_content = [brain.getObject() for brain in all_brains]
#     # all_content.append(site)

#     # print '********************************************************************'
#     # print context_path
#     # print '********************************************************************'

#     out = []
#     for content in all_content:
#         for manager_name in [
#             # 'plone.leftcolumn', 'plone.rightcolumn',
#             # 'ContentWellPortlets.InHeaderPortletManager1',
#             # 'ContentWellPortlets.InHeaderPortletManager2',
#             # 'ContentWellPortlets.InHeaderPortletManager3',
#             # 'ContentWellPortlets.InHeaderPortletManager4',
#             # 'ContentWellPortlets.InHeaderPortletManager5',
#             # 'ContentWellPortlets.InHeaderPortletManager6',
#             # 'ContentWellPortlets.AbovePortletManager1',
#             # 'ContentWellPortlets.AbovePortletManager2',
#             # 'ContentWellPortlets.AbovePortletManager3',
#             # 'ContentWellPortlets.AbovePortletManager4',
#             # 'ContentWellPortlets.AbovePortletManager5',
#             # 'ContentWellPortlets.AbovePortletManager6',
#             # 'ContentWellPortlets.BelowPortletManager1',
#             # 'ContentWellPortlets.BelowPortletManager2',
#             # 'ContentWellPortlets.BelowPortletManager3',
#             # 'ContentWellPortlets.BelowPortletManager4',
#             'ContentWellPortlets.BelowPortletManager5',
#             'ContentWellPortlets.BelowPortletManager6',
#             # 'ContentWellPortlets.FooterPortletManager1',
#             # 'ContentWellPortlets.FooterPortletManager2',
#             # 'ContentWellPortlets.FooterPortletManager3',
#             # 'ContentWellPortlets.FooterPortletManager4',
#             # 'ContentWellPortlets.FooterPortletManager5',
#             # 'ContentWellPortlets.FooterPortletManager6',
#             # 'ContentWellPortlets.BelowTitlePortletManager1',
#             # 'ContentWellPortlets.BelowTitlePortletManager2',
#             # 'ContentWellPortlets.BelowTitlePortletManager3',
#             # 'ContentWellPortlets.BelowTitlePortletManager4',
#             # 'ContentWellPortlets.BelowTitlePortletManager5',
#             # 'ContentWellPortlets.BelowTitlePortletManager6',
#         ]:
#             try:
#                 manager = getUtility(IPortletManager, name=manager_name, context=content)
#                 mapping = getMultiAdapter((content, manager), IPortletAssignmentMapping)
#                 if len(mapping.items()) > 0:
#                     out.append('%s => <a href="%s/@@manage-portletsbelowcontent">%s</a><br/>' % (manager_name, content.absolute_url(), content.absolute_url()))
#                 #     for id, assignment in mapping.items():
#                 #         for k, v in assignment.data.__dict__.iteritems():
#                 #             # if isinstance(v, basestring) and v.startswith('/'):
#                 #             #     print '=============================================================='
#                 #             #     print '/'.join(content.getPhysicalPath())
#                 #             #     print manager_name
#                 #             #     print k
#                 #             #     print v
#             except:
#                 continue
#     return out


# class FixPortlets(BrowserView):

#         def __call__(self):

#             request = self.request

#             portal = getSite()

#             # Not sure why this is needed...
#             view = portal.restrictedTraverse('@@plone')

#             # Query all content items on the site which can get portlets assigned
#             # Note that this should excule special, hidden, items like tools which otherwise
#             # might appearn in portal_catalog queries
#             all_content = portal.portal_catalog(show_inactive=True, language="ALL", object_provides=ILocalPortletAssignable.__identifier__)

#             # Load the real object instead of index stub
#             all_content = [content.getObject() for content in all_content]

#             # portal itself does not show up in the query above,
#             # though it might contain portlet assignments
#             all_content = list(all_content) + [portal]

#             for content in all_content:

#                     for manager_name in ["plone.leftcolumn", "plone.rightcolumn"]:

#                             manager = getUtility(IPortletManager, name=manager_name, context=content)

#                             mapping = getMultiAdapter((content, manager), IPortletAssignmentMapping)

#                             # id is portlet assignment id
#                             # and automatically generated
#                             for id, assignment in mapping.items():
#                                     print "Found portlet assignment:" + id + " " + str(assignment)

#                                     renderer = getMultiAdapter((content, request, view, manager, assignment), IPortletRenderer)

#                                     # Renderer acquisition chain must be set-up so that templates
#                                     # et. al. can resolve permission inheritance
#                                     renderer = renderer.__of__(content)

#                                     # Seee http://svn.zope.org/zope.contentprovider/trunk/src/zope/contentprovider/interfaces.py?rev=98212&view=auto
#                                     renderer.update()
#                                     html = renderer.render()
#                                     print "Got HTML output:" + html

#             return "OK"
