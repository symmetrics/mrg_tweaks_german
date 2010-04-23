<?php
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
 * @author    Eric Reiche <er@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

/**
 * Block class for weight.phtml template
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Eric Reiche <er@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
class Symmetrics_TweaksGerman_Block_Weight extends Mage_Core_Block_Template
{
    /**
     * @const DELIVERY_URL_CONFIG_PATH system config path delivery cms page
     */
    const DELIVERY_URL_CONFIG_PATH = 'checkout/cart/deliveryurl';
    
    /**
     * Get translation for attribute
     *
     * @param string $code Attribute code
     *
     * @return string
     */
    public function getAttributeLabel($code)
    {
        $attribute = Mage::getModel('eav/entity_attribute')->loadByCode('catalog_product', $code);
        $weightLabels = $attribute->getStoreLabels();
        if (array_key_exists($this->getStoreId(), $weightLabels)) {
            $weightLabel = $weightLabels[$this->getStoreId()];
        } else {
            $weightLabel = $attribute->getFrontendLabel();
        }
        
        return $weightLabel;
    }
    
    /**
     * Get link for weight attribute from system configuration
     *
     * @return string
     */
    public function getWeightLink()
    {
        $pageIdentifier = Mage::getStoreConfig(self::DELIVERY_URL_CONFIG_PATH, $this->getStore());
        
        return Mage::getUrl($pageIdentifier);
    }
    
    /**
     * Get current store
     * 
     * @return Mage_Core_Model_Store
     */
    public function getStore()
    {
        return Mage::app()->getStore();
    }
    
    /**
     * Get id of current store
     * 
     * @return int
     */
    public function getStoreId()
    {
        return $this->getStore()->getId();
    }
}