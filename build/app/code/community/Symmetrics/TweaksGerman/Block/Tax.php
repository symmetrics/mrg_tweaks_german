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
 * @author    Siegfried Schmitz <ss@symmetrics.de>
 * @copyright 2009-2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

/**
 * Symmetrics_TweaksGerman_Block_Tax
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Siegfried Schmitz <ss@symmetrics.de>
 * @copyright 2009-2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
class Symmetrics_TweaksGerman_Block_Tax extends Mage_Core_Block_Abstract
{
    /**
     * Get tax info
     *
     * @param Mage_Catalog_Model_Product $product product object
     *
     * @return string
     */
    public static function getTaxInfo($product)
    {
        if ($product->getCanShowPrice() !== false) {
            $tax = Mage::helper('tax');
            $productTypeId = $product->getTypeId();
            
            if ($productTypeId != 'combined') { // use not for Symmetrics_CombinedProduct
                $taxPercent = $product->getTaxPercent();
                if ($tax->displayPriceIncludingTax()) {
                    $taxInfo = sprintf(Mage::helper('tweaksgerman')->__('Incl. %1$s%% tax'), $taxPercent);
                } else {
                    $taxInfo = sprintf(Mage::helper('tweaksgerman')->__('Excl. %1$s%% tax'), $taxPercent);
                }
    
                $shippingLink = sprintf(
                    Mage::helper('core')->__('Excl. <a href="%1$s">shipping</a>'),
                    Mage::getUrl('') . Mage::getStoreConfig('tax/display/shippingurl')
                );
    
                if ($productTypeId != 'virtual' && $productTypeId != 'downloadable') {
                    return '<span class="tax-details">' . $taxInfo . ', ' . $shippingLink . '</span>';
                } else {
                    return '<span class="tax-details">' . $taxInfo . '</span>';
                }
            }
        }
    }
}
