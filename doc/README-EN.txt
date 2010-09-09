* DOCUMENTATION

** INSTALLATION
Unpack the content of this module into Magento directory.

** USAGE

The module Symmetrics_TweaksGerman tunes the system for some default 
texts to meet the requirements of the German webshops. This module is a part 
of "Trusted Shop" certification process.

** FUNCTIONALITY

*** A: The word "Weight" for the corresponding attribute on product details 
       page, once shown, becomes a reference to the shipping information page.

*** B: Replaces "shipping costs information" with static information about 
       shipping.

*** C: Adds some additional links below the order button in the cart.

*** D: Hide the "state/province" when country is germany in editing address data

*** E: Hide the "state/province" when country is germany in checkout process when c

** TECHNICAL
Links can be always customized in following files located at 
app/design/frontend/default/default/template/:
tweaksgerman/cartinfo.phtml, tweaksgerman/shippinginfo.phtml,
added js/symmetrics/tweaksgerman/province.js
In this file we create 3 observer.
They are listening for an change of the country_id.
If the country_id is "DE" hide the "state/province" and add a new hidden field
with an dump id.

** PROBLEMS
Taxes can be inccorrect under some circumstances.

* TESTCASES

** BASIC
*** A:  1. Install the module (into Magento - Shop ver. 1.4.0.0). Make sure
           one can successfully order a product.
        2. Find or create a new product (it should have a defined "weight" 
           attribute and this attribute should be set visible for the 
           Front-end). Go to the product details page and check whether "Weight"
           word inside the listing of the product attributes is a reference to 
           the corresponding "lieferung" (shipping) CMS page.

*** B:  1. Go to the Front-end and put an arbitrary product into your cart.
           Check the cart page for "shipping costs information". The link must
           be pointing to the "lieferung" page and the text of the link "Here 
           you found informations to the shipping costs".

*** C:  1. Go to the Front-end and put an arbitrary product into your cart.
           Check "In this way, you order by us" link on the cart page just under
           "Proceed to checkout" button. The link itself must be proper 
           referenced to the "bestellung" (order) CMS-page.

*** D:  1. Go to the Front-end and add or edit an address.
           Check when country is germany you have no "state/province" to choose.
           Check if you can save your address

*** E:  1. Go to the Front-end and buy some products.
           Check if you can set an address in billing and shipping
           with german country and no "state/province" to choose.
           Look if you can complete your order