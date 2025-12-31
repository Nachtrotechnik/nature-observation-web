# Logbuch / Projektdokumentation

Dieses Logbuch dient der kontinuierlichen Dokumentation der eigenen Arbeitsschritte, Reflexionen und Entscheidungen während der Entwicklung des Naturbeobachtungs-Portals.

Alle Vorgänge und Tätigkeiten finden im Rahmen einer Übung statt, sollen jedoch stets professionellen Standards entsprechen. Jede Änderung, jeder Meilenstein und jede wichtige Erkenntnis wird hier schriftlich festgehalten.

---

## Eintragsvorlage (bitte für jeden Schritt verwenden)

**Datum:**
**Bearbeiter/in:**
**Bearbeitete Datei(en):**
**Kurze Beschreibung des Schrittes:**
**Begründung/Reflexion:**

---

## Beispiel-Eintrag

**Datum:** 2025-10-30  
**Bearbeiter/in:** Max Mustermann  
**Bearbeitete Datei(en):** index.html, style.css  
**Kurze Beschreibung des Schrittes:** Grundlegendes Seitenlayout mit Flexbox vorbereitet, Semantik überprüft.  
**Begründung/Reflexion:** Flexbox bietet eine flexible Basis für das Mockup-Layout und unterstützt das Ziel der Übung, Responsive Design umzusetzen. Verbesserungsideen für nächste Iteration notiert.

---

Jede Projektsitzung sowie jede relevante Änderung ist mit mindestens einem Eintrag zu dokumentieren. Das Logbuch dient auch der Selbstkontrolle sowie als Argumentationshilfe zur Bewertung.

---

## Zusätzliche Regel: Automatische Logbucheintragung mit @pause

Mit Verwendung des Befehls `@pause` wird automatisch ein Eintrag mit aktuellem Datum, Bearbeiter/in, bearbeiteten Dateien, Beschreibung und Reflexion angelegt. Gleichzeitig wird der Projektfortschritt aktualisiert.

Dies sichert professionelle Standards und kontinuierliche Nachvollziehbarkeit aller Arbeitsschritte.

---

**Datum:** 2025-10-30  
**Bearbeiter/in:** (bitte ergänzen)  
**Bearbeitete Datei(en):** index.html  
**Kurze Beschreibung des Schrittes:** Die Planung zum Umsetzen und Verschieben der Seitenwechsel-Navigation ins Main wurde reflektiert und als Kommentar im HTML markiert ("<!--Seitenwechsel in Main verschieben!!-->"). Die Dokumentation wurde gemäß der neuen Regel mit @pause aktualisiert.  
**Begründung/Reflexion:** Durch das geplante Verschieben wird die semantische Struktur verbessert und die Barrierefreiheit erhöht. Die kontinuierliche Dokumentation sorgt für professionelle Nachvollziehbarkeit.

---

**Datum:** 2025-10-30  
**Bearbeiter/in:** (bitte ergänzen)  
**Bearbeitete Datei(en):** index.html, detail.html, login.html, Registrierung.html, Kontakt.html, Impressum.html  
**Kurze Beschreibung des Schrittes:** Vollständige HTML-Grundstruktur für alle Seiten erstellt und überprüft. Alle Seiten (index, detail, login, Registrierung, Kontakt, Impressum) sind strukturiert, semantisch korrekt und validiert. Meta-Tags, Labels, Formulare, Barrierefreiheit und Input-Types wurden korrekt implementiert. Vorbereitung für CSS-Styling abgeschlossen.  
**Begründung/Reflexion:** Die Strategie "Struktur vor Styling" hat sich bewährt. Alle HTML-Dateien sind semantisch korrekt, konsistent strukturiert und validiert. Die einheitliche Grundstruktur (Header, Main, Footer) über alle Seiten hinweg erleichtert das spätere CSS-Styling erheblich. Alle Formulare sind barrierefrei mit korrekten Label-Verknüpfungen und required-Attributen. Die Voraussetzungen für das Responsive Web Design sind geschaffen.

