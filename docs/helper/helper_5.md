# Helferdatei 5 – Node.js, npm, http (Übung 5)

Diese Datei erklärt alle Node.js-, npm- und http-Konzepte, die in Übung 5 verwendet wurden, um einen Webserver zu erstellen und Daten zu exportieren.

---

## 1. NODE.JS INSTALLATION

### Installation
Node.js kann von der offiziellen Website heruntergeladen werden:
- **URL:** https://nodejs.org/de/download/
- Wähle das Installations-Paket für dein Betriebssystem
- Führe die Installation durch

### Installation testen
Erstelle eine Test-Datei `hello-world.js`:
```javascript
console.log("Hello, World!");
```

Führe das Skript aus:
```bash
node hello-world.js
```

**Erwartete Ausgabe:**
```
Hello, World!
```

### Versionen prüfen
Nach der Installation kannst du die Versionen prüfen:
```bash
node --version
npm --version
```

**npm** (Node Package Manager) wird automatisch mit Node.js installiert.

---

## 2. NPM UND PACKAGE.JSON

### Was ist npm?
**npm** (Node Package Manager) ist ein Paketmanager für Node.js. Er ermöglicht:
- Installation von Modulen/Paketen
- Verwaltung von Abhängigkeiten
- Projekt-Konfiguration

### package.json erstellen
Die `package.json` ist eine Konfigurationsdatei für Node.js-Projekte. Sie enthält:
- Projektname
- Version
- Autor
- Abhängigkeiten (Dependencies)

**Beispiel-Struktur:**
```json
{
    "name": "naturbeobachtungen",
    "version": "1",
    "author": "Dein Name",
    "dependencies": {
        "time-stamp": "2.2.0"
    }
}
```

### Module installieren

**Option 1: Direkte Installation**
```bash
npm install time-stamp
```

**Option 2: Über package.json**
1. Erstelle `package.json` mit den Dependencies
2. Führe aus: `npm install`
3. Alle Module aus `dependencies` werden installiert

**Wichtig:**
- Nach `npm install` wird ein `node_modules` Ordner erstellt
- Dieser Ordner enthält alle installierten Module
- `node_modules` sollte **nicht** in Git hochgeladen werden (zu groß)

---

## 3. NODE.JS MODULE LADEN

### require() Funktion
Mit `require()` werden Module in Node.js geladen:

```javascript
const fs = require("fs");
const http = require("http");
const timestamp = require("time-stamp");
```

**Erklärung:**
- `fs` = File System Modul (für Dateioperationen)
- `http` = HTTP Modul (für Webserver)
- `time-stamp` = Externes Modul (für Zeitstempel)

### Eingebaute Module vs. Externe Module

**Eingebaute Module (Built-in):**
- `fs`, `http`, `path`, `url`, etc.
- Keine Installation nötig
- Direkt mit `require("modulname")` verwendbar

**Externe Module:**
- Müssen mit `npm install` installiert werden
- Werden aus `node_modules` geladen
- Beispiel: `time-stamp`

---

## 4. HTTP MODUL – WEBSERVER ERSTELLEN

### Server erstellen
```javascript
const http = require("http");

const server = http.createServer((request, response) => {
    // Request-Handler
});
```

**Erklärung:**
- `http.createServer()` erstellt einen neuen Webserver
- Callback-Funktion wird bei jedem Request aufgerufen
- `request` = Eingehender Request
- `response` = Ausgehende Response

### Server starten
```javascript
server.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
```

**Erklärung:**
- `listen(port, callback)` startet den Server
- Port 3000 = Portnummer (kann beliebig sein)
- Callback wird ausgeführt, wenn Server bereit ist

### Request-Methode prüfen
```javascript
if (request.method === 'POST') {
    // POST-Request verarbeiten
}
```

**HTTP-Methoden:**
- `GET` = Daten abrufen
- `POST` = Daten senden
- `PUT` = Daten aktualisieren
- `DELETE` = Daten löschen

### URL prüfen
```javascript
if (request.url.includes('/export')) {
    // URL enthält '/export'
}
```

**Alternative:**
```javascript
if (request.url === '/export') {
    // Exakte URL-Übereinstimmung
}
```

---

