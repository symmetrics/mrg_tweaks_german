# DOCUMENTATION

## INSTALLATION

Unpack the content of this module into the Magento directory.


## USAGE

The module Symmetrics_TweaksGerman tunes the system for some default
texts to meet the requirements of the German webshops. This module is a part
of the "Trusted Shop" certification process.

The word "Weight" in attributes is linked to the Shipment costs page.
The module replaces shipment costs in the cart and inserts
additional links to order information, as well as revocation information.
These links can be selected as CMS pages under Sales -> To checkout -> Cart.

In checkout the option "send to another address" is activated.
The module Symmetrics_TweaksGerman activates instead the option
"Send to this address". Thus the customer should not switch this manually.

In the frontend, Symmetrics_TweaksGerman adds after every price indicator
information about taxes for the item. This is required by legislation, so
that it is evident for every visitor, whether the price includes or excludes VAT.
A link will be also added to the shipment costs page. This all is made without
any changes in templates.


## FUNCTIONALITY

1. The word "Weight" for the corresponding attribute on product details page, once shown, becomes a reference to the shipping information page.

2. Adds 2 additional links to CMS Pages below the order button in the cart. Settings in "Admin Panel / System / Configuration / Sales / Checkout / Shopping Cart":
    * Order information (CMS page),
    * Revocation terms (CMS page).

3. Per Javascript, "Send to this address " (in checkout) will be automatically selected, so that the customer does not have to switch this manually.

4. In the frontend, adds tax information and a link on the shipment costs page by every price indicator. The link is on the page but can be set in the configuration under "Sales" => "Tax" => "Price display" => "Shipping costs (CMS page)".

5. There's multilanguage information banner for the whole MRG in System Configuration with sponsored banners, actions, text and links.

6. Under e-mail field on registration pages (checkout, create user account) adds reference information on advertising use of the e-mail address.

7. Displays "excl. VAT " and  "incl. VAT" texts, depending on the backend setting 'tax/sales/display/price' (under "System"->"Configuration"-> "Sales"-> "Tax" -> "Display in orders, billing, credits " -> "Price display").

8. Changes the position of the Postal Code and City fields in checkout as well as in the customer account.

9. Adds a new selection in the configuration: whether to display shipment costs notice as incl., excl. or not to display at all. The display of weight (incl. 7% VAT, incl. shipment costs(weight 3.20 kg)) can also be turned on and off.

10. Hide the "state/province" when country is selected in backend when editing address data in frontend.

11. Hide the "state/province" when country is selected in backend when editing address in  checkout process.

12. Show / hide percent in tax info.


## TECHNICAL

Links can be always customized in the following files located at app/design/frontend/default/default/template/tweaksgerman/:
    * cartinfo.phtml,
    * shippinginfo.phtml,
    * weight.phtml.

1. Via js, which was added in the new template weight.phtml, the attribute "weight", which is displayed in the product details view, was wrapped with a link to the shipping CMS Page.

2. The template cartinfo.phtml was added in checkout.cart.methods and displayes the two links to the CMS-Pages "Order information" and "Revocation terms".

3. The js-file checkout.js implements js to select automatically "ship to this address".

4. 
    1. An example link is installed through Symmetrics_ConfigGermanTexts module
    2. The module does not display a shipping costs link for virtual and downloadable products.
    3. The module does not display tax-info und shipping costs link for combined products.
    4. The module does not in any way change the configuration, the core-code or the database. Thus, the module can anytime be removed without problems.

5. Magento template (with multilanguage support) is connected to Info-Box in the Admin Panel Configuration by frontend model renderer (adminhtml_system_config_info).

6. The template emailnotice.phtml implements js to add the email - notice, which is configurable in the admin panel, after the email - fields in the registration form and the checkout form.

