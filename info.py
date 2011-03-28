# encoding: utf-8


# =============================================================================
# package info
# =============================================================================
NAME = 'symmetrics_module_tweaks_german'

TAGS = ('magento', 'module', 'symmetrics', 'mrg', 'trusted',
        'shops', 'tax')

LICENSE = 'AFL 3.0'

HOMEPAGE = 'http://www.symmetrics.de'

INSTALL_PATH = ''


# =============================================================================
# responsibilities
# =============================================================================
TEAM_LEADER = {
    'Torsten Walluhn': 'tw@symmetrics.de',
}

MAINTAINER = {
    'Siegfried Schmitz': 'ss@symmetrics.de',
}

AUTHORS = {
    'Siegfried Schmitz': 'ss@symmetrics.de',
    'Benjamin Klein': 'bk@symmetrics.de',
}

# =============================================================================
# additional infos
# =============================================================================
INFO = '''
    Fügt zusätzliche rechtliche Infos in den Warenkorb und in die Bestellung
    ein, z.B. MwSt-Infos hinter dem Preis.
'''

SUMMARY = '''
    Das Modul Symmetrics_TweaksGerman verändert das System so, dass es
    deutschen rechtlichen Ansprüchen an einen Online-Shop genügt. Das Modul
    ist ein Teil der Vorzertifizierung für das Trusted Shop Siegel.

    Das Wort "Gewicht" in Attributen wird mit der Versandkosten-Seite verlinkt.

    Das Modul ersetzt die Versandkostenschätzung im Warenkorb und fügt
    zusätzliche Links zu Bestellinformationen sowie Widerrufinformationen
    hinzu.

    Im Checkout ist die "An andere Adresse verschicken"-Option aktiviert.

    Zeigt die MwSt-Infos inkl. Versandlink hinter jedem Preis an.
'''

NOTES = ''''''

# =============================================================================
# relations
# =============================================================================
REQUIRES = [
    {'magento': '*', 'magento_enterprise': '*'},
]

EXCLUDES = {}

VIRTUAL = {}

DEPENDS_ON_FILES = (
    'app/code/core/Mage/Catalog/Block/Product/Abstract.php',
)

PEAR_KEY = ''

COMPATIBLE_WITH = {
    'magento': ['1.5.0.1-p1'],
    'magento_enterprise': ['1.10.0.0', '1.10.0.2', '1.10.0.2-p4'],
}
