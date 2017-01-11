from five import grok

from Products.TinyMCE.interfaces.shortcut import ITinyMCEShortcut


class ImageBankShortcut(grok.GlobalUtility):
    """Provides shortcut to the language neutral image bank below language folders """

    grok.name("imagebank")
    grok.provides(ITinyMCEShortcut)

    # This time we don't bother with i18n and assume
    # the whole world understands Finnish
    title = u'Kuvapankki'

    # Portal root relative path
    link = "/kuvapankki"

    def render(self, context):

        # http://collective-docs.readthedocs.org/en/latest/misc/context.html
        portal_state = context.restrictedTraverse('@@plone_portal_state')

        return ["""
        <img src="img/folder_current.png" />
        <a id="currentfolder" href="%s">%s</a>
        """ % (portal_state.portal_url() + self.link, self.title)]
