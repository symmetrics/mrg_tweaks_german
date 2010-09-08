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

if (!window.Symmetrics) {
    window.Symmetrics = {};
}

/**
 * Symmetrics.Province
 * Generate lorem ipsum text
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Benjamin Klein <bk@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
Symmetrics.Province = Class.create();
Object.extend(Object.extend(Symmetrics.Province.prototype, Abstract.prototype),
{
    /**
     * Constructor initialize observer for dom loaded.
     */
    initialize: function()
    {
        this.createObserverDomLoaded();
    },

    /**
     * createObserverDomLoaded:waiting for observer dom loaded and create observers and start the change first time.
     *
     * @return void
     */
    createObserverDomLoaded: function()
    {
        document.observe('dom:loaded', (function()
        {
            var country = $('billing:country_id');
            if (!country) {
                console.log("choose address");
                this.createObserverProvinceAddress();
                this.startProvinceAdressChanging();
            } else {
                this.createObserverProvinceBilling();
                this.createObserverProvinceShipping();
                this.startProvinceBillingChanging();
                this.startProvinceShippingChanging();
            }
        }).bind(this));
    },

    /**
     * createObserverProvinceBilling: create observer for billing process.
     *
     * @return void
     */
    createObserverProvinceBilling: function()
    {
        Event.observe($('billing:country_id'),'change', (function(){
            this.startProvinceBillingChanging();
        }).bind(this));
    },

    /**
     * startProvinceBillingChanging: start changing region_id in billing process.
     *
     * @return void
     */
    startProvinceBillingChanging: function()
    {
        var countryFieldName = "billing:country_id";
        var regionInputFieldName = "billing[region_id]";
        var regionFieldName= 'billing:region_id';
        this.setRegionId(countryFieldName, regionInputFieldName, regionFieldName);
    },

    /**
     * createObserverProvinceShipping: create observer for shipping process.
     *
     * @return void
     */
    createObserverProvinceShipping: function ()
    {
        Event.observe($('shipping:country_id'),'change', (function(){
            this.startProvinceShippingChanging();
        }).bind(this));
    },

    /**
     * startProvinceShippingChanging: start changing region_id in shipping process.
     *
     * @return void
     */
    startProvinceShippingChanging: function()
    {
        var countryFieldName = "shipping:country_id";
        var regionInputFieldName = "shipping[region]";
        var regionFieldName = 'shipping:region_id';
        var regionFieldNameLabel = 'shipping:region';
        this.setRegionId(countryFieldName, regionInputFieldName, regionFieldName, regionFieldNameLabel);
    },

    /**
     * createObserverProvinceAddress: create observer for address editing process.
     *
     * @return void
     */
    createObserverProvinceAddress: function()
    {
        Event.observe($('country'), 'change', (function(){
            this.startProvinceAdressChanging();
        }).bind(this));
    },

    /**
     * startProvinceAdressChanging: start changing region_id in address editing process.
     *
     * @return void
     */
    startProvinceAdressChanging: function()
    {
        var countryFieldName = "country";
        var regionInputFieldName = "region_id";
        var regionFieldName= 'region_id';
        this.setRegionId(countryFieldName, regionInputFieldName, regionFieldName);
    },

    /**
     * setRegionId: check if country is german, hide "state/province" label and update region_id.
     * If country is not german show "state/province" label.
     *
     * @param String countryFieldName     Name of Country field.
     * @param String regionInputFieldName Name of region input field.
     * @param String regionFieldName      Name of region field.
     * @param String regionFieldNameLabel Name of region label field optional couse only one observer needs this.
     *
     * @return void
     */
    setRegionId: function(countryFieldName, regionInputFieldName, regionFieldName, regionFieldNameLabel)
    {
        try {
            console.log(this.checkCountryCode(countryFieldName));
            if (this.checkCountryCode(countryFieldName)) {
                if (regionFieldNameLabel === undefined) {
                    this.hideTextElement(regionFieldName);
                } else {
                    this.hideTextElement(regionFieldNameLabel);
                }
                this.updateRegionIdField(regionFieldName, regionInputFieldName, this.getLastRegionId(regionFieldName));
            } else {
                this.showTextElement(regionFieldName);
            }
        } catch (exception) {
            console.log(exception);
        }
    },

    /**
     * hideTextElement: hide the first label by name filter.
     *
     * @param String textFieldName The name of the "State/Province" field name.
     *
     * @return void
     */
    hideTextElement: function(textFieldName)
    {
        console.log(textFieldName);
        $$('label[for="' + textFieldName + '"]').first().hide();
    },

    /**
     * showTextElement: show the first label by name filter.
     *
     * @param String textFieldName The name of the "State/Province" field name.
     *
     * @return void
     */
    showTextElement: function(textFieldName)
    {
        $$('label[for="' + textFieldName + '"]').first().show();
    },

    /**
     * updateRegionIdField: Hide the region field and add hidden input field with given id
     *
     * @param String fieldName       The Name of the RegionId field.
     * @param String regionFieldName Name of the new input field.
     * @param Int    regionId        Id of new RegionId.
     *
     * @return void
     */
    updateRegionIdField: function(fieldName, regionFieldName, regionId)
    {
        var inputString = '<input type="hidden" name="' + regionFieldName +'" value="' + regionId + '">';
        //To hide this element is recomment couse Magento work with it on change Country
        $(fieldName).hide();
        $(fieldName).update(inputString);
    },

    /**
     * getLastRegionId: Get the last id of region in options
     *
     * @param String fieldName The Name of the RegionId field.
     *
     * @return int
     */
    getLastRegionId: function(fieldName)
    {
        var region = $A($(fieldName).options).last();
        
        return region.getAttribute('value');
    },

    /**
     * checkCountryCode check if the country is germany
     *
     * @param String countryFieldName The Name of country field.
     *
     * @return boolean
     */
    checkCountryCode: function(countryFieldName)
    {
        if ($F(countryFieldName) == 'DE') {
            return true
        } else {
            return false;
        }
    }
});
new Symmetrics.Province();