---

**Datum:** 2025-11-11  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** main.js, registrierung.html  
**Kurze Beschreibung des Schrittes:** Aufgabe 1 der Übung 4 (Formular-Validierung und Formular-Vorschau) vollständig implementiert. JavaScript-Validierung für alle 7 Formularfelder mit Regex-Patterns, Altersprüfung und Passwort-Validierung. Validierung erfolgt sowohl bei der Eingabe als auch beim Senden des Formulars. Fehlermeldungen werden in roter Schrift angezeigt. Submit-Button wird deaktiviert, wenn das Formular nicht valide ist. Formular-Vorschau implementiert: Input-Felder werden versteckt, Text-Elemente werden erstellt, Passwort-Felder werden entfernt. Code wurde refactored mit Hilfsfunktionen zur Vermeidung von Duplikaten.  
**Begründung/Reflexion:** Die Implementierung erfüllt alle Kernanforderungen der Übung 4, Aufgabe 1. Die Validierungslogik wurde durch Hilfsfunktionen (showError, clearError, validateRegex, validateAge, etc.) strukturiert und wartbar gemacht. Die Vorschau-Funktionalität nutzt DOM-Manipulation wie gefordert. Der Code folgt dem DRY-Prinzip und ist gut lesbar. Zwei kleine Details (Auto-Focus und Button-Text) könnten noch ergänzt werden, sind aber nicht kritisch für die Funktionalität.

---

**Datum:** 2025-11-11  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** docs/helper_2.md, progress/logbuch.md, progress/fortschritt.md  
**Kurze Beschreibung des Schrittes:** Dokumentation erweitert: Neue Helferdatei helper_2.md erstellt, die alle JavaScript-, DOM-, AJAX- und JSON-Konzepte der Übung 4 erklärt. Die Datei folgt der Struktur von HELPER.md und enthält Erklärungen zu DOM-Selektoren, Event-Listenern, DOM-Manipulation, Regex-Patterns, Date-Objekt, String-Methoden, Funktionen, Array-Methoden, Kontrollstrukturen, Variablen, AJAX/Fetch API und Best Practices. Alle Konzepte werden mit Beispielen aus dem Projekt illustriert. Logbuch und Fortschritt für 11.11.2025 aktualisiert.  
**Begründung/Reflexion:** Die helper_2.md dient als Referenzdokumentation für alle in Übung 4 verwendeten JavaScript-Konzepte. Sie unterstützt das Verständnis der Implementierung und dient als Lernhilfe. Die Struktur orientiert sich an HELPER.md für Konsistenz. Die Dokumentation fördert Nachvollziehbarkeit und Professionalität des Projekts.

---

**Datum:** 2025-11-12  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** observations.js, index.html, style.css, main.js, Registrierung.html, progress/fortschritt.md, progress/logbuch.md  
**Kurze Beschreibung des Schrittes:** Übung 4, Aufgabe 2 (AJAX & JSON) vollständig implementiert. Neue Datei observations.js erstellt für AJAX-Funktionalität zum Laden von Naturbeobachtungen von der iNaturalist API. Implementiert: API-Integration mit fetch(), Pagination (immer 6 Beobachtungen), Filterung (nur Beobachtungen mit Bildern), Deduplizierung, Bildbehandlung (square → large), dynamische DOM-Manipulation. Code strukturiert in logische Abschnitte mit JSDoc-Kommentaren. Verbesserungen an Aufgabe 1: Auto-Focus auf erstes Feld beim Laden, Checkbox-Vorschau korrigiert (zeigt "Ja"/"Nein"), Submit-Button initial deaktiviert. Alle Anforderungen der Übung 4 erfüllt.  
**Begründung/Reflexion:** Die Implementierung erfüllt alle Anforderungen der Übung 4. Die Code-Struktur ist klar organisiert und wartbar. Die Verwendung von Hilfsfunktionen und Konstanten folgt Best Practices. Die Filterung und Deduplizierung sorgen für eine gute Benutzererfahrung. Die Fehlerbehandlung ist robust implementiert. Die Dokumentation (helper_2.md) unterstützt das Verständnis der verwendeten Konzepte. Beide Aufgaben (1 und 2) sind vollständig und bereit für die Abgabe.