7. With the help of the new block TaxRender "excl. VAT" and "inck. VAT" depending on the backend settings 'tax/sales/display/price' (under "System" -> "Configuration" -> "Sales" - > "Tax" -> Display in orders, invoices, credits" -> "Price display") is displayed.

8. The js-file address.js (added in customer_address_form) changes the position from zip and city. The js-file checkout.js is doing the same (and has the functionality from item "C" too) in checkout_onepage_index.

9. The core class Mage_Catalog_Block_Product_Abstract was added to the local pool, because you cannot rewrite an abstract class. The function "getPriceHtml" in this class was modified, so that the shipping costs info - link was displayed after the product price in the product- and category view.

10. The js-file province.js, which was added in customer_address_form hides the "state/province" - field when Germany is selected as country. We create 3 observers in this file . They are listening for a change of the country_id. If the country_id is "DE" hide the "state/province" and add a new hidden field with a dump id.

11. The same as in item "10." but implemented in checkout_onepage_index.


## PROBLEMS

Taxes can be inccorrect under some circumstances.

4. When you apply different value added tax depending on customer groups, display of value added tax rate can be incorrect for a product.


## TESTCASES
### BASIC

1. 
    1. Install the module (into Magento - Shop ver. 1.4.0.0). Make sure one can successfully order a product.
    2. Find or create a new product (it should have a defined "weight" attribute and this attribute should be set visible for the Front-end). Go to the product details page and check whether "Weight" word inside the listing of the product attributes is a reference to the corresponding "lieferung" (shipping) CMS page.

2. Go to the Front-end and put an arbitrary product into your cart.
    2 additional links should be under the "Process to Checkout"  button:
    1. "How to order."
    2. "Click here to find  details on revocation." Which should lead to the appropriate CMS Pages.

3. Perform an order process in frontend, when you entered your billing address, by default "ship to this address" option should be selected.

4. In frontend after each price display the value added tax(excl. ..% MwSt.) and a link to shipping costs page should be shown. This link must reference to the configured page in backend.

5. 
    1. Open "Admin Panel / System / Configuration / Sales / Trusted Shops Seal / Info" and compare the contents of a banner with a screenshot. To test the buttons and links.
    2. Change the backend language from English to German, in this case, the banner should display the German text [SCREENSHOT: Info-Banner_de.png].

6. 
    1. Define under "Systme -> Configuration -> Customers -> Customer configuration -> Create new account options -> Privacy note under the e-mail field' a note that will be displayed uner the e-mail field on customer/account/create page and in checkout in "account information" section.
    2. Check that the "activate info notice for e-mail field" setting is activated/deactivated according to the note. The default value is "no".

7. 
    1. Put a product to the cart and check if the tax info is displayed with the text "excl. VAT" and "incl.VAT" (depending on the setting under "System" -> "Configuration" -> "Sales" -> "Tax" -> Display in orders, invoices, credits" -> "Price display"
    2. The tax info must be displyed correctly also in "Checkout" (before the order).
    3. Attention! The value "Including and Excluding Tax" is not supported.

8. Check if postitions of fields zip code and city in checkout as well as in customer account (create new address / edit addresses) are swapped (first is zip code, then city).

9. Check if "Show weight info"  as well as "show shipping costs info" work correctly under admin panel /System/ Configuration/ Catalog/Catalog (it is all about the display near the product price in the category as well as the product view).

10. 
    1. Go to the Back-end and configure the countries who have to hide it's regions on frontend. You can find the configuration in System -> Configuration, Global -> Global and then go into the Countries Option tab and configure the contries in the Hide Regions of Country multiselect.
    2. Go to the Front-end and add or edit an address.
    3. Check that when country/ies you configured in backend you have no "state/province" to choose.
    4. Check if you can save your address.

11. 
    1. Go to the Back-end and configure the countries who have to hide it's regions on frontend.
    You can find the configuration in System -> Configuration, Global -> Global and then go into the Countries Option tab and configure the contries in the Hide Regions of Country multiselect.
    2. Go to the Front-end and buy some products.
    3. Check if you can set an address in billing and shipping
    with a country you configured in backend and no "state/province" to choose.
    4. Look if you can complete your order.

12. You can enable / disable displaying the percent in the tax info link by admin panel / catalog / shop / Show tax info.
