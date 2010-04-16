/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Siegfried Schmitz <ss@symmetrics.de>
 * @copyright 2009-2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
document.observe('dom:loaded', function() {
    var shopUrl = BLANK_IMG.substr (0, BLANK_IMG.length-13);
    var labels = $$('#product-attribute-specs-table .label');
    labels.each(function(label) {
        if (label.innerHTML.match('Weight') !== null) {
            label.update('<a href="' + shopUrl + 'lieferung/">' + label.innerHTML + '</a>');
            throw $break;
        } else if(label.innerHTML.match('Gewicht') !== null) {
            label.update('<a href="' + shopUrl + 'lieferung/">' + label.innerHTML + '</a>');
            throw $break;
        }
    });
});
