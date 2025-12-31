# Fortschritt & Zeitplan – Naturbeobachtungs-Portal

Dieses Dokument hält den aktuellen Fortschritt, Meilensteine sowie den weiteren Zeitplan für die fortlaufende Entwicklung der Übungs-Website fest.

---

## Status
- **Website ist in der ersten Ausbaustufe (Programmieraufgabe 1) und wird laufend weiterentwickelt.**
- **Ziel:** Professionelles, responsives HTML-/CSS-Mockup nach Anforderung und Cursor-Prinzip (keine direkt vorgegebenen Lösungen, lern- und übungsorientiert)
- **Weitere Features & Funktionalitäten werden in zukünftigen Übungsaufgaben ergänzt!**

---

## Zeitplan & Fristen

| Datum       | Thema                                                    |
|-------------|----------------------------------------------------------|
| 06.11.2025  | Inhalte der 2. Übungsaufgabe, Abnahme der 1. Übungsaufgabe |
| 20.11.2025  | Inhalte der 3. Übungsaufgabe, Abnahme der 2. Übungsaufgabe |
| 27.11.2025  | Inhalte der 4. Übungsaufgabe                               |
| 11.12.2025  | Inhalte der 5. Übungsaufgabe, Abnahme der 3. u. 4. Aufgabe |
| 08.01.2026  | Inhalte der 6. Übungsaufgabe, Abnahme der 5. Übungsaufgabe |
| 22.01.2026  | Inhalte der 7. Übungsaufgabe, Abnahme der 6. Übungsaufgabe |
| 29.01.2026  | Abnahme der 7. Übungsaufgabe                               |

---

## Bisherige Entwicklung (Dokumentation/Meilensteine)