## 5. POST-REQUEST DATEN EMPFANGEN

### Problem
POST-Daten kommen in "Chunks" (Teilen) an. Sie müssen gesammelt werden.

### Lösung: Event-Handler
```javascript
let data = '';

request.on('data', (chunk) => {
    data += chunk.toString();
});

request.on('end', () => {
    // Alle Daten empfangen, jetzt verarbeiten
    console.log('Empfangene Daten:', data);
});
```

**Erklärung:**
- `'data'` Event: Wird für jeden Chunk aufgerufen
- `chunk` = Buffer-Objekt (muss zu String konvertiert werden)
- `'end'` Event: Wird aufgerufen, wenn alle Daten empfangen wurden
- `data` enthält jetzt alle gesammelten Daten als String

**Wichtig:**
- `chunk.toString()` konvertiert Buffer zu String
- `+=` hängt jeden Chunk an die Variable an

---

## 6. FS MODUL – DATEIEN SCHREIBEN

### Datei schreiben
```javascript
const fs = require("fs");

fs.writeFile(dateiname, daten, (err) => {
    if (err) {
        console.error('Fehler:', err);
    } else {
        console.log('Datei erfolgreich erstellt');
    }
});
```

**Parameter:**
1. `dateiname` = Name der Datei (z.B. "export.json")
2. `daten` = Inhalt der Datei (String)
3. `callback` = Funktion, die nach dem Schreiben aufgerufen wird

**Callback-Parameter:**
- `err` = Error-Objekt (null wenn erfolgreich)

### Fehlerbehandlung
```javascript
fs.writeFile(file, data, (err) => {
    if (err) {
        // Fehler aufgetreten
        console.error('Fehler beim Speichern:', err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Fehler beim Speichern');
    } else {
        // Erfolg
        console.log('Datei erfolgreich erstellt:', file);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Datei erfolgreich erstellt');
    }
});
```

---

## 7. TIME-STAMP MODUL

### Installation
```bash
npm install time-stamp
```

### Verwendung
```javascript
const timestamp = require("time-stamp");

// Standard-Format
timestamp();  // "2025-12-11"

// Benutzerdefiniertes Format
timestamp('YYYYMMDD');  // "20251211"
timestamp('YYYYMMDDHHmmss');  // "20251211143025"
```

### Unterstützte Pattern
- `YYYY` = Jahr (4-stellig, z.B. 2025)
- `MM` = Monat (2-stellig, z.B. 12)
- `DD` = Tag (2-stellig, z.B. 11)
- `HH` = Stunde (2-stellig, z.B. 14)
- `mm` = Minute (2-stellig, z.B. 30)
- `ss` = Sekunde (2-stellig, z.B. 25)

### Beispiel: Dateiname mit Zeitstempel
```javascript
const file = "export_" + timestamp('YYYYMMDDHHmmss') + ".json";
// Ergebnis: "export_20251211143025.json"
```

---

## 8. CORS (CROSS-ORIGIN RESOURCE SHARING)

### Problem
Wenn die Website auf einem anderen Port läuft als der Server (z.B. Website: Port 3001, Server: Port 3000), blockiert der Browser die Requests aus Sicherheitsgründen.

