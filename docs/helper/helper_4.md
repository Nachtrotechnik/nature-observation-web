
# Helferdatei 3 – jQuery & Leaflet (Übung 4)

Diese Datei erklärt alle jQuery- und Leaflet-Konzepte, die in Übung 4 verwendet wurden, um eine interaktive Sidebar mit Karte zu implementieren.

---

## 1. JQUERY EINBINDUNG

### CDN-Link
jQuery wird über einen CDN-Link eingebunden:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
```

**Vorteile:**
- Keine lokale Installation nötig
- Immer aktuelle Version verfügbar
- Schnelles Laden durch CDN

**Version:** jQuery 3.7.1

**Subresource Integrity (SRI):**
- `integrity` Attribut stellt sicher, dass die geladene Datei nicht manipuliert wurde
- `crossorigin="anonymous"` erlaubt sogenannte CORS-Anfragen (Cross-Origin Resource Sharing): Damit darf der Browser die jQuery-Bibliothek von einer anderen Domain (dem CDN) laden, auch wenn sich diese von der eigenen Website unterscheidet. CORS regelt den sicheren Austausch von Ressourcen zwischen verschiedenen Ursprungsdomains.

---

## 2. JQUERY GRUNDLAGEN

### Document Ready
jQuery Code sollte erst ausgeführt werden, wenn das DOM vollständig geladen ist:

```javascript
$(document).ready(function() {
    // Code hier
});
```

**Kurzform:**
```javascript
$(function() {
    // Code hier
});
```

**Beispiel aus dem Projekt:**
```javascript
$(document).ready(function() {
    console.log('sidebar.js geladen');
    // Sidebar-Funktionalität initialisieren
});
```

### Element-Selektion
jQuery verwendet CSS-Selektoren um Elemente auszuwählen:

```javascript
$('#toggle-sidebar')        // ID-Selektor
$('.sidebar-map-container') // Klassen-Selektor
$('button')                  // Element-Selektor
```

**Beispiel aus dem Projekt:**
```javascript
const $toggleButton = $('#toggle-sidebar');
const $sidebar = $('#sidebar');
const $observationsContainer = $('#observations-container');
```

**Konvention:** Variablen die jQuery-Objekte enthalten, beginnen mit `$` (z.B. `$toggleButton`)

---

## 3. JQUERY DOM-MANIPULATION

### Klassen hinzufügen/entfernen
```javascript
$element.addClass('klasse')      // Klasse hinzufügen
$element.removeClass('klasse')   // Klasse entfernen
$element.toggleClass('klasse')   // Klasse umschalten
```

**Beispiel aus dem Projekt:**
```javascript
// Sidebar einblenden
$sidebar.removeClass('d-none');

// Sidebar ausblenden
$sidebar.addClass('d-none');
```

### Mehrere Klassen gleichzeitig
```javascript
$element
    .removeClass('col-md-12')
    .addClass('col-md-8');
```

**Beispiel aus dem Projekt:**
```javascript
$observationsContainer
    .removeClass('col-md-12')
    .addClass('col-md-8');
