# Übung 4 – Zusammenfassung & Vorgehensweise

## Präsentationszusammenfassung: jQuery & Leaflet

---

## 1. AUFGABENSTELLUNG

### Ziel
- jQuery für DOM-Manipulation einsetzen
- Leaflet für Geo-Daten-Visualisierung verwenden
- Sidebar mit Karte implementieren

### Aufgaben
1. **Sidebar mit jQuery ein-/ausblenden**
   - Button zum Toggle
   - Dynamische Anpassung der Spaltenbreiten
   - Responsive Design beibehalten

2. **Leaflet-Karte in Sidebar**
   - OpenStreetMap Tiles laden
   - Marker für Beobachtungen platzieren
   - Pop-ups mit Informationen anzeigen
   - Marker bei neuen Beobachtungen aktualisieren

---

## 2. VORGEWHENSWEISE

### Schritt 1: jQuery einbinden
- ✅ jQuery 3.7.1 über CDN eingebunden
- ✅ Subresource Integrity (SRI) für Sicherheit
- ✅ Vor Leaflet geladen (Abhängigkeit)

### Schritt 2: Sidebar-Struktur (HTML)
- ✅ Sidebar-Container in `index.html` hinzugefügt
- ✅ Bootstrap Grid-System verwendet
- ✅ Sidebar: `col-md-4` (1/3 Breite)
- ✅ Beobachtungs-Container: `col-md-8` (2/3 Breite) oder `col-md-12` (volle Breite)
- ✅ Sidebar standardmäßig ausgeblendet: `d-none` Klasse

### Schritt 3: Sidebar-Funktionalität (jQuery)
- ✅ Neue Datei: `sidebar.js`
- ✅ Button selektiert: `$('#toggle-sidebar')`
- ✅ Event-Handler: `.on('click')`
- ✅ Sidebar ein-/ausblenden: `.addClass('d-none')` / `.removeClass('d-none')`
- ✅ Container-Breite anpassen: `.removeClass()` / `.addClass()`
- ✅ Karten-Spalten anpassen: `updateCardColumns()` Funktion
- ✅ Button-Text ändern: `.text()`
- ✅ State-Variable: `sidebarVisible`

### Schritt 4: Leaflet einbinden
- ✅ Leaflet CSS über CDN eingebunden
- ✅ Leaflet JS über CDN eingebunden
- ✅ Subresource Integrity (SRI) für Sicherheit
- ✅ Nach jQuery geladen

### Schritt 5: Karten-Implementierung
- ✅ Neue Datei: `map.js`
- ✅ Karte initialisieren: `L.map('map')`
- ✅ OpenStreetMap Tiles: `L.tileLayer()`
- ✅ Marker-Gruppe: `L.layerGroup()`
- ✅ Marker erstellen: `L.marker([lat, lng])`
- ✅ Pop-ups: `.bindPopup()`
- ✅ Karten-Größe: `.invalidateSize()`

### Schritt 6: Lazy Initialization
- ✅ Karte wird erst initialisiert, wenn Sidebar geöffnet wird
- ✅ `ensureMapInitialized()` Funktion
- ✅ Sichtbarkeitsprüfung vor Initialisierung
- ✅ Mehrfache `invalidateSize()` Aufrufe für korrekte Größenberechnung

---

## 3. TECHNISCHE UMSETZUNG

### jQuery – Sidebar Toggle
```javascript
$('#toggle-sidebar').on('click', function() {
    if (sidebarVisible) {
        // Sidebar ausblenden
        $sidebar.addClass('d-none');
        $observationsContainer.removeClass('col-md-8').addClass('col-md-12');
        updateCardColumns('col-lg-6', 'col-lg-4');
    } else {
        // Sidebar einblenden
        $sidebar.removeClass('d-none');
        $observationsContainer.removeClass('col-md-12').addClass('col-md-8');
        updateCardColumns('col-lg-4', 'col-lg-6');
        ensureMapInitialized();
    }
});
```

### Leaflet – Karte initialisieren
```javascript
window.map = L.map('map', {
    preferCanvas: false
}).setView([51.505, -0.09], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(window.map);
```