### Lösung: CORS-Header
```javascript
response.setHeader('Access-Control-Allow-Origin', '*');
response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

**Erklärung:**
- `Access-Control-Allow-Origin: *` = Erlaubt Requests von allen Domains
- `Access-Control-Allow-Methods` = Erlaubte HTTP-Methoden
- `Access-Control-Allow-Headers` = Erlaubte Request-Header

### OPTIONS-Request (Preflight)
Browser senden vor POST-Requests einen OPTIONS-Request (Preflight):

```javascript
if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
}
```

**Wichtig:** OPTIONS-Request muss vor POST-Request behandelt werden.

---

## 9. HTTP RESPONSE SENDEN

### Response-Header setzen
```javascript
response.writeHead(200, { 'Content-Type': 'text/plain' });
```

**Parameter:**
1. Status-Code (200 = OK, 404 = Not Found, 500 = Server Error)
2. Header-Objekt (optional)

**Häufige Status-Codes:**
- `200` = OK (Erfolg)
- `404` = Not Found (Ressource nicht gefunden)
- `500` = Internal Server Error (Server-Fehler)

### Response beenden
```javascript
response.end('Nachricht');
```

**Erklärung:**
- Sendet die Response an den Client
- Optional: Nachricht als Parameter

### Vollständiges Beispiel
```javascript
if (err) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Fehler beim Speichern');
} else {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Datei erfolgreich erstellt');
}
```

---

## 10. CLIENT-SEITE: DATEN AUS DOM EXTRAHIEREN

### Cards selektieren
```javascript
const cards = $('.beobachtungen-grid .card');
```

**Erklärung:**
- jQuery-Selektor findet alle Cards
- `.beobachtungen-grid` = Container
- `.card` = Card-Elemente

### Durch Cards iterieren
```javascript
cards.each(function(index, card) {
    const $card = $(card);
    // Daten extrahieren
});
```

**Erklärung:**
- `.each()` iteriert durch alle gefundenen Elemente
- `index` = Index des Elements
- `card` = DOM-Element (muss zu jQuery-Objekt konvertiert werden)
- `$card = $(card)` = jQuery-Objekt erstellen

### Daten aus Card extrahieren
```javascript
const $card = $(card);
const observationEntry = {
    name: $card.find('#latinName').text(),
    datum: $card.find('#observationDate').text(),
    ort: $card.find('#location').text()
};
```

**Erklärung:**
- `$card.find('#latinName')` = Findet Element mit ID innerhalb der Card
- `.text()` = Extrahiert Text-Inhalt
- Wichtig: `find()` sucht innerhalb der Card, nicht global

### Array aufbauen
```javascript
let exportData = [];

cards.each(function(index, card) {
    const $card = $(card);
    const observationEntry = {
        name: $card.find('#latinName').text(),
        datum: $card.find('#observationDate').text(),
        ort: $card.find('#location').text()
    };
    exportData.push(observationEntry);
});
```

**Erklärung:**
- `exportData = []` = Leeres Array erstellen
- `exportData.push(observationEntry)` = Objekt zum Array hinzufügen

---

## 11. JSON.STRINGIFY()

### JSON-String erstellen
```javascript
const jsonData = JSON.stringify(exportData);
```

**Erklärung:**
- Konvertiert JavaScript-Objekt/Array zu JSON-String
- Wird benötigt, um Daten per HTTP zu senden

### Formatierte Ausgabe
```javascript
const jsonData = JSON.stringify(exportData, null, 2);
```

**Parameter:**
1. `exportData` = Zu konvertierendes Objekt/Array
2. `null` = Replacer-Funktion (nicht benötigt)
3. `2` = Anzahl Leerzeichen pro Einrückungsebene

**Ergebnis:**
```json
[
  {
    "name": "Scymnus frontalis",
    "datum": "30.10.2025",
    "ort": ""
  }
]
```

**Ohne Formatierung:**
```json
[{"name":"Scymnus frontalis","datum":"30.10.2025","ort":""}]
```

---

## 12. AJAX POST-REQUEST VON CLIENT

### jQuery $.ajax()
```javascript
$.ajax({
    url: 'http://localhost:3000/export',
    type: 'POST',
    contentType: 'application/json',
    data: jsonData,
    success: function(response) {
        console.log('Export erfolgreich:', response);
    },
    error: function(xhr, status, error) {
        console.error('Fehler beim Export:', error);
    }
});
```

**Parameter:**
- `url` = Server-URL
- `type` = HTTP-Methode ('POST')
- `contentType` = Art der gesendeten Daten ('application/json')
- `data` = Zu sendende Daten (JSON-String)
- `success` = Callback bei Erfolg
- `error` = Callback bei Fehler

**Alternative: fetch() API (Vanilla JavaScript)**
```javascript
fetch('http://localhost:3000/export', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: jsonData
})
.then(response => response.text())
.then(data => console.log('Erfolg:', data))
.catch(error => console.error('Fehler:', error));
```

---

## 13. VOLLSTÄNDIGES BEISPIEL: WEBSERVER

```javascript
const fs = require("fs");
const http = require("http");
const timestamp = require("time-stamp");