- [x] **HTML-Grundstruktur abgeschlossen:** Alle Seiten (index.html, detail.html, login.html, Registrierung.html, Kontakt.html, Impressum.html) sind strukturell und semantisch vollständig. Meta-Tags, Formulare, Barrierefreiheit, Input-Types und Labels korrekt implementiert. – _Abgeschlossen: 2025-10-30_
- [ ] **CSS-Styling:** Responsive Web Design (RWD) und visuelle Gestaltung gemäß Mockup – _In Planung_
- [x] **Übung 4 - Aufgabe 1 (Formular-Validierung & Vorschau):** JavaScript-Validierung für Registrierungsformular implementiert. Alle 7 Felder werden validiert (Name, E-Mail, Telefon, Geburtstag, URL, Passwort, Passwort-Bestätigung). Validierung bei Eingabe und beim Senden. Fehlermeldungen in roter Schrift. Submit-Button wird deaktiviert bei ungültigen Daten. Formular-Vorschau mit DOM-Manipulation implementiert. Code refactored mit Hilfsfunktionen. Auto-Focus auf erstes Feld beim Laden. Checkbox-Vorschau korrigiert (zeigt "Ja"/"Nein" statt "on"). – _Abgeschlossen: 2025-12-XX_
- [x] **Übung 4 - Aufgabe 2 (AJAX & JSON):** AJAX-basierte Web-Anwendung zum Laden von Naturbeobachtungen von der iNaturalist API implementiert. Beobachtungen werden in Dreierreihen dargestellt, immer 6 Beobachtungen gleichzeitig sichtbar. Lateinischer Name und Datum werden angezeigt. Button zum Laden weiterer Beobachtungen mit Pagination. Bilder in voller Größe (square → large). Filterung: Nur Beobachtungen mit Bildern werden angezeigt. Deduplizierung verhindert doppelte Anzeige. Code strukturiert und dokumentiert. – _Abgeschlossen: 2025-12-XX_
- [x] **Dokumentation - helper_2.md (Übung 4):** Umfassende Referenzdokumentation für JavaScript, DOM, AJAX und JSON erstellt. Erklärt alle in Übung 4 verwendeten Konzepte mit Beispielen aus dem Projekt. – _Abgeschlossen: 2025-11-11_
- [x] **Übung 3 - Bootstrap Framework:** Vollständige Umstellung auf Bootstrap 5.3.8. CSS so weit wie möglich durch Bootstrap ersetzt (Grid System, Flexbox Utilities, Spacing, Buttons, Forms, Cards, Navbar). Responsive Web Design mit Bootstrap umgesetzt für alle Breakpoints (Mobile <415px, Tablet 768px-991px, Desktop 992px-1279px, großer Desktop ab 1280px). Formular-Validierung mit Bootstrap's `needs-validation` und `invalid-feedback` implementiert - prüft nur ob Pflichtfelder (mit *) nicht leer sind. Minimales Custom CSS in zentrale style.css extrahiert (Typografie, Sticky Footer, Logo-Sizing, responsive Abstände, Checkbox-Styling). Einheitliche Schriftgrößen, Button-Varianten und Farben auf allen Seiten. Header und Footer konsistent auf allen Seiten mit einheitlichem Style (display-3 Überschrift, h6 Navigation, Logo mit ms-2 ms-md-5). Logo (logo.jpg) auf allen Seiten eingebunden. Sticky Footer implementiert. Responsive Design optimiert für alle Bildschirmgrößen. – _Abgeschlossen: 2025-12-XX_
- [x] **Dokumentation - helper_2.md (Übung 3):** Umfassende Referenzdokumentation für Bootstrap Framework erstellt. Erklärt alle verwendeten Bootstrap-Komponenten, Utility-Klassen und Best Practices mit Beispielen aus dem Projekt. – _Abgeschlossen: 2025-12-XX_
- [x] **Abgabe Aufgabe 1:** HTML-/CSS-Mockup (ohne PHP-Logik, mit RWD und mindestens 30 Elementen) – _Abgabetermin: 06.11.2025_
- [ ] **Abgabe Aufgabe 2:** ...
- [x] **Abgabe Aufgabe 3:** Bootstrap Framework – _Abgabetermin: 11.12.2025_ – _Abgeschlossen: 2025-12-XX_
- [x] **Abgabe Aufgabe 4:** JavaScript, DOM, AJAX, JSON – _Abgabetermin: 11.12.2025_ – _Abgeschlossen: 2025-12-XX_
- [x] **Übung 4 (jQuery & Leaflet) - Aufgabe 1 (Sidebar mit jQuery):** Sidebar-Funktionalität mit jQuery implementiert. Button zum Ein-/Ausblenden der Sidebar. Sidebar nimmt 1/3 der Seite ein und ist standardmäßig ausgeblendet. Beim Öffnen werden Beobachtungs-Karten von 3 Spalten (col-lg-4) auf 2 Spalten (col-lg-6) reduziert. Grid-Container passt sich dynamisch an (col-md-12 ↔ col-md-8). jQuery wird für DOM-Manipulation und Event-Handling verwendet. Responsive Design beibehalten. – _Abgeschlossen: 2025-12-XX_
- [x] **Übung 4 (jQuery & Leaflet) - Aufgabe 2 (Leaflet-Karte):** Leaflet-Karte in Sidebar integriert. OpenStreetMap Tiles werden geladen. Marker werden für jede Beobachtung mit Geo-Daten erstellt. Pop-ups zeigen lateinischen Namen, englischen Namen (falls vorhanden), Datum und Ort (nur lateinische Zeichen). Marker werden automatisch aktualisiert wenn neue Beobachtungen geladen werden. Karte wird lazy-initialisiert wenn Sidebar geöffnet wird. Map-Größe wird korrekt berechnet mit invalidateSize(). – _Abgeschlossen: 2025-12-XX_
- [x] **Übung 5 - Aufgabe 1 (Node.js Installation):** Node.js Umgebung installiert und getestet. Test-Skript hello-world.js erstellt und erfolgreich ausgeführt. Node.js und npm Versionen verifiziert. – _Abgeschlossen: 2025-12-11_
- [x] **Übung 5 - Aufgabe 2 (npm & package.json):** package.json erstellt mit Projektname, Version, Autor und Dependencies. time-stamp Modul (Version 2.2.0) als Dependency hinzugefügt. Module erfolgreich mit npm install installiert. node_modules Ordner erstellt. – _Abgeschlossen: 2025-12-11_
- [x] **Übung 5 - Aufgabe 3 (Webserver & Export):** Node.js Webserver mit http Modul erstellt (webserver.js). Server läuft auf Port 3000. POST-Requests werden empfangen und verarbeitet. CORS-Header implementiert für Cross-Origin Requests. OPTIONS-Request (Preflight) wird behandelt. Daten werden in Dateien mit Zeitstempel gespeichert (Format: export_YYYYMMDDHHmmss.json). fs Modul für Dateioperationen verwendet. time-stamp Modul für Zeitstempel-Generierung verwendet. Export-Button auf Website hinzugefügt (index.html). Daten aus 6 Beobachtungs-Kacheln werden extrahiert (lateinischer Name, Datum, Ort). JSON-String wird mit JSON.stringify() erstellt (formatiert mit Einrückungen). POST-Request wird mit jQuery $.ajax() an Server gesendet. Erfolgreiche Dateierstellung mit Fehlerbehandlung. – _Abgeschlossen: 2025-12-11_
- [x] **Dokumentation - helper_5.md (Übung 5):** Umfassende Referenzdokumentation für Node.js, npm, http, fs, time-stamp, CORS, AJAX POST-Requests und JSON.stringify() erstellt. Erklärt alle in Übung 5 verwendeten Konzepte mit Beispielen aus dem Projekt. Enthält vollständige Code-Beispiele, häufige Fehler und Lösungen, sowie nützliche Befehle. – _Abgeschlossen: 2025-12-11_
- [x] **Abgabe Aufgabe 5:** Node.js, npm, http – _Abgabetermin: 08.01.2026_ – _Abgeschlossen: 2025-12-11_
- [x] **Übung 6 - Aufgabe 1 (Express Server Setup):** Express und Mongoose in package.json hinzugefügt und installiert. MongoDB Community Edition installiert und Service gestartet. Express Server (server.js) erstellt mit Middleware für JSON-Parsing und CORS. MongoDB-Verbindung mit Mongoose implementiert (mongodb://localhost:27017/observations). REST API Endpunkte implementiert: POST /observation (neue Beobachtung erstellen), GET /observations (alle Beobachtungen abrufen), GET /observation/:id (einzelne Beobachtung abrufen), DELETE /observation/:id (Beobachtung löschen). Alle Endpunkte verwenden async/await für asynchrone Datenbankoperationen. Fehlerbehandlung mit try/catch implementiert. HTTP Status Codes korrekt gesetzt (201 Created, 404 Not Found, 500 Internal Server Error). – _In Bearbeitung: 2025-12-28_
- [x] **Übung 6 - Aufgabe 2 (Mongoose Model):** Mongoose Schema für Observation erstellt (models/Observation.js). Schema enthält: title (String, required, trim), latinName (String, required, trim), location (String, required, trim), date (Date, required). Timestamps automatisch aktiviert (createdAt, updatedAt). Model exportiert für Verwendung in Server. Schema-Dokumentation erstellt (docs/übungen/übung_6_mongodb_schema.md). – _In Bearbeitung: 2025-12-28_
- [x] **Übung 6 - Frontend (Bootstrap Modal & Form):** Bootstrap Modal für Beobachtungsformular erstellt (index.html). Modal enthält Formular mit Feldern: Titel, Lateinischer Name, Beobachtungsort, Beobachtungsdatum. Bootstrap JS für Modal-Funktionalität eingebunden. Button "Beobachtung hinzufügen" öffnet Modal. Formular-Validierung mit HTML5 required Attributen. Toggle-Buttons für Wechsel zwischen lokalen und iNaturalist Beobachtungen hinzugefügt. Modal-Struktur korrekt implementiert (modal-header, modal-body, modal-footer). – _In Bearbeitung: 2025-12-28_
- [ ] **Übung 6 - Frontend (JavaScript Form Submission):** JavaScript für Formular-Submission in modal.js implementiert. Event Listener für "Beobachtung hinzufügen" Button. Form-Validierung mit checkValidity(). Daten-Sammlung aus Formularfeldern. AJAX POST-Request an Express Server (http://localhost:3000/observation). Erfolgs- und Fehlerbehandlung. Modal schließen und Formular zurücksetzen nach erfolgreichem Submit. – _In Bearbeitung: 2025-12-28_
- [x] **Dokumentation - Übung 6:** Sequenzdiagramm für Beobachtungserstellung erstellt (übung_6_sequence_diagram.md). MongoDB Schema-Dokumentation erstellt (übung_6_mongodb_schema.md). Async/Await Flow-Diagramm erstellt (async_await_flow_diagram.md). Modal.js Flow-Diagramm erstellt (modal_js_flow_diagram.md). Alle Diagramme in Mermaid-Syntax. – _In Bearbeitung: 2025-12-28_
- [ ] **Abgabe Aufgabe 6:** Express, MongoDB, Mongoose – _Abgabetermin: 22.01.2026_ – _In Bearbeitung_

(Alle weiteren Meilensteine werden nach Erledigung/durchgeführtem Review ergänzt und mit Datum sowie kurzer Beschreibung versehen)

---

**Hinweis:** Die Dokumentation des Fortschritts wird nach jeder Entwicklungsphase oder bei wichtigen Änderungen aktualisiert. Das fördert Transparenz und Nachvollziehbarkeit im gesamten Entwicklungsprozess.
