# Übung 5 – Zusammenfassung & Vorgehensweise

## Präsentationszusammenfassung: Node.js, npm, http

---

## 1. AUFGABENSTELLUNG

### Ziel
- Node.js und npm für Web-Anwendung einsetzen
- Webserver mit http Modul programmieren
- Export-Funktionalität für Beobachtungsdaten implementieren

### Aufgaben
1. **Node.js Installation testen**
2. **npm & package.json erstellen** (time-stamp Modul)
3. **Webserver programmieren** (POST-Requests, Datei-Speicherung)
4. **Export-Button auf Website** (Daten sammeln, JSON erstellen, senden)

---

## 2. VORGEWHENSWEISE

### Schritt 1: Node.js Installation
- ✅ Node.js von nodejs.org heruntergeladen und installiert
- ✅ Installation getestet mit `hello-world.js`
- ✅ Versionen verifiziert: `node --version` und `npm --version`

### Schritt 2: npm & package.json
- ✅ `package.json` erstellt mit:
  - Projektname: "naturbeobachtungen"
  - Version: "1"
  - Autor
  - Dependencies: `time-stamp` Version 2.2.0
- ✅ Module installiert: `npm install`
- ✅ `node_modules` Ordner erstellt (nicht in Git hochgeladen)

### Schritt 3: Webserver implementieren
- ✅ Neue Datei: `webserver.js`
- ✅ Module geladen:
  - `fs` (File System)
  - `http` (Webserver)
  - `time-stamp` (Zeitstempel)
- ✅ Server erstellt: `http.createServer()`
- ✅ CORS-Header hinzugefügt (Cross-Origin Support)
- ✅ OPTIONS-Request behandelt (Preflight)
- ✅ POST-Request erkannt: `request.method === 'POST'`
- ✅ URL geprüft: `request.url.includes('/export')`
- ✅ Daten empfangen: `request.on('data')` und `request.on('end')`
- ✅ Dateiname generiert: `export_YYYYMMDDHHmmss.json`
- ✅ Datei geschrieben: `fs.writeFile()`
- ✅ Response gesendet: HTTP Status 200/500

### Schritt 4: Client-Seite (Export-Button)
- ✅ Button in `index.html` hinzugefügt: `id="export-button"`
- ✅ Event-Handler in `observations.js` implementiert
- ✅ Cards selektiert: `$('.beobachtungen-grid .card')`
- ✅ Daten extrahiert:
  - Lateinischer Name: `$card.find('#latinName').text()`
  - Datum: `$card.find('#observationDate').text()`
  - Ort: `$card.find('#location').text()`
- ✅ Array aufgebaut: `exportData.push(observationEntry)`
- ✅ JSON erstellt: `JSON.stringify(exportData, null, 2)`
- ✅ POST-Request gesendet: `$.ajax()` an `http://localhost:3000/export`
- ✅ Success/Error-Handler implementiert

---

## 3. TECHNISCHE UMSETZUNG

### Server-Seite (Node.js)
```javascript
// Module laden
const fs = require("fs");
const http = require("http");
const timestamp = require("time-stamp");

// Server erstellen
const server = http.createServer((request, response) => {
    // CORS-Header
    // POST-Request verarbeiten
    // Daten sammeln
    // Datei schreiben
});

// Server starten
server.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
```

### Client-Seite (JavaScript)
```javascript
// Export-Button Event-Handler
$('#export-button').on('click', function() {
    // Cards selektieren
    // Daten extrahieren
    // JSON erstellen
    // POST-Request senden
});
```

---

## 4. WICHTIGE KONZEPTE

### Node.js Module
- **require()**: Module laden
- **fs**: Dateioperationen
- **http**: Webserver-Funktionalität

### HTTP-Requests
- **POST**: Daten senden
- **OPTIONS**: Preflight-Request (CORS)
- **Request-Events**: 'data' und 'end'

### CORS (Cross-Origin Resource Sharing)
- Problem: Website (Port 3001) ↔ Server (Port 3000)
- Lösung: CORS-Header setzen
- `Access-Control-Allow-Origin: *`

### JSON & Datenübertragung
- **JSON.stringify()**: Objekt → JSON-String
- **Content-Type**: `application/json`
- **AJAX**: Asynchroner Request

---

## 5. ERGEBNISSE

