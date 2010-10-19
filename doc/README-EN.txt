* DOCUMENTATION

** INSTALLATION

Unpack the content of this module into Magento directory.


** USAGE

The module Symmetrics_TweaksGerman tunes the system for some default 
texts to meet the requirements of the German webshops. This module is a part 
of "Trusted Shop" certification process.

Das Wort "Gewicht" in Attributen wird mit der Versandkosten-Seite verlinkt.
Das Modul ersetzt die Versandkostenschätzung im Warenkorb und fügt 
zusätzliche Links zu Bestellinformationen, sowie Widerrufinformationen hinzu. 
Diese Links können unter "Verkäufe" => "Zur Kasse" => "Warenkorb" als 
CMS-Seiten ausgewählt werden.

Im Checkout ist die "An andere Adresse verschicken"-Option aktiviert. 
Das Modul Symmetrics_TweaksGerman aktiviert stattdessen die Option
"An diese Adresse verschicken". So muss der Kunde das nicht manuell umstellen.

Symmetrics_TweaksGerman fügt nach jeder Preisanzeige im Frontend 
Informationen über die Steuern für einen Artikel hinzu. Diese Anzeige ist vom 
Gesetzgeber vorgeschrieben, damit jedem Besucher ersichtlich ist, ob die Preise
inklusive oder zuzüglich Mehrwertsteuer sind.  Es wird ebenfalls ein Link 
auf die Seite Versandkosten hinzugefügt, das alles wird gemacht ohne die 
Templates zu verändern.


** FUNCTIONALITY

*** A:  The word "Weight" for the corresponding attribute on product details 
        page, once shown, becomes a reference to the shipping information page.

*** B:  Adds 2 additional links to CMS Pages below the order button
        in the cart. Settings in "Admin Panel / System / Configuration / Sales /
        Checkout / Shopping Cart": 
        - Order information (CMS page),
        - Revocation terms (CMS page).

*** C:  Per Javascript wird automatisch "An diese Adresse verschicken" (im 
        Checkout) ausgewählt, damit der Kunde das nicht manuell umstellen muss.

*** D:  Fügt Steuerinformationen und einen Link auf die Seite Versandkosten 
        nach jeder Preisanzeige im Frontend ein. Der Link auf der Seite ist 
        aber in der Konfiguration unter "Verkäufe" => "Steuer"
        => "Preisanzeige" => "Versandkosten (CMS-Seite)" einstellbar.

*** E:  There's multilanguage information banner for the whole MRG
        in System Configuration with sponsored banners, actions, text and links.
        
*** F:  Fügt unter dem E-Mail Feld auf Registrierungseiten (Checkout, 
        Benutzerkonto anlegen) ein Hinweistext auf Werbenutzung der
        E-Mail Adresse ein.

*** G:  Zeigt "Zzgl. MwSt." und "Inkl. MwSt." Texts, abhängig von der 
        Backend-Einstellung 'tax/sales/display/price' (unter "System" -> 
        "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in Bestellungen, 
        Rechnungen, Gutschriften" -> "Preisanzeige").

*** H:  Vertauscht die Position der Felder PLZ und Stadt im Checkout sowie im
        Kundenkonto

*** I:  Fügt eine neue Auswahl in der Konfiguration hinzu, ob der Versandkosten-
        Hinweis inkl., exkl oder garnicht angezeigt wird. Ebenfalls kann man die
        Anzeige des Gewichts (inkl. 7% MwSt., inkl. Versandkosten (Gewicht 3,20kg))
        ein- und ausschalten.

*** J:  Hide the "state/province" when country is germany in editing address data.

*** K:  Hide the "state/province" when country is germany in checkout process.

*** L:  Show / hide percent in tax info.


** TECHNICAL

Links can be always customized in following files located at 
app/design/frontend/default/default/template/tweaksgerman/:
    cartinfo.phtml,
    shippinginfo.phtml,
    weight.phtml.

A:  Via js, which was added in the new template weight.phtml, the attribute 
    "weight", which is displayed in the product detail view, was wrapped
    with a link to the shipping CMS Page.
    
B:  The template cartinfo.phtml was added in checkout.cart.methods and displayes
    the two links to the CMS-Pages "Order information" and "Revocation terms".
    
C:  The js-file checkout.js implements js to select automatically
    "ship to this address".

D:  1. Ein Beispiel-Link wird durch das Modul Symmetrics_ConfigGermanTexts 
       installiert.
    2. Das Modul zeigt keinen Versandkosten-Link für Virtual und Downloadable
       Produkte an.
    3. Das Modul zeigt keinen TAX-Infos und Versandkosten-Link für Combined
       Produkte an.
    4. Das Modul verändert auf keine Weise die Konfiguration, den Core-Code
       oder die Datenbank. Daher kann kann Modul jederzeit ohne Probleme
       gelöscht werden.

E:  Magento template (with multilanguage support) is connected to Info-Box in
    the Admin Panel Configuration by frontend model renderer
    (adminhtml_system_config_info).
   
F:  The template emailnotice.phtml implements js to add the email - notice,
    which is configurable in the admin panel, after the email - fields in
    the registration form and the checkout form.

G:  Mit Hilfe des neuen Blocks TaxRender wird "Zzgl. MwSt." und "Inkl. MwSt." 
    abhängig von der Backend-Einstellung 'tax/sales/display/price' (unter 
    "System" -> "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in 
    Bestellungen, Rechnungen, Gutschriften" -> "Preisanzeige") angezeigt.
    
H:  The js-file address.js (added in customer_address_form) changes the 
    position from zip and city. The js-file checkout.js is doing the
    same (and has the functionality from point "C" too) in 
    checkout_onepage_index.
    
I:  The core class Mage_Catalog_Block_Product_Abstract was added to the 
    local pool, because you cannot rewrite a abstract class. The function 
    "getPriceHtml" in this class was modified, so that the shipping costs
    info - link was displayed after the product price in the product- 
    and category view.
    
J:  The js-file province.js, which was added in customer_address_form
    hides the "state/province" - field when germany is selected as country.
    In this file we create 3 observer.
    They are listening for an change of the country_id.
    If the country_id is "DE" hide the "state/province" and add a new hidden field
    with an dump id.
    
K:  The same as in point "J", but implemented in checkout_onepage_index.


** PROBLEMS

Taxes can be inccorrect under some circumstances.

D:  Wenn Sie unterschiedliche Mehrwertsteuersätze abhängig von Kundengruppen
    verwenden, kann die Anzeige des Mehrwertsteuersatzes für ein Produkt 
    unkorrekt sein.


* TESTCASES
** BASIC

*** A:  1. Install the module (into Magento - Shop ver. 1.4.0.0). Make sure
           one can successfully order a product.
        2. Find or create a new product (it should have a defined "weight" 
           attribute and this attribute should be set visible for the 
           Front-end). Go to the product details page and check whether "Weight"
           word inside the listing of the product attributes is a reference to 
           the corresponding "lieferung" (shipping) CMS page.

*** B:  Go to the Front-end and put an arbitrary product into your cart.
        Under the button "Process to Checkout" should be 2 additional links:
        1) "How to order."
        2) "Click here to find  details on revocation."
        Which should lead to the appropriate CMS Pages.
       
