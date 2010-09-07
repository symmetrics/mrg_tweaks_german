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
 * @author    Benjamin Klein <bk@symmetrics.de>
 * @copyright 2009-2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

/**
 * Change the position from zip and city - fields
 */
document.observe('dom:loaded', function() {
    if ($('city') && $('zip')) {
        var cityField = $('city').up().up();
        var zipField = $('zip').up().up().innerHTML;

        $('zip').up().up().update(cityField.innerHTML);
        $('city').up().up().update(zipField);
    }
    /**
     * Start setRegion.
     * Musst be run here to hide "State/Province" when Germany is standart
     */
    setRegion();

    /**
     *Get country element from Dom
     */
    country = document.getElementById("country");
    /**
     * Build observer for changes in country
     */
    Event.observe(country,'change',function(){
        setRegion();
    });
});
// setRegion returns nothing.
// We do not need any arguments.
// This function is looking for country "DE".
// If country is Germany, hide "State/Province" text.
// To equal Form settings we set region_id to the last in regions.
// The last element was created by us in a update file.
function setRegion() {
    if ($('region_id')) {
        /**
         * Check if country ist Germany.
         */
        if ($F('country') == "DE") {
            /**
             * Hide Redion select Box.
             */
            $('region_id').hide();
            /**
             * Hide text "State/Province".
             */
            $$('#form-validate .required')[5].hide();
            /**
             * Get last region from select box.
             */
            var region = $A($('region_id').options).last();
            /**
             * Set RegionId from latest element.
             */
            $('region_id').setValue(region.getAttribute('value'));
        } else {
            /**
             * Show the "State/Province" text.
             */
            $$('#form-validate .required')[5].show();
        }
    }
}