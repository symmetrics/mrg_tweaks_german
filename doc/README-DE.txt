* DOCUMENTATION

** INSTALLATION
Extrahieren Sie den Inhalt dieses Archivs in Ihr Magento Verzeichnis.
Ggf. ist das Leeren/Auffrischen des Magento-Caches notwendig.

** USAGE
Das Modul Symmetrics_TweaksGerman verändert das System so, dass es 
deutschen rechtlichen Ansprüchen von einem Online-Shop entspricht. Das Modul 
ist ein Teil der Vorzertifizierung für das Trusted Shop Siegel.

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
*** A: Verlinkt das Wort "Gewicht" in Attributen mit der Versandkosten-Seite.
        Diese Verlinkung ist aber im Back-End einstellbar (Sieh Punkt B der 
        FUNCTIONALITY)

*** B: Ersetzt die Versandkostenschätzung im Warenkorb durch einen Link auf 
        die Versandkosten-Seite. Der Link ist in der Konfiguration unter 
        "Verkäufe" => "Zur Kasse" => "Warenkorb" => "Lieferinfos" einstellbar.

*** C: Fügt zusätzliche Links zu Bestellinformationen im Warenkorb unter 
        dem Button "Zur Kasse" hinzu. Diese Links sind ebenfalls unter 
        "Verkäufe" => "Zur Kasse" => "Warenkorb" => "Bestellinfos" einstellbar.

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

*** G: Fügt Info-Banner für MRG Packet in System Konfiguration nach Vorlage 
        (s. Screenshot "doc/examples/Info-Banner.jpeg") hinzu. Info-Banner ist 
        unter "Konfiguration" -> "Allgemein" -> "Allgemein" -> 
        "market ready germany Info" zu sehen.
        
*** H: Fügt unter dem E-Mail Feld auf Registrierungseiten (Checkout, 
       Benutzerkonto anlegen) ein Hinweistext auf Werbenutzung der
       E-Mail Adresse ein.

** TECHNICAL
Templates können in den Dateien
app/design/frontend/default/default/template/tweaksgerman/cartinfo.phtml
app/design/frontend/default/default/template/tweaksgerman/shippinginfo.phtml
app/design/frontend/default/default/template/tweaksgerman/weight.phtml
angepasst werden. Es handelt sich dabei um normale HTML-Dateien, die 
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

G: Weil alle Bilder des Banners in der system.xml relative URLs benutzen, 
    werden diese dynamisch per Javascript angepasst. Der Skript befindet
    sich unter "js/symmetrics/tweaksgerman/mrg_banner.js". Für die 
    Korrektur der URL ist die BLANK_IMG variable genutzt.

** PROBLEMS
F: Wenn Sie unterschiedliche Mehrwertsteuersätze abhängig von Kundengruppen
    verwenden, kann die Anzeige des Mehrwertsteuersatzes für ein Produkt 
    unkorrekt sein.

* TESTCASES
** BASIC
*** A: 1. Installieren Sie das Modul (in einem Magento - Shop ver. 1.4.0.0). 
           Prüfen Sie ob danach die Bestellfunktionalität läuft.
       2. Finden Sie oder legen Sie einen neuen Artikel an (der Artikel muss 
           das "Gewicht" Attribut haben und das Gewicht Attribut muss im 
           Front-End sichtbar sein). Gehen Sie auf die Produktdetail-Seite im Frontend 
           und prüfen Sie, ob das "Gewicht" Attribut in der 
           Produktbeschreibung mit der, im Backend eingestellten, CMS-Seite 
           verlinkt ist.

*** B: 1. Gehen Sie ins Frontend und legen Sie einen Artikel in den Warenkorb. Prüfen Sie auf der 
           Warenkorbseite, ob es den "Versandkosten Informationen" 
           Block zusammen mit dem Link "Hier finden Sie Informationen zu den 
           Versandkosten" gibt. Dieser Link muss auf die, im Backend 
           eingestellte Seite, verweisen.

*** C: 1. Gehen Sie ins Frontend und legen Sie einen Artikel in den Warenkorb. Prüfen Sie auf der 
           Warenkorbseite, ob der "So bestellen Sie bei uns" Link 
           direkt unter "Zur Kasse gehen" sichtbar ist. Dieser Link muss, auf 
           die im Backend eingestellte Seite, verweisen.

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

*** G: 1. Vergleichen Sie das Aussehen des Info-Banners mit dem Bespiel 
           ("doc/examples/Info-Banner.jpeg").

*** H: 1. In der Kundenkonfiguration > Benutzerkonto anlegen 
          Optionen > Datenschutzhinweis unter dem E-Mail Feld kann ein
          Hinweis definiert werden, welcher unter dem E-Mail Feld auf 
          der Seite customer/account/create und im Checkout im Abschnitt
          "Rechnungsinformationen" angezeigt wird.