const server = http.createServer((request, response) => {
    // CORS-Header setzen
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS-Request behandeln (Preflight)
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    // POST-Request für Export verarbeiten
    if (request.method === 'POST' && request.url.includes('/export')) {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });
        request.on('end', () => {
            const file = "export_" + timestamp('YYYYMMDDHHmmss') + ".json";
            fs.writeFile(file, data, 
                (err) => {
                    if (err) {
                        console.error('Fehler beim Speichern:', err);
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Fehler beim Speichern');
                    } else {
                        console.log('Datei erfolgreich erstellt:', file);
                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Datei erfolgreich erstellt');
                    }
                });
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
```

---

## 14. VOLLSTÄNDIGES BEISPIEL: CLIENT-EXPORT

```javascript
$('#export-button').on('click', function() {
    let exportData = [];
    const cards = $('.beobachtungen-grid .card');
    
    cards.each(function(index, card) {
        const $card = $(card);
        const observationEntry = {
            name: $card.find('#latinName').text(),
            datum: $card.find('#observationDate').text(),
            ort: $card.find('#location').text()
        };
        exportData.push(observationEntry);
    });
    
    // JSON-String erstellen und an Server senden
    const jsonData = JSON.stringify(exportData, null, 2);
    $.ajax({
        url: 'http://localhost:3000/export',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        success: function(response) {
            console.log('Export erfolgreich:', response);
        },
        error: function(xhr, status, error) {
            console.error('Fehler beim Export:', error);
        }
    });
});
```

---

## 15. HÄUFIGE FEHLER UND LÖSUNGEN

### Fehler: "Cannot find module 'time-stamp'"
**Lösung:** Module installieren
```bash
npm install
```

### Fehler: "Port 3000 already in use"
**Lösung:** Anderen Port verwenden oder anderen Prozess beenden
```javascript
server.listen(3001, () => {
    console.log('Server läuft auf Port 3001');
});
```

### Fehler: CORS-Fehler im Browser
**Lösung:** CORS-Header im Server hinzufügen
```javascript
response.setHeader('Access-Control-Allow-Origin', '*');
```

### Fehler: "Cannot read property 'text' of undefined"
**Lösung:** Prüfen, ob Element existiert
```javascript
const element = $card.find('#latinName');
if (element.length > 0) {
    const text = element.text();
}
```

### Fehler: Daten werden nicht empfangen
**Lösung:** Prüfen, ob Request-Events korrekt implementiert sind
```javascript
request.on('data', (chunk) => {
    data += chunk.toString();
});
```

---

## 16. ZUSAMMENFASSUNG

### Server-Seite (Node.js)
1. Module laden: `require()`
2. Server erstellen: `http.createServer()`
3. CORS-Header setzen
4. POST-Request erkennen
5. Daten sammeln: `request.on('data')`
6. Daten verarbeiten: `request.on('end')`
7. Datei schreiben: `fs.writeFile()`
8. Response senden: `response.writeHead()` + `response.end()`

### Client-Seite (JavaScript)
1. Event-Handler: Button-Klick
2. Cards selektieren: jQuery-Selektor
3. Daten extrahieren: `.find()` + `.text()`
4. Array aufbauen: `.push()`
5. JSON erstellen: `JSON.stringify()`
6. POST-Request senden: `$.ajax()`

### Wichtige Konzepte
- **Node.js** = JavaScript-Laufzeitumgebung für Server
- **npm** = Paketmanager für Node.js
- **package.json** = Projekt-Konfiguration
- **require()** = Module laden
- **http.createServer()** = Webserver erstellen
- **request.on()** = Event-Handler für Requests
- **fs.writeFile()** = Dateien schreiben
- **CORS** = Cross-Origin Resource Sharing
- **JSON.stringify()** = Objekt zu JSON-String
- **$.ajax()** = AJAX-Request senden

---

## 17. NÜTZLICHE BEFEHLE

### Node.js Server starten
```bash
node webserver.js
```

### Server stoppen
```bash
Ctrl + C
```

### Module installieren
```bash
npm install modulname
npm install  # Installiert alle Module aus package.json
```

### Versionen prüfen
```bash
node --version
npm --version
```

### package.json erstellen
```bash
npm init
```
(Führt durch interaktiven Prozess)

---

**Ende der Helferdatei 5**