---

**Datum:** 2025-12-XX  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** index.html, login.html, registrierung.html, kontakt.html, impressum.html, detail.html, style.css, logo.jpg, docs/helper_2.md, progress/fortschritt.md, progress/logbuch.md  
**Kurze Beschreibung des Schrittes:** Finale Optimierungen und Verbesserungen für Übung 3 (Bootstrap Framework). Logo (logo.jpg) auf allen Seiten eingebunden und passend skaliert (max-width: 75px, max-height: 75px). figcaption vom Logo entfernt (redundant, alt-Attribut ausreichend). Style-Code aus allen HTML-Dateien in zentrale style.css extrahiert für bessere Wartbarkeit. JavaScript-Funktion für Bootstrap-Validierung entfernt - native HTML5-Validierung des Browsers reicht aus (erfüllt Anforderung "es genügt zu überprüfen, ob die Pflichtfelder nicht leer sind"). Header-Style von index.html auf alle Seiten übertragen: Logo mit ms-5 (mehr Abstand), Überschrift als display-3 (größer) mit mt-2, Navigation mit h6 (kleinere Schrift), aktive Links markiert. Konsistentes Design auf allen Seiten.  
**Begründung/Reflexion:** Die Optimierungen verbessern die Wartbarkeit (zentrale style.css), reduzieren Code-Duplikate und vereinfachen die Validierung (kein JavaScript nötig). Der einheitliche Header-Style sorgt für professionelles, konsistentes Erscheinungsbild. Die native HTML5-Validierung erfüllt die Anforderungen der Übung und ist einfacher zu warten. Das Projekt ist jetzt vollständig optimiert und bereit für die Abgabe von Übung 3.

---

**Datum:** 2025-12-XX  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** registrierung.html, style.css, index.html, login.html, kontakt.html, impressum.html, detail.html  
**Kurze Beschreibung des Schrittes:** Validierung und Responsive Design korrigiert. Bootstrap-Validierung wieder implementiert: `needs-validation` Klasse, `novalidate` Attribut, `invalid-feedback` Divs für alle required Felder (Name, E-Mail, Geburtsdatum, Passwort, Passwort bestätigen, Datenschutz-Checkbox) und minimales JavaScript für `was-validated` Klasse. Custom CSS für Validierung entfernt - nur Bootstrap's Standard-Validierung verwendet. Responsive Design optimiert: Mobile (unter 415px) mit kleinerem Logo (50px), Tablet (768px-991px) mit angepassten Schriftgrößen (2rem Überschrift, 20px Body-Padding), Desktop (992px-1279px) mit 2.5rem Überschrift und 40px Body-Padding, großer Desktop (ab 1280px) mit 3rem Überschrift und 60px Body-Padding. Checkbox-Farbe und Position korrigiert (form-check Container, grüne Farbe wenn angehakt). Header-Elemente mit mb-0 für besseres responsive Verhalten.  
**Begründung/Reflexion:** Die Bootstrap-Validierung mit `needs-validation` und `invalid-feedback` erfüllt die Anforderung "es genügt zu überprüfen, ob die Pflichtfelder nicht leer sind" und zeigt farbliche Differenzierung durch Bootstrap's Standard-Styles. Das responsive Design wurde für alle Breakpoints optimiert, sodass alle Elemente auf allen Bildschirmgrößen vollständig angezeigt werden. Die schrittweise Anpassung der Schriftgrößen und Abstände sorgt für einen sanften Übergang zwischen den Breakpoints. Das Projekt ist jetzt vollständig responsive und die Validierung funktioniert korrekt.

---