```

### Text ändern
```javascript
$element.text('Neuer Text')  // Text setzen
$element.html('<strong>Text</strong>')  // HTML setzen
```

**Beispiel aus dem Projekt:**
```javascript
$toggleButton.text('Karte anzeigen');
$toggleButton.text('Karte ausblenden');
```

---

## 4. JQUERY EVENT-HANDLING

### Click-Event
```javascript
$element.on('click', function() {
    // Code bei Klick
});
```

**Kurzform:**
```javascript
$element.click(function() {
    // Code bei Klick
});
```

**Beispiel aus dem Projekt:**
```javascript
$toggleButton.on('click', function() {
    if (sidebarVisible) {
        // Sidebar ausblenden
        $sidebar.addClass('d-none');
        // ...
    } else {
        // Sidebar einblenden
        $sidebar.removeClass('d-none');
        // ...
    }
});
```

### Event-Handler entfernen
```javascript
$element.off('click')  // Alle Click-Handler entfernen
```

---

## 5. JQUERY ITERATION

### each() - Über Elemente iterieren
```javascript
$('.beobachtungen-grid .col-lg-4').each(function() {
    // $(this) ist das aktuelle Element
    $(this).removeClass('col-lg-4').addClass('col-lg-6');
});
```

**Beispiel aus dem Projekt:**
```javascript
function updateCardColumns(removeClass, addClass) {
    const $observationCards = $('.beobachtungen-grid .col-12, .beobachtungen-grid .col-md-6');
    
    $observationCards.each(function() {
        $(this)
            .removeClass(removeClass)
            .addClass(addClass);
    });
}
```

**Wichtig:** `$(this)` innerhalb von `each()` bezieht sich auf das aktuelle DOM-Element

---

## 6. JQUERY ELEMENT-PRÜFUNG

### Element existiert?
```javascript
if ($element.length > 0) {
    // Element existiert
}
```

**Beispiel aus dem Projekt:**
```javascript
console.log('Button gefunden:', $toggleButton.length > 0);
console.log('Sidebar gefunden:', $sidebar.length > 0);
```

### Element ist sichtbar?
```javascript
if ($element.is(':visible')) {
    // Element ist sichtbar
}
```

---

## 7. LEAFLET EINBINDUNG

### CSS
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
      crossorigin>
```

### JavaScript
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" 
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" 
        crossorigin></script>
```

**Version:** Leaflet 1.9.4

**Wichtig:** Leaflet CSS muss VOR Leaflet JavaScript geladen werden!

---

## 8. LEAFLET KARTE INITIALISIEREN

### Grundlegende Initialisierung
```javascript
const map = L.map('map').setView([51.505, -0.09], 2);
```

**Parameter:**
- `'map'` - ID des HTML-Elements für die Karte
- `[51.505, -0.09]` - Koordinaten [Breitengrad, Längengrad]
- `2` - Zoom-Level (0 = Weltkarte, höhere Werte = näher)

**Beispiel aus dem Projekt:**
```javascript
window.map = L.map('map', {
    preferCanvas: false
}).setView([51.505, -0.09], 2);
```

**Wichtig:** Das HTML-Element muss sichtbar sein und eine Größe haben, bevor die Karte initialisiert wird!

---

## 9. LEAFLET TILE LAYER

### OpenStreetMap Tiles
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);
```

**Parameter:**
- `{s}` - Subdomain (a, b, c für Load-Balancing)
- `{z}` - Zoom-Level
- `{x}` - X-Koordinate der Kachel
- `{y}` - Y-Koordinate der Kachel
- `maxZoom` - Maximaler Zoom-Level

**Beispiel aus dem Projekt:**
```javascript
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(window.map);
```

---

## 10. LEAFLET MARKER

### Marker erstellen
```javascript
const marker = L.marker([51.505, -0.09]).addTo(map);
```

**Parameter:**
- `[51.505, -0.09]` - Koordinaten [Breitengrad, Längengrad]

**Beispiel aus dem Projekt:**
```javascript
const lat = observation.geojson.coordinates[1];
const lng = observation.geojson.coordinates[0];
const marker = L.marker([lat, lng]);
```

### Marker mit Pop-up
```javascript
marker.bindPopup('Pop-up Inhalt').openPopup();
```

**Beispiel aus dem Projekt:**
```javascript
marker.bindPopup(popupContent);
marker.addTo(window.markers);
```

---

## 11. LEAFLET LAYER GROUP

### Marker-Gruppe erstellen
```javascript
const markers = L.layerGroup().addTo(map);
```

**Vorteile:**
- Alle Marker gemeinsam verwalten
- Einfaches Hinzufügen/Entfernen
- `fitBounds()` für alle Marker

**Beispiel aus dem Projekt:**
```javascript
window.markers = L.layerGroup().addTo(window.map);

// Marker hinzufügen
marker.addTo(window.markers);

// Alle Marker entfernen
window.markers.clearLayers();
```