### Funktionalität
- ✅ Webserver läuft auf Port 3000
- ✅ Export-Button funktioniert
- ✅ Daten werden aus 6 Kacheln extrahiert
- ✅ JSON-Dateien werden erstellt
- ✅ Dateiname enthält Zeitstempel
- ✅ Format: `export_YYYYMMDDHHmmss.json`

### Dateistruktur
```json
[
  {
    "name": "Scymnus frontalis",
    "datum": "30.10.2025",
    "ort": ""
  },
  {
    "name": "Junco hyemalis",
    "datum": "11.12.2025",
    "ort": "Springettsbury Township, PA, USA"
  }
]
```

### Erstellte Dateien
- ✅ `webserver.js` (Node.js Server)
- ✅ `package.json` (Projekt-Konfiguration)
- ✅ `hello-world.js` (Test-Skript)
- ✅ Export-Dateien: `export_*.json`

---

## 6. HERAUSFORDERUNGEN & LÖSUNGEN

### Challenge 1: CORS-Fehler
- **Problem**: Browser blockiert Requests zwischen verschiedenen Ports
- **Lösung**: CORS-Header im Server hinzugefügt
- **Code**: `response.setHeader('Access-Control-Allow-Origin', '*')`

### Challenge 2: POST-Daten empfangen
- **Problem**: Daten kommen in Chunks an
- **Lösung**: Event-Handler `request.on('data')` und `request.on('end')`
- **Code**: Daten sammeln mit `data += chunk.toString()`

### Challenge 3: Daten aus DOM extrahieren
- **Problem**: Daten aus Cards extrahieren
- **Lösung**: jQuery-Selektoren innerhalb jeder Card
- **Code**: `$card.find('#latinName').text()`

### Challenge 4: Zeitstempel-Format
- **Problem**: Dateiname mit Zeitstempel generieren
- **Lösung**: `time-stamp` Modul mit Format-String
- **Code**: `timestamp('YYYYMMDDHHmmss')`

---

## 7. CODE-QUALITÄT

### Best Practices
- ✅ Code strukturiert und kommentiert
- ✅ Fehlerbehandlung implementiert
- ✅ Konsistente Formatierung
- ✅ Wartbarer Code

### Optimierungen
- ✅ CORS-Header für Cross-Origin Support
- ✅ JSON-Formatierung (lesbar)
- ✅ Error-Handling (Server & Client)
- ✅ Console-Logs für Debugging

---

## 8. DOKUMENTATION

### Erstellt
- ✅ `helper_5.md`: Umfassende Referenzdokumentation
  - Node.js Grundlagen
  - npm & package.json
  - http Modul
  - fs Modul
  - time-stamp Modul
  - CORS
  - AJAX POST-Requests
  - Code-Beispiele
  - Häufige Fehler & Lösungen

### Aktualisiert
- ✅ `progress/fortschritt.md`: Meilensteine dokumentiert
- ✅ `progress/logbuch.md`: Arbeitsschritte dokumentiert

---

## 9. TESTING

### Getestet
- ✅ Node.js Installation
- ✅ Server startet korrekt
- ✅ POST-Requests werden empfangen
- ✅ Dateien werden erstellt
- ✅ JSON-Format ist korrekt
- ✅ Export-Button funktioniert
- ✅ CORS funktioniert (verschiedene Ports)

### Test-Szenarien
1. Server starten: `node webserver.js`
2. Website öffnen (Port 3001)
3. Export-Button klicken
4. Datei prüfen: `export_*.json` im Projektverzeichnis
5. JSON-Inhalt validieren

---

## 10. ZUSAMMENFASSUNG

### Was wurde erreicht?
- ✅ Node.js Umgebung eingerichtet
- ✅ npm & package.json konfiguriert
- ✅ Webserver programmiert
- ✅ Export-Funktionalität implementiert
- ✅ Daten werden erfolgreich exportiert
- ✅ Professionelle Dokumentation erstellt

### Technologien
- **Node.js**: Server-Laufzeitumgebung
- **npm**: Paketmanager
- **http**: Webserver-Modul
- **fs**: Dateioperationen
- **time-stamp**: Zeitstempel-Generierung
- **jQuery**: Client-seitige DOM-Manipulation
- **AJAX**: Asynchroner Datenversand

### Nächste Schritte
- Weitere Features können hinzugefügt werden
- Server kann erweitert werden (z.B. GET-Requests)
- Export-Format kann angepasst werden
- Fehlerbehandlung kann verbessert werden

---

**Erstellt:** 2025-12-11  
**Bearbeiter:** Tobias  
**Status:** Abgeschlossen ✅
