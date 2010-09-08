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
     * Constructor initialize observer for dom loaded
     */
    initialize: function()
    {
        this.createObserverDomLoaded();
    },

    /**
     * createObserverDomLoaded
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
     * createObserverProvinceBilling
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
     * startProvinceBillingChanging
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
     * createObserverProvinceShipping
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
     * startProvinceShippingChanging
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
     * createObserverProvinceAddress
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
     * startProvinceAdressChanging
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
     * setRegionId
     *
     * @param String countryFieldName
     * @param String regionInputFieldName
     * @param String regionFieldName
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
     * hideTextElement
     *
     * @param String textFieldName The name of the "State/Province" field name
     *
     * @return void
     */
    hideTextElement: function(textFieldName)
    {
        console.log(textFieldName);
        $$('label[for="' + textFieldName + '"]').first().hide();
    },

    /**
     * showTextElement
     *
     * @param String textFieldName The name of the "State/Province" field name
     *
     * @return void
     */
    showTextElement: function(textFieldName)
    {
        $$('label[for="' + textFieldName + '"]').first().show();
    },

    /**
     * deleteRegionIdField
     *
     * @param String fieldName       The Name of the RegionId field
     * @param String regionFieldName Name of the new input field
     * @param Int    regionId        Id of new RegionId
     *
     * @return void
     */
    updateRegionIdField: function(fieldName, regionFieldName, regionId)
    {
        var inputString = '<input type="hidden" name="' + regionFieldName +'" value="' + regionId + '">';
        console.log($(fieldName));
        console.log(inputString);
        //To hide this element is recomment couse Magento work with it on change Country
        $(fieldName).hide();
        $(fieldName).update(inputString);
    },

    /**
     * getLastRegionId
     *
     * @param String fieldName The Name of the RegionId field
     *
     * @return int
     */
    getLastRegionId: function(fieldName)
    {
        var region = $A($(fieldName).options).last();
        
        return region.getAttribute('value');
    },

    /**
     * checkCountryCode
     *
     * @param String countryFieldName The Name of country field
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