**Datum:** 2025-12-XX  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** index.html, login.html, registrierung.html, kontakt.html, impressum.html, detail.html, observations.js, docs/helper_2.md, docs/HELPER.md, progress/fortschritt.md, progress/logbuch.md  
**Kurze Beschreibung des Schrittes:** Übung 3 (Bootstrap Framework) vollständig implementiert. Bootstrap 5.3.8 über CDN eingebunden. CSS so weit wie möglich durch Bootstrap ersetzt: Grid System für Layout, Flexbox Utilities für Ausrichtung, Spacing Utilities für Abstände, Button-Komponenten, Form-Komponenten, Card-Komponenten für Beobachtungs-Grid, Navbar-Komponenten, Background und Text Utilities, Responsive Utilities. Formular-Validierung mit Bootstrap (needs-validation, invalid-feedback) implementiert. Minimales Custom CSS nur für Typografie, Sticky Footer und spezifische Anforderungen. Alle Seiten (index, login, registrierung, kontakt, impressum, detail) auf Bootstrap umgestellt. Einheitliche Schriftgrößen, Button-Varianten (btn-success für primäre, btn-outline-success für sekundäre Aktionen) und Farben auf allen Seiten. Header und Footer konsistent auf allen Seiten. Sticky Footer implementiert. observations.js angepasst für Bootstrap Card-Struktur. Dokumentation aktualisiert: helper_2.md für Übung 3 (Bootstrap) neu erstellt, HELPER.md gelöscht. Projektprüfung durchgeführt: Alle Anforderungen von Übung 3 erfüllt.  
**Begründung/Reflexion:** Die Implementierung erfüllt alle Anforderungen der Übung 3. CSS wurde so weit wie möglich durch Bootstrap ersetzt. Das responsive Design funktioniert einwandfrei mit Bootstrap Breakpoints. Die Formular-Validierung nutzt Bootstrap's eingebaute Validierung, was den Code vereinfacht. Die einheitliche Gestaltung auf allen Seiten sorgt für ein professionelles Erscheinungsbild. Die Dokumentation (helper_2.md) erklärt alle verwendeten Bootstrap-Konzepte mit Beispielen aus dem Projekt. Das Projekt ist bereit für die Abgabe von Übung 3.

---

