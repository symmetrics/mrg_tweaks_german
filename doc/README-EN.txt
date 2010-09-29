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

*** A: The word "Weight" for the corresponding attribute on product details 
       page, once shown, becomes a reference to the shipping information page.

*** B: Replaces "shipping costs information" with static information about 
       shipping.

*** C: Adds some additional links below the order button in the cart.

*** D: Fügt zusätzliche Links zu Widerrufinformationen im Warenkorb unter 
        dem Button "Zur Kasse" hinzu. Diese Links sind ebenfalls unter 
        "Verkäufe" => "Zur Kasse" => "Warenkorb" => "Widerrufinfos" 
        einstellbar. 
       
*** E: Per Javascript wird automatisch "An diese Adresse verschicken" (im 
        Checkout) ausgewählt, damit der Kunde das nicht manuell umstellen muss.

*** F: Fügt Steuerinformationen und einen Link auf die Seite Versandkosten 
        nach jeder Preisanzeige im Frontend ein. Der Link auf der Seite ist 
        aber in der Konfiguration unter "Verkäufe" => "Steuer"
        => "Preisanzeige" => "Versandkosten (CMS-Seite)" einstellbar.

*** G: There's multilanguage information banner for the whole MRG
       in System Configuration with sponsored banners, actions, text and links.
        
*** H: Fügt unter dem E-Mail Feld auf Registrierungseiten (Checkout, 
       Benutzerkonto anlegen) ein Hinweistext auf Werbenutzung der
       E-Mail Adresse ein.