### Kartenansicht an Marker anpassen
```javascript
map.fitBounds(markers.getBounds(), { padding: [50, 50] });
```

**Parameter:**
- `markers.getBounds()` - Bounding Box aller Marker
- `{ padding: [50, 50] }` - Padding in Pixeln [vertikal, horizontal]

**Beispiel aus dem Projekt:**
```javascript
if (window.markers.getLayers().length > 0) {
    window.map.fitBounds(window.markers.getBounds(), { padding: [50, 50] });
}
```

---

## 12. LEAFLET MAP-GRÖSSE

### Problem: Karte wird nicht angezeigt
Wenn die Karte in einem versteckten Element initialisiert wird, muss die Größe neu berechnet werden:

```javascript
map.invalidateSize();
```

**Beispiel aus dem Projekt:**
```javascript
// Warte bis Element sichtbar ist
setTimeout(function() {
    if (window.map && typeof window.map.invalidateSize === 'function') {
        window.map.invalidateSize();
    }
}, 100);
```

**Wichtig:** `invalidateSize()` sollte aufgerufen werden, nachdem das Element sichtbar wurde!

---

## 13. GLOBALE VARIABLEN (window-Objekt)

### Warum globale Variablen?
Um Leaflet-Objekte zwischen verschiedenen JavaScript-Dateien zu teilen:

```javascript
// In map.js
window.map = L.map('map');
window.markers = L.layerGroup();

// In observations.js
if (window.map && window.markers) {
    // Marker hinzufügen
}
```

**Beispiel aus dem Projekt:**
```javascript
// map.js
window.map = L.map('map');
window.markers = L.layerGroup();
window.markerIds = new Set();
window.loadedObservations = [];

// observations.js
window.loadedObservations = validObservations;
if (window.map && window.markers) {
    addObservationMarkers(window.loadedObservations);
}
```

---

## 14. LAZY INITIALIZATION

### Problem: Karte in verstecktem Element
Die Karte sollte erst initialisiert werden, wenn die Sidebar geöffnet wird:

```javascript
function ensureMapInitialized() {
    if (!window.map) {
        // Prüfe ob Element sichtbar ist
        const mapContainer = document.getElementById('map');
        if (isElementVisible(mapContainer)) {
            initializeMap();
        }
    }
}
```

**Beispiel aus dem Projekt:**
```javascript
// sidebar.js
$toggleButton.on('click', function() {
    if (!sidebarVisible) {
        $sidebar.removeClass('d-none');
        // Karte initialisieren wenn Sidebar geöffnet wird
        if (typeof ensureMapInitialized === 'function') {
            ensureMapInitialized();
        }
    }
});
```

---

## 15. GEO-DATEN AUS API

### iNaturalist API Geo-Daten
```javascript
const observation = {
    geojson: {
        coordinates: [lng, lat]  // [Längengrad, Breitengrad]
    },
    latitude: lat,
    longitude: lng
};
```

**Wichtig:** GeoJSON verwendet `[lng, lat]`, Leaflet verwendet `[lat, lng]`!

**Beispiel aus dem Projekt:**
```javascript
let lat, lng;

if (observation.geojson && observation.geojson.coordinates) {
    // GeoJSON Format: [lng, lat]
    lng = observation.geojson.coordinates[0];
    lat = observation.geojson.coordinates[1];
} else if (observation.latitude && observation.longitude) {
    lat = observation.latitude;
    lng = observation.longitude;
}
```

---

## 16. POP-UP INHALT

### HTML-String für Pop-up
```javascript
const popupContent = `
    <strong>${latinName}</strong>
    <br>${commonName}
    <br>Datum: ${formattedDate}
    <br>Ort: ${place}
`;

marker.bindPopup(popupContent);
```