### Leaflet – Marker hinzufügen
```javascript
const marker = L.marker([lat, lng]);
marker.bindPopup(popupContent);
marker.addTo(window.markers);
```

---

## 4. WICHTIGE KONZEPTE

### jQuery
- **Selektoren**: `$('#id')`, `$('.class')`
- **DOM-Manipulation**: `.addClass()`, `.removeClass()`, `.text()`
- **Event-Handling**: `.on('click')`
- **Document Ready**: `$(document).ready()`

### Leaflet
- **Karte erstellen**: `L.map()`
- **Tile Layer**: `L.tileLayer()` (OpenStreetMap)
- **Marker**: `L.marker([lat, lng])`
- **Pop-ups**: `.bindPopup()`
- **Layer Group**: `L.layerGroup()` (Marker-Verwaltung)
- **Karten-Größe**: `.invalidateSize()` (wichtig bei dynamischen Größen)

### Bootstrap Grid
- **Responsive Spalten**: `col-md-4`, `col-md-8`, `col-md-12`
- **Karten-Spalten**: `col-lg-4` (3 Spalten), `col-lg-6` (2 Spalten)
- **Visibility**: `d-none` (ausblenden)

---

## 5. ERGEBNISSE

### Funktionalität
- ✅ Sidebar kann ein-/ausgeblendet werden
- ✅ Button-Text ändert sich dynamisch
- ✅ Spaltenbreiten passen sich an
- ✅ Karte wird in Sidebar angezeigt
- ✅ Marker werden für alle Beobachtungen erstellt
- ✅ Pop-ups zeigen Informationen
- ✅ Marker werden bei neuen Beobachtungen aktualisiert
- ✅ Karte wird lazy initialisiert

### Layout-Verhalten
**Sidebar geschlossen:**
- Beobachtungs-Container: `col-md-12` (volle Breite)
- Karten: `col-lg-4` (3 Spalten nebeneinander)

**Sidebar geöffnet:**
- Sidebar: `col-md-4` (1/3 Breite)
- Beobachtungs-Container: `col-md-8` (2/3 Breite)
- Karten: `col-lg-6` (2 Spalten nebeneinander)

### Pop-up Inhalt
- Lateinischer Name (immer)
- Englischer Name (falls vorhanden)
- Beobachtungsdatum
- Ort (nur lateinische Zeichen)

---

## 6. HERAUSFORDERUNGEN & LÖSUNGEN

### Challenge 1: Karten-Größe berechnen
- **Problem**: Karte hat Größe 0x0 wenn Sidebar initial ausgeblendet ist
- **Lösung**: Lazy Initialization - Karte wird erst erstellt, wenn Sidebar geöffnet wird
- **Code**: `ensureMapInitialized()` prüft Sichtbarkeit vor Initialisierung

### Challenge 2: Karten-Größe nach Öffnen
- **Problem**: Leaflet berechnet Größe falsch nach dem Öffnen
- **Lösung**: `invalidateSize()` mehrfach aufrufen
- **Code**: Mehrfache `setTimeout()` Aufrufe mit `map.invalidateSize()`

### Challenge 3: Dynamisch hinzugefügte Karten
- **Problem**: Spaltenbreiten müssen auch für nachträglich geladene Karten angepasst werden
- **Lösung**: Selektor jedes Mal neu ausführen
- **Code**: `$('.beobachtungen-grid .col-12, .beobachtungen-grid .col-md-6')` in Funktion

### Challenge 4: Marker-Duplikate
- **Problem**: Marker werden mehrfach hinzugefügt
- **Lösung**: Set zur ID-Verwaltung
- **Code**: `window.markerIds = new Set()`

### Challenge 5: Nicht-lateinische Zeichen
- **Problem**: Orte mit chinesischen/russischen Zeichen in Pop-ups
- **Lösung**: Filterung mit Regex
- **Code**: `isLatinOnly()` Funktion prüft ASCII-Zeichen

