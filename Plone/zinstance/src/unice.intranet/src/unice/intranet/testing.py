# -*- coding: utf-8 -*-
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import unice.intranet


class UniceIntranetLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=unice.intranet)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'unice.intranet:default')


UNICE_INTRANET_FIXTURE = UniceIntranetLayer()


UNICE_INTRANET_INTEGRATION_TESTING = IntegrationTesting(
    bases=(UNICE_INTRANET_FIXTURE,),
    name='UniceIntranetLayer:IntegrationTesting'
)


UNICE_INTRANET_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(UNICE_INTRANET_FIXTURE,),
    name='UniceIntranetLayer:FunctionalTesting'
)


UNICE_INTRANET_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        UNICE_INTRANET_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='UniceIntranetLayer:AcceptanceTesting'
)