*** I: Zeigt "Zzgl. MwSt." und "Inkl. MwSt." Texts, abhängig von der 
        Backend-Einstellung 'tax/sales/display/price' (unter "System" -> 
        "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in Bestellungen, 
        Rechnungen, Gutschriften" -> "Preisanzeige").

*** J: Vertauscht die Position der Felder PLZ und Stadt im Checkout sowie im
       Kundenkonto

*** K: Fügt eine neue Auswahl in der Konfiguration hinzu, ob der Versandkosten-
       Hinweis inkl., exkl oder garnicht angezeigt wird. Ebenfalls kann man die
       Anzeige des Gewichts (inkl. 7% MwSt., inkl. Versandkosten (Gewicht 3,20kg))
       ein- und ausschalten.

*** L: Hide the "state/province" when country is germany in editing address data.

*** M: Hide the "state/province" when country is germany in checkout process.

** TECHNICAL

Links can be always customized in following files located at 
app/design/frontend/default/default/template/tweaksgerman/:
    cartinfo.phtml,
    shippinginfo.phtml,
    weight.phtml.

Added js/symmetrics/tweaksgerman/province.js
In this file we create 3 observer.
They are listening for an change of the country_id.
If the country_id is "DE" hide the "state/province" and add a new hidden field
with an dump id.
    
Es handelt sich dabei um normale HTML-Dateien, die 
Sie komplett nach Ihren Wünschen verändern können. Per Layout XML wird eine
Javascript Datei eingebunden, die das select Feld im Checkout ("An diese 
Adresse verschicken") ändert.


F: 1. Ein Beispiel-Link wird durch das Modul Symmetrics_ConfigGermanTexts 
       installiert.
   2. Das Modul zeigt keinen Versandkosten-Link für Virtual und Downloadable
       Produkte an.
   3. Das Modul zeigt keinen TAX-Infos und Versandkosten-Link für Combined
       Produkte an.
   4. Das Modul verändert auf keine Weise die Konfiguration, den Core-Code
       oder die Datenbank. Daher kann kann Modul jederzeit ohne Probleme
       gelöscht werden.

G: Magento template (with multilanguage support) is connected to Info-Box in
   the Admin Panel Configuration by frontend model renderer
   (adminhtml_system_config_info).

I: Mit Hilfe des neuen Blocks TaxRender wird "Zzgl. MwSt." und "Inkl. MwSt." 
    abhängig von der Backend-Einstellung 'tax/sales/display/price' (unter 
    "System" -> "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in 
    Bestellungen, Rechnungen, Gutschriften" -> "Preisanzeige") angezeigt.

** PROBLEMS

Taxes can be inccorrect under some circumstances.

F: Wenn Sie unterschiedliche Mehrwertsteuersätze abhängig von Kundengruppen
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

*** B:  1. Go to the Front-end and put an arbitrary product into your cart.
           Check the cart page for "shipping costs information". The link must
           be pointing to the "lieferung" page and the text of the link "Here 
           you found informations to the shipping costs".

*** C:  1. Go to the Front-end and put an arbitrary product into your cart.
           Check "In this way, you order by us" link on the cart page just under
           "Proceed to checkout" button. The link itself must be proper 
           referenced to the "bestellung" (order) CMS-page.

*** D: 1. Gehen Sie ins Frontend und legen Sie einen Artikel in den Warenkorb. Prüfen Sie auf der 
           Warenkorbseite, ob der "Hier finden Sie die Einzelheiten zu 
           Ihrem Widerrufsrecht" Link direkt unter "Zur Kasse gehen" sichtbar 
           ist. Dieser Link muss auf, die im Backend eingestellte Seite, 
           verweisen.

*** E: 1. Führen Sie im Frontend einen Bestellvorgang durch; Wenn Sie Ihre
           Rechnungsadresse eingegeben haben, sollte standardmäßig die Option
           "An diese Adresse verschicken" ausgewählt sein.

*** F: 1. Im Frontend soll nach jeder Preisanzeige Steuerinformationen
           (zzgl. ..% MwSt.) und ein Link auf die Seite Versandkosten gezeigt 
           werden. Dieser Link muss auf die im Backend eingestellte Seite 
           verweisen.

*** G: 1. Open "Admin Panel / System / Configuration / Sales /
          Trusted Shops Seal / Info" and compare the contents of a banner
          with a screenshot [SCREENSHOT: Info-Banner_en.png].
          To test the buttons and links.
       2. Change the backend language from English to German, in this case,
          the banner should display the German text [SCREENSHOT: Info-Banner_de.png].

*** H: 1. Defenieren Sie unter "System -> Konfiguraton -> Kunden -> 
           Kundenkonfiguration -> Benutzerkonto anlegen Optionen -> 
           Datenschutzhinweis unter dem E-Mail Feld" einen Hinweis, welcher 
           unter dem E-Mail Feld auf der Seite customer/account/create und 
           im Checkout im Abschnitt "Rechnungsinformationen" angezeigt wird.
       2. Überprüfen Sie, dass die Einstellung "Info-Notiz für E-Mail Feld 
           aktivieren" entsprechend den Hinweis aktiviert/deaktiviert. Der 
           standart Wert ist "Nein".

*** I: 1. Legen Sie ein Produkt in den Warenkorb und überprüfen Sie, ob die
           Steuer-Infos mit dem Text "Zzgl. MwSt." und "Inkl. MwSt." 
           angezeigt werden. (abhängig von der Einstellung unter "System" -> 
           "Konfiguration" ->"Verkäufe" -> "Steuer" -> "Anzeige in Bestellungen, 
           Rechnungen, Gutschriften" -> "Preisanzeige"). 
       2. Die Steuer-Infos müssen auch in "Zur Kasse" (vor der Bestellung) 
           richtig angezeigt werden.
       3. Achtung! Der Wert "Including and Excluding Tax" wird nicht unterstützt.
       
*** J: 1. Prüfen Sie ob die Positionen der Felder PLZ und Stadt im Checkout sowie
          im Kundenkonto (Neue Adresse anlegen / Adressen bearbeiten) vertauscht
          sind (Erst kommt PLZ, danach Stadt).

*** K: 1. Prüfen Sie ob die Einstellungen "Gewicht-Info anzeigen" sowie 
          "Versandkosten-Info anzeigen" unter Admin Panel / System / 
          Konfiguration / Katalog / Katalog korrekt funktionieren (Es geht
          um die Anzeige nebem dem Produktpreis in der Kategorie sowie 
          Produktansicht).

*** L: 1. Go to the Front-end and add or edit an address.
          Check when country is germany you have no "state/province" to choose.
          Check if you can save your address.

*** M: 1. Go to the Front-end and buy some products.
          Check if you can set an address in billing and shipping
          with german country and no "state/province" to choose.
          Look if you can complete your order.
