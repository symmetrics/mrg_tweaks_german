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
 * @copyright 2011 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

/**
 * Observer model.
 *
 * @category  Symmetrics
 * @package   Symmetrics_TweaksGerman
 * @author    symmetrics gmbh <info@symmetrics.de>
 * @author    Eric Reiche <er@symmetrics.de>
 * @copyright 2011 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */
class Symmetrics_TweaksGerman_Model_Observer
{
    /**
     * @const CONFIGURATION_ORDER_IP
     */
    const CONFIGURATION_ORDER_IP = 'customer/privacy/order_ip';

    /**
     * Remove IP on checkout submit.
     *
     * @param Varien_Event_Observer $observer Observer object to get the order from.
     *
     * @return void
     */
    public function checkoutSubmit($observer)
    {
        if (!Mage::getStoreConfigFlag(self::CONFIGURATION_ORDER_IP)) {
            $observer->getOrder()->setRemoteIp('0');
        }
    }

    /**
     * Add a additional price information.
     *
     * @param Varien_Event_Observer $observer Observer object to get a block by
     *                                        toHtml method call.
     *
     * @return void
     */
    public function toHtmlAfter($observer)
    {
        $block = $observer->getBlock();
        $transport = $observer->getTransport();
        $html = $transport->getHtml();
        $handles = $block->getLayout() ?
            $block->getLayout()->getUpdate()->getHandles() : array();

        $additionalInfoFlag = false;

        // Wishlist
        if (
            $block->getIdSuffix() == '-wishlist'
            || in_array('wishlist_index_index', $handles)
        ) {
            if ($block instanceof Mage_Wishlist_Block_Render_Item_Price) {
                $additionalInfoFlag = true;
            }

        // Bundle product type
        } elseif (
            $block instanceof Mage_Bundle_Block_Catalog_Product_Price
            && trim($html)
            && (
                $block->getDisplayMinimalPrice()
                || $block->getNameInLayout() == 'bundle.prices'
                || $block->getIdSuffix() == '_clone'
            )
        ) {
            $additionalInfoFlag = true;

        // Other product types
        } elseif (get_class($block) == 'Mage_Catalog_Block_Product_Price' && trim($html)) {
            $additionalInfoFlag = true;
        }

        if ($additionalInfoFlag) {
            $info = Mage::app()->getLayout()->createBlock('tweaksgerman/info')
                ->setProduct($block->getProduct())
                ->getInfo();
            $transport->setHtml($html . $info);
        }
    }
}
