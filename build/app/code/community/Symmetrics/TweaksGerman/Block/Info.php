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
 * @author    Eugen Gitin <eg@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

/**
 * Block class for tax and weight information
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Eugen Gitin <eg@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
class Symmetrics_TweaksGerman_Block_Info extends Mage_Core_Block_Template
{
    /**
     * Get additional price information
     *
     * @return string html
     */
    public function getInfo()
    {
        $info[] = $this->getTaxInfo();
                 
        if (Mage::getStoreConfig('catalog/frontend/enable_weight_info')) {
            $info[] = $this->getWeightInfo();
        }       
        if (Mage::getStoreConfig('catalog/frontend/enable_delivery_info')) {
            $info[] = $this->getDeliveryInfo();
        }       
        
        return implode('<br/>', $info); 
    }
                       
    /**
     * Get delivery information.
     *
     * @return string html
     */
    public function getDeliveryInfo()
    {
        return Mage::getBlockSingleton('tweaksgerman/weight')
            ->getDeliveryInfo($this->getProduct());
    }     
    
    /**
     * Get weight information
     *
     * @return string html
     */
    public function getWeightInfo()
    {
        return Mage::getBlockSingleton('tweaksgerman/weight')
            ->getWeightInfo($this->getProduct());
    }   

    /**
     * Get tax information
     *
     * @return string html
     */
    public function getTaxInfo()
    {
        return Mage::getBlockSingleton('tweaksgerman/tax')
            ->getTaxInfo($this->getProduct());
    }
}