### Challenge 6: Koordinaten-Format
- **Problem**: API liefert GeoJSON Format `[lng, lat]`, Leaflet braucht `[lat, lng]`
- **Lösung**: Koordinaten umdrehen
- **Code**: `lng = coordinates[0]`, `lat = coordinates[1]`

---

## 7. CODE-QUALITÄT

### Best Practices
- ✅ Code strukturiert und kommentiert
- ✅ JSDoc-Kommentare für Funktionen
- ✅ Fehlerbehandlung (typeof-Prüfungen)
- ✅ Console-Logs für Debugging
- ✅ Wartbarer Code

### Funktionen
- ✅ `updateCardColumns()`: Wiederverwendbare Funktion für Spaltenanpassung
- ✅ `ensureMapInitialized()`: Lazy Initialization
- ✅ `initializeMap()`: Karten-Initialisierung
- ✅ `addObservationMarker()`: Marker hinzufügen
- ✅ `addObservationMarkers()`: Mehrere Marker hinzufügen
- ✅ `isLatinOnly()`: Zeichen-Validierung

---

## 8. DOKUMENTATION

### Erstellt
- ✅ `helper_4.md`: Umfassende Referenzdokumentation
  - jQuery Grundlagen
  - Leaflet Grundlagen
  - DOM-Manipulation
  - Event-Handling
  - Bootstrap Grid Integration
  - Code-Beispiele
  - Best Practices

### Aktualisiert
- ✅ `progress/fortschritt.md`: Meilensteine dokumentiert
- ✅ `progress/logbuch.md`: Arbeitsschritte dokumentiert

---

## 9. TESTING

### Getestet
- ✅ Sidebar öffnen/schließen
- ✅ Button-Text ändert sich
- ✅ Spaltenbreiten passen sich an
- ✅ Karte wird initialisiert
- ✅ Marker werden erstellt
- ✅ Pop-ups funktionieren
- ✅ Marker werden aktualisiert
- ✅ Responsive Design funktioniert
- ✅ Lazy Initialization funktioniert

### Test-Szenarien
1. Seite laden → Sidebar ist ausgeblendet
2. Button klicken → Sidebar öffnet sich
3. Karte prüfen → Marker sind sichtbar
4. Marker klicken → Pop-up erscheint
5. Neue Beobachtungen laden → Marker werden aktualisiert
6. Sidebar schließen → Layout passt sich an
7. Responsive Test → Funktioniert auf verschiedenen Bildschirmgrößen

---

## 10. INTEGRATION

### Zusammenarbeit mit bestehendem Code
- ✅ `observations.js`: Marker werden automatisch bei neuen Beobachtungen hinzugefügt
- ✅ `window.loadedObservations`: Globale Variable für Beobachtungsdaten
- ✅ `addObservationMarkers()`: Wird von `observations.js` aufgerufen
- ✅ Bootstrap Grid: Nahtlose Integration

### Abhängigkeiten
- ✅ jQuery muss vor Leaflet geladen werden
- ✅ Leaflet CSS muss vor Leaflet JS geladen werden
- ✅ `map.js` muss nach `sidebar.js` geladen werden (für `ensureMapInitialized()`)

---

## 11. ZUSAMMENFASSUNG

### Was wurde erreicht?
- ✅ Sidebar mit jQuery implementiert
- ✅ Toggle-Funktionalität funktioniert
- ✅ Dynamische Layout-Anpassung
- ✅ Leaflet-Karte integriert
- ✅ Marker für alle Beobachtungen
- ✅ Pop-ups mit Informationen
- ✅ Automatische Marker-Aktualisierung
- ✅ Lazy Initialization
- ✅ Responsive Design beibehalten
- ✅ Professionelle Dokumentation erstellt

### Technologien
- **jQuery 3.7.1**: DOM-Manipulation und Event-Handling
- **Leaflet 1.9.4**: Geo-Daten-Visualisierung
- **OpenStreetMap**: Karten-Tiles
- **Bootstrap 5.3.8**: Grid-System für Layout