**Datum:** 2025-12-11  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** hello-world.js, package.json, webserver.js, index.html, observations.js, docs/helper/helper_5.md, progress/fortschritt.md, progress/logbuch.md  
**Kurze Beschreibung des Schrittes:** Übung 5 (Node.js, npm, http) vollständig implementiert. Node.js Installation getestet mit hello-world.js. package.json erstellt mit time-stamp Modul (Version 2.2.0) als Dependency. Module erfolgreich mit npm install installiert. Node.js Webserver (webserver.js) erstellt mit http Modul. Server läuft auf Port 3000 und empfängt POST-Requests. CORS-Header implementiert für Cross-Origin Requests (Website läuft auf Port 3001, Server auf Port 3000). OPTIONS-Request (Preflight) wird behandelt. POST-Request Daten werden in Chunks empfangen und gesammelt. Daten werden in Dateien mit Zeitstempel gespeichert (Format: export_YYYYMMDDHHmmss.json) mit fs Modul. time-stamp Modul für Zeitstempel-Generierung verwendet (Format: YYYYMMDDHHmmss). Export-Button auf Website hinzugefügt (id="export-button"). Event-Handler mit jQuery implementiert. Daten aus 6 Beobachtungs-Kacheln werden extrahiert (lateinischer Name, Datum, Ort) mit jQuery-Selektoren. JSON-String wird mit JSON.stringify() erstellt (formatiert mit Einrückungen, Parameter: null, 2). POST-Request wird mit jQuery $.ajax() an Server gesendet (URL: http://localhost:3000/export, Content-Type: application/json). Erfolgreiche Dateierstellung mit Fehlerbehandlung (HTTP Status 200/500). Code aufgeräumt und optimiert. Umfassende Dokumentation (helper_5.md) erstellt mit allen Konzepten, Code-Beispielen, häufigen Fehlern und Lösungen.  
**Begründung/Reflexion:** Die Implementierung erfüllt alle Anforderungen der Übung 5. Der Webserver ist robust implementiert mit korrekter Fehlerbehandlung und CORS-Support. Die Client-Seite extrahiert Daten korrekt aus dem DOM und sendet sie als JSON an den Server. Die Verwendung von time-stamp für Zeitstempel-Generierung ist elegant und erfüllt die Anforderung. Die Code-Struktur ist klar und wartbar. Die Dokumentation (helper_5.md) erklärt alle verwendeten Konzepte (Node.js, npm, require(), http, fs, time-stamp, CORS, AJAX, JSON.stringify()) mit Beispielen aus dem Projekt. Das Projekt ist bereit für die Abgabe von Übung 5. Die Implementierung folgt Best Practices und ist professionell dokumentiert.

---

**Datum:** 2025-12-28  
**Bearbeiter/in:** Tobias  
**Bearbeitete Datei(en):** node_modul/package.json, node_modul/models/Observation.js, node_modul/server.js, index.html, modal.js, docs/übungen/übung_6_sequence_diagram.md, docs/übungen/übung_6_mongodb_schema.md, docs/übungen/async_await_flow_diagram.md, docs/übungen/modal_js_flow_diagram.md, progress/fortschritt.md, progress/logbuch.md  
**Kurze Beschreibung des Schrittes:** Übung 6 (Express, MongoDB, Mongoose) in Bearbeitung. MongoDB Community Edition installiert und Service gestartet. Express (^4.18.2) und Mongoose (^8.0.0) zu package.json hinzugefügt und installiert. Mongoose Schema für Observation erstellt (models/Observation.js) mit Feldern: title, latinName, location, date (alle required). Timestamps automatisch aktiviert. Express Server (server.js) erstellt mit Middleware für JSON-Parsing (express.json()) und CORS. MongoDB-Verbindung implementiert (mongodb://localhost:27017/observations). REST API Endpunkte implementiert: POST /observation (erstellt neue Beobachtung), GET /observations (ruft alle Beobachtungen ab), GET /observation/:id (ruft einzelne Beobachtung ab), DELETE /observation/:id (löscht Beobachtung). Alle Endpunkte verwenden async/await für asynchrone Datenbankoperationen. Fehlerbehandlung mit try/catch. HTTP Status Codes korrekt gesetzt. Bootstrap Modal für Beobachtungsformular erstellt (index.html) mit Feldern: Titel, Lateinischer Name, Beobachtungsort, Beobachtungsdatum. Bootstrap JS für Modal-Funktionalität eingebunden. Toggle-Buttons für Wechsel zwischen lokalen und iNaturalist Beobachtungen hinzugefügt. Umfassende Dokumentation erstellt: Sequenzdiagramm für Beobachtungserstellung, MongoDB Schema-Dokumentation, Async/Await Flow-Diagramm, Modal.js Flow-Diagramm (alle in Mermaid-Syntax). modal.js Datei erstellt für Formular-Submission (in Bearbeitung).  
**Begründung/Reflexion:** Die Implementierung folgt den Anforderungen der Übung 6. Express Server ist strukturiert aufgebaut mit korrekter Middleware-Konfiguration. Die REST API Endpunkte entsprechen den Anforderungen (POST, GET all, GET by ID, DELETE). Die Verwendung von async/await macht den Code lesbarer und wartbarer. Das Mongoose Schema ist korrekt definiert mit allen erforderlichen Feldern. Die Frontend-Integration mit Bootstrap Modal ist professionell umgesetzt. Die umfassende Dokumentation mit Mermaid-Diagrammen unterstützt das Verständnis der Implementierung und dient als Lernhilfe. Die Code-Struktur ist klar organisiert und folgt Best Practices. Die Implementierung ist noch nicht vollständig (modal.js JavaScript für Formular-Submission fehlt noch), aber der Großteil der Backend-Funktionalität ist implementiert und getestet.
