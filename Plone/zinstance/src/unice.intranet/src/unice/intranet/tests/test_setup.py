# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from unice.intranet.testing import UNICE_INTRANET_INTEGRATION_TESTING  # noqa
from plone import api

import unittest


class TestSetup(unittest.TestCase):
    """Test that unice.intranet is properly installed."""

    layer = UNICE_INTRANET_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if unice.intranet is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'unice.intranet'))

    def test_browserlayer(self):
        """Test that IUniceIntranetLayer is registered."""
        from unice.intranet.interfaces import (
            IUniceIntranetLayer)
        from plone.browserlayer import utils
        self.assertIn(IUniceIntranetLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = UNICE_INTRANET_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['unice.intranet'])

    def test_product_uninstalled(self):
        """Test if unice.intranet is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'unice.intranet'))

    def test_browserlayer_removed(self):
        """Test that IUniceIntranetLayer is removed."""
        from unice.intranet.interfaces import IUniceIntranetLayer
        from plone.browserlayer import utils
        self.assertNotIn(IUniceIntranetLayer, utils.registered_layers())
