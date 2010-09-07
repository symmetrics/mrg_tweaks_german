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
 * @author    Benjamin Klein <bk@symmetrics.de>
 * @copyright 2009-2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
document.observe('dom:loaded', function() {
    /**
     * Get country element from Dom.
     */
    country = $('billing:country_id');
    /**
     * Setup billingFlag to register later if we are in billing.
     */
    var billingFlag = true;
    /**
     * Check if we have a object or not.
     */
    if (!country) {
        /**
         * Set billingFlag to False.
         */
        var billingFlag = false;
        /**
         * Set new object.
         */
        country = $('country');
    }
    /**
     * Build observer for changes in country.
     */
    Event.observe(country,'change',function(){
        setRegion(billingFlag);
    });
    /**
     * Start setRegion.
     * Musst be run here to hide "State/Province" when Germany is standart.
     */
    setRegion(billingFlag);
});

// setRegion returns nothing.
// We do not an Boolean parameter to figure out if we need
// a prefix
// This function is looking for country "DE".
// If country is Germany, hide "State/Province" text.
// To equal Form settings we set region_id to the last in regions.
// The last element was created by us in a update file.
function setRegion(billingFlag) {
    /**
     * Checking for billingFlag.
     * Setup prefix for billing or not.
     * Setup country_prefix.
     * Setup region_prefix.
     * Setup form.
     */
    if (billingFlag) {
        prefix = 'billing:';
        country_prefix = '_id';
        region_prefix = '_id';
        form = 'co-billing-form';
    } else {
        prefix = '';
        country_prefix = '';
        region_prefix = '_id';
        form = 'form-validate';
    }
    if ($(prefix + 'region' + region_prefix)) {
        /**
         * Check if country ist Germany.
         */
        if ($F(prefix + 'country' + country_prefix) == "DE") {
            /**
             * Hide Redion select Box.
             */
            $(prefix + 'region' + region_prefix).hide();
            /**
             * Hide text "State/Province".
             */
            $$('label[for="' + prefix + 'region' + region_prefix + '"]').first().hide();
            /**
             * Get last region from select box.
             */
            var region = $A($(prefix + 'region' + region_prefix).options).last();
            /**
             * Set RegionId from latest element.
             */
            $(prefix + 'region' + region_prefix).setValue(region.getAttribute('value'));
        } else {
            /**
             * Show the "State/Province" text.
             */
            $$('label[for="' + prefix + 'region' + region_prefix + '"]').first().show();
        }
    }
}