*** C:  1. Führen Sie im Frontend einen Bestellvorgang durch; Wenn Sie Ihre
           Rechnungsadresse eingegeben haben, sollte standardmäßig die Option
           "An diese Adresse verschicken" ausgewählt sein.

*** D:  1. Im Frontend soll nach jeder Preisanzeige Steuerinformationen
           (zzgl. ..% MwSt.) und ein Link auf die Seite Versandkosten gezeigt 
           werden. Dieser Link muss auf die im Backend eingestellte Seite 
           verweisen.

*** E:  1. Open "Admin Panel / System / Configuration / Sales /
           Trusted Shops Seal / Info" and compare the contents of a banner
           with a screenshot [SCREENSHOT: Info-Banner_en.png].
           To test the buttons and links.
        2. Change the backend language from English to German, in this case,
           the banner should display the German text [SCREENSHOT: Info-Banner_de.png].

*** F: 1. Defenieren Sie unter "System -> Konfiguraton -> Kunden -> 
           Kundenkonfiguration -> Benutzerkonto anlegen Optionen -> 
           Datenschutzhinweis unter dem E-Mail Feld" einen Hinweis, welcher 
           unter dem E-Mail Feld auf der Seite customer/account/create und 
           im Checkout im Abschnitt "Rechnungsinformationen" angezeigt wird.
       2. Überprüfen Sie, dass die Einstellung "Info-Notiz für E-Mail Feld 
           aktivieren" entsprechend den Hinweis aktiviert/deaktiviert. Der 
           standart Wert ist "Nein".

*** G: 1. Legen Sie ein Produkt in den Warenkorb und überprüfen Sie, ob die
           Steuer-Infos mit dem Text "Zzgl. MwSt." und "Inkl. MwSt." 
           angezeigt werden. (abhängig von der Einstellung unter "System" -> 
           "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in Bestellungen, 
           Rechnungen, Gutschriften" -> "Preisanzeige"). 
       2. Die Steuer-Infos müssen auch in "Zur Kasse" (vor der Bestellung) 
           richtig angezeigt werden.
       3. Achtung! Der Wert "Including and Excluding Tax" wird nicht unterstützt.
       
*** H: 1. Prüfen Sie ob die Positionen der Felder PLZ und Stadt im Checkout sowie
          im Kundenkonto (Neue Adresse anlegen / Adressen bearbeiten) vertauscht
          sind (Erst kommt PLZ, danach Stadt).

*** I: 1. Prüfen Sie ob die Einstellungen "Gewicht-Info anzeigen" sowie 
          "Versandkosten-Info anzeigen" unter Admin Panel / System / 
          Konfiguration / Katalog / Katalog korrekt funktionieren (Es geht
          um die Anzeige nebem dem Produktpreis in der Kategorie sowie 
          Produktansicht).

*** J: 1. Go to the Front-end and add or edit an address.
          Check when country is germany you have no "state/province" to choose.
          Check if you can save your address.

*** K: 1. Go to the Front-end and buy some products.
          Check if you can set an address in billing and shipping
          with german country and no "state/province" to choose.
          Look if you can complete your order.

*** L: 1. You can enable / disable displaying the percent in the
          tax info link by admin panel / catalog / shop / Show tax info.
          