### Dateien
- ✅ `sidebar.js`: Sidebar-Funktionalität
- ✅ `map.js`: Karten-Implementierung
- ✅ `index.html`: HTML-Struktur erweitert
- ✅ `helper_4.md`: Dokumentation

### Nächste Schritte
- Weitere Karten-Features können hinzugefügt werden
- Marker-Styling kann angepasst werden
- Pop-up-Design kann verbessert werden
- Karten-Zoom kann optimiert werden

---

## 12. CODE-HIGHLIGHTS

### jQuery – Dynamische Spaltenanpassung
```javascript
function updateCardColumns(removeClass, addClass) {
    const $observationCards = $('.beobachtungen-grid .col-12, .beobachtungen-grid .col-md-6');
    $observationCards.each(function() {
        $(this).removeClass(removeClass).addClass(addClass);
    });
}
```

### Leaflet – Marker mit Pop-up
```javascript
const marker = L.marker([lat, lng]);
let popupContent = `<strong>${latinName}</strong>`;
// Das !== in JavaScript prüft, ob zwei Werte ungleich sind UND auch einen unterschiedlichen Typ haben.
// Beispiel: '3' !== 3 ist true, weil String und Zahl unterschiedlich sind.
// Der Ausdruck prüft also: Nur wenn commonName existiert UND nicht exakt gleich latinName ist (wert- und typgetreu), soll der Block ausgeführt werden.
if (commonName && commonName !== latinName) {
    popupContent += `<br>${commonName}`;
}
if (formattedDate) {
    // Das "+=" Zeichen bedeutet "addiere (konkateniere) rechts hinzu": 
    // popupContent += ... erweitert den bisherigen String um den neuen Text am Ende.
    popupContent += br`<>Datum: ${formattedDate}`;
}
marker.bindPopup(popupContent);
marker.addTo(window.markers);
```

### Lazy Initialization
```javascript
// Diese Funktion stellt sicher, dass die Leaflet-Karte korrekt initialisiert und angezeigt wird.
// Das Vorgehen ist wie folgt:
// - Falls die Karte noch nicht initialisiert ist (isLeafletMap == false):
//    - Es wird die Hilfsfunktion checkVisibility gestartet, beginnend mit attempts = 0.
//    - checkVisibility prüft bei jedem Aufruf, ob das Map-Element sichtbar ist (isElementVisible(mapContainer)).
//        - Wenn ja: Dann wird die Karte initialisiert (initializeMap()).
//        - Wenn nein und noch weniger als 20 Versuche: Mit setTimeout ruft sie sich 50ms später erneut auf, jeweils mit erhöhtem attempts-Zähler. 
//          Damit wird maximal 20x für insgesamt ca. 1 Sekunde gewartet, bis das Map-Element sichtbar wurde (z.B. nach Einblendung der Sidebar).
// - Wenn die Karte bereits vorhanden ist (isLeafletMap == true):
//    - Dann wird invalidateSize() aufgerufen: Leaflet prüft, ob sich die Containergröße geändert hat, und rendert neu.

function ensureMapInitialized() {
    if (!isLeafletMap) {
        const checkVisibility = function(attempts) {
            // Prüfe, ob das Karten-Element aktuell sichtbar ist
            if (isElementVisible(mapContainer)) {
                // Wenn ja, initialisiere die Karte standardgemäß
                initializeMap();
            } else if (attempts < 20) {
                // Wenn noch nicht sichtbar und maximal 20 Versuche nicht überschritten sind,
                // führe die Prüfung nach 50ms erneut durch (Rekursion)
                setTimeout(() => checkVisibility(attempts + 1), 50);
            }
            // Andernfalls: Nach 20 Versuchen wird abgebrochen und keine Karte angelegt.
        };
        // Starte Sichtbarkeits-Prüfung mit Versuch Nummer 0
        checkVisibility(0);
    } else {
        // Wenn die Karte bereits da ist: Zwinge Leaflet zu neuem Größen-Berechnen
        window.map.invalidateSize();
    }
}
```
```

---

**Erstellt:** 2025-12-11  
**Bearbeiter:** Tobias  
**Status:** Abgeschlossen ✅
