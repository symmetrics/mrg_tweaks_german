* DOCUMENTATION

** INSTALLATION
Extrahieren Sie den Inhalt dieses Archivs in Ihr Magento Verzeichnis. Ggf. ist das Leeren/Auffrischen des Magento-Caches notwendig.

** USAGE
Das Modul Symmetrics_TweaksGerman verändert das System so, dass es 
deutschen rechtlichen Ansprüchen an einen Online-Shop genügt. Das Modul 
ist ein Teil der Vorzertifizierung für das Trusted Shop Siegel.

Im Checkout ist die "An andere Adresse verschicken"-Option aktiviert. 
Das Modul Symmetrics_DefaultAddressSelection aktiviert stattdessen die Option "An diese Adresse verschicken". 
So muss der Kunde das nicht manuel umstellen.

Symmetrics_TweaksGerman fügt nach jeder Preisanzeige
im Frontend Informationen über die Steuern für einen
Artikel hinzu. Diese Anzeige ist vom Gesetzgeber vorgeschrieben
damit jedem Besucher ersichtlich ist ob die Preise
inklusive oder zuzueglich Mehrwertsteuer sind.  Es wird 
ebenfalls ein Link auf die Seite Versandkosten 
hinzugefuegt, das alles wird gemacht ohne die Templates zu verändern.

** FUNCTIONALITY
*** A: Verlinkt das Wort "Gewicht" in Attributen mit der Versandkosten-Seite.

*** B: Ersetzt die Versandkostenschätzung im Warenkorb durch einen Link auf 
       die Versandkosten-Seite. Der link ist in der Konfiguration unter 
       "Verkäufe" => "Zur Kasse" => "Warenkorb" => "Lieferinfos" einstellbar.

*** C: Fügt zusätzliche Links zu Bestellinformationen im Warenkorb unter 
       dem Button "Zur Kasse" hinzu. Diese Links sind ebenfalls unter 
       "Verkäufe" => "Zur Kasse" => "Warenkorb" einstellbar. 
       
*** E: Per Javascript wird automatisch "An diese Adresse verschicken"
        (im Checkout) ausgewählt damit der Kunde das nicht manuell umstellen muss.

*** F: Fügt Steuerinformationen und ein Link auf die Seite Versandkosten nach
       jeder Preisanzeige im Frontend ein.

*** G: Liest den zugewiesenen Steuersatz automatisch aus.

** TECHNICAL
Templates können in den Dateien
app/design/frontend/default/default/template/:
         tweaksgerman/cartinfo.phtml, tweaksgerman/shippinginfo.phtml
angepasst werden. Es handelt sich dabei um normale HTML-Dateien, die 
Sie komplett nach Ihren Wünschen verändern können.
Per Layout XML wird eine Javascript Datei eingebunden, die das select Feld im Checkout
("An diese Adresse verschicken") ändert.

F: 
1: Ein Beispiel-Link wird durch das Modul Symmetrics_ConfigGermanTexts installiert.
        Dieser kann jederzeit unter Configuration -> Tax -> Display -> Versandkosten (CMS-Seite)
        geändert werden.
2: Das Modul zeigt keinen Versandkosten-Link fuer Virtual und Downloadable
        Produkte an.
3: Das Modul verändert auf keine Weise die Konfiguration, den Core-Code
        oder die Datenbank. Daher kann kann Modul jederzeit ohne Probleme
        gelöscht werden.

** PROBLEMS
F: Wenn Sie unterschiedliche Mehrwertsteuersätze
       abhängig von Kundengruppen verwenden, kann die
       Anzeige des Mehrwertsteuersatzes fuer ein Produkt
       unkorrekt sein.
       TODO

* TESTCASES
** BASIC
*** A:  
**** 1. Installieren Sie das Modul (in einem Magento - Shop ver. 1.4.0.0). 
           Prüfen Sie ob danach die Bestellungsfunktionalität läuft.
**** 2. Finden Sie oder legen Sie ein neuen Artikeln an (der Artikel muss 
           das Gewicht Attribut haben und das Gewicht Attribut muss im 
           Front-End sichtbar sein). Auf die Produktdetails Seite im Front-End 
           gehen und prüfen ob das "Gewicht" Attribut in der Produktbeschreibung 
           mit der "lieferung" CMS-Seite verlinkt ist.
*** B:
**** 1. Ins Front-End gehen und ein Artikel in den Warenkob liegen. Auf der 
           Warenkorb Seite prüfen ob es den "Versandkosten Informationen" Block
           zusammen mit dem Link "Hier finden Sie Informationen zu den 
           Versandkosten." gibt. Dieser Link muß auf die, im Backend eingestellte
           Seite verweisen.
*** C:
**** 1. Ins Front-End gehen und einen Artikel in den Warenkob liegen. Auf der 
           Warenkorb Seite prüfen ob es den "So bestellen Sie bei uns" Link direkt
           unter "Zur Kasse gehen" sichtbar ist. Dieser Link muss auf die, im 
           Backend eingestellte Seite verweisen.
*** E:
**** 1. Führen sie im Frontend einen Bestellvorgang durch; Wenn sie ihre
            Rechnungsadresse eingegeben haben, sollte standartmäßig die Option
            "An diese Adresse verschicken" ausgewählt sein.
*** F: Im Frontend nach jeder Preisanzeige soll ein Steuerinformationen
       (zzgl. ..% MwSt.) und ein Link auf die Seite Versandkosten gezeigt sein.
*** G: TODO