**Beispiel aus dem Projekt:**
```javascript
let popupContent = `<strong>${latinName}</strong>`;

if (commonName && commonName !== latinName) {
    popupContent += `<br>${commonName}`;
}

if (formattedDate) {
    popupContent += `<br>Datum: ${formattedDate}`;
}

if (place && isLatinOnly(place)) {
    popupContent += `<br>Ort: ${place}`;
}

marker.bindPopup(popupContent);
```

---

## 17. MARKER DEDUPLIZIERUNG

### Doppelte Marker vermeiden
```javascript
const markerIds = new Set();

function addMarker(observation) {
    if (!markerIds.has(observation.id)) {
        // Marker erstellen
        markerIds.add(observation.id);
    }
}
```

**Beispiel aus dem Projekt:**
```javascript
if (!window.markerIds) {
    window.markerIds = new Set();
}

if (!window.markerIds.has(observation.id)) {
    const marker = L.marker([lat, lng]);
    // ...
    window.markerIds.add(observation.id);
}
```

---

## 18. BEST PRACTICES IM PROJEKT

### 1. jQuery für DOM-Manipulation
- ✅ Klassen hinzufügen/entfernen für Sidebar-Toggle
- ✅ Text ändern für Button-Labels
- ✅ Event-Handling für Button-Clicks
- ✅ Iteration über Elemente für dynamische Updates

### 2. Leaflet für Karten
- ✅ Lazy Initialization (nur wenn Sidebar geöffnet wird)
- ✅ `invalidateSize()` nach Sichtbarkeit
- ✅ Layer Groups für Marker-Management
- ✅ Pop-ups mit HTML-Content
- ✅ `fitBounds()` für automatische Zoom-Anpassung

### 3. Globale Variablen
- ✅ `window.map` - Leaflet Map-Objekt
- ✅ `window.markers` - Layer Group für Marker
- ✅ `window.markerIds` - Set für Deduplizierung
- ✅ `window.loadedObservations` - Array für Beobachtungen

### 4. Responsive Design
- ✅ Sidebar: 1/3 Breite (col-md-4)
- ✅ Beobachtungen: 2/3 Breite wenn Sidebar offen (col-md-8)
- ✅ Beobachtungen: 3 Spalten wenn Sidebar geschlossen (col-lg-4)
- ✅ Beobachtungen: 2 Spalten wenn Sidebar offen (col-lg-6)

### 5. Fehlerbehandlung
- ✅ Prüfung ob Leaflet geladen ist (`typeof L === 'undefined'`)
- ✅ Prüfung ob Element existiert (`document.getElementById`)
- ✅ Prüfung ob Element sichtbar ist (`isElementVisible`)
- ✅ Prüfung ob Funktion existiert (`typeof function === 'function'`)

---

## 19. ZUSAMMENFASSUNG

Dieses Projekt verwendet:

✅ **jQuery 3.7.1** über CDN für DOM-Manipulation  
✅ **Leaflet 1.9.4** über CDN für interaktive Karten  
✅ **OpenStreetMap Tiles** für Karten-Hintergrund  
✅ **jQuery Event-Handling** für Sidebar-Toggle  
✅ **jQuery DOM-Manipulation** für dynamische Layout-Änderungen  
✅ **Leaflet Marker** für Beobachtungs-Standorte  
✅ **Leaflet Pop-ups** für Beobachtungs-Informationen  
✅ **Layer Groups** für Marker-Management  
✅ **Lazy Initialization** für Performance  
✅ **Globale Variablen** für Daten-Sharing zwischen Scripts  

**Ergebnis:**
- Interaktive Sidebar mit jQuery ein-/ausblendbar
- Leaflet-Karte mit OpenStreetMap Tiles
- Marker für jede Beobachtung mit Geo-Daten
- Pop-ups mit lateinischem Namen, englischem Namen, Datum und Ort
- Automatische Marker-Updates bei neuen Beobachtungen
- Responsive Design beibehalten

Diese Konzepte ermöglichen eine moderne, interaktive Web-Anwendung mit dynamischen Layout-Änderungen und Geo-Daten-Visualisierung.
