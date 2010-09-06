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
 * @author    Yauhen Yakimovich <yy@symmetrics.de>
 * @copyright 2010 symmetrics gmbh
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @link      http://www.symmetrics.de/
 */

$installer = $this;


/** @var Varien_Db_Adapter_Pdo_Mysql */
$connection  = $this->getConnection();
$regionTable = $installer->getTable('directory/country_region');

$regionsToIns = array(
    array('DE', 'DE', 'Nicht ausgewählt'),

);

foreach ($regionsToIns as $row) {
    if (! ($connection->fetchOne(
        "SELECT 1 FROM `{$regionTable}` WHERE `country_id` = :country_id && `code` = :code",
        array(
            'country_id' => $row[0],
            'code' => $row[1]
            )
    )
    )
) {
        $connection->insert(
            $regionTable,
            array(
                'country_id'   => $row[0],
                'code'         => $row[1],
                'default_name' => $row[2]
            )
        );
    }
}
