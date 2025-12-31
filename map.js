// JavaScript für Leaflet-Karte
// Übung 4, Aufgabe 2: Leaflet für Geo-Daten-Visualisierung

console.log('map.js geladen');

/**
 * Prüft ob ein String nur lateinische Zeichen enthält (keine chinesischen, russischen, etc.)
 * @param {string} str - Der zu prüfende String
 * @returns {boolean} true wenn nur lateinische Zeichen, sonst false
 */
function isLatinOnly(str) {
    if (!str || str.length === 0) {
        return false;
    }
    // Prüfe ob der String nur ASCII-Zeichen enthält (lateinische Buchstaben, Zahlen, Leerzeichen, Bindestriche, etc.)
    // Erlaubt: A-Z, a-z, 0-9, Leerzeichen, Bindestriche, Punkte, Kommas, Klammern
    // Regex: Nur ASCII-Zeichen (0-127) erlaubt
    const latinPattern = /^[\x00-\x7F\s\-.,()]+$/;
    return latinPattern.test(str);
}

/**
 * Initialisiert die Leaflet-Karte mit OpenStreetMap
 * Die Karte wird nur einmal initialisiert, wenn die Sidebar zum ersten Mal geöffnet wird
 */
function initializeMap() {
    console.log('initializeMap() aufgerufen');
    // Prüfe ob Leaflet geladen ist
    if (typeof window.L === 'undefined') {
        console.error('Leaflet ist nicht geladen. Stelle sicher, dass Leaflet vor map.js geladen wird.');
        return;
    }
    
    // Prüfe ob Karte bereits initialisiert wurde
    if (typeof window.map !== 'undefined' && window.map !== null) {
        console.log('Karte bereits initialisiert');
        return;
    }
    
    // Prüfe ob das Map-Container-Element existiert
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map-Container nicht gefunden');
        return;
    }
    
    // Prüfe ob Element sichtbar ist und Größe hat
    const computedStyle = window.getComputedStyle(mapContainer);
    const width = mapContainer.offsetWidth;
    const height = mapContainer.offsetHeight;
    
    console.log('Map-Container Status:');
    console.log('- Display:', computedStyle.display);
    console.log('- Width:', width, 'px');
    console.log('- Height:', height, 'px');
    console.log('- Sichtbar:', isElementVisible(mapContainer));
    
    if (width === 0 || height === 0) {
        console.warn('Map-Container hat keine Größe. Warte auf sichtbares Element...');
        return false; // Initialisierung fehlgeschlagen
    }
    
    try {
        // Leaflet-Karte initialisieren
        // L.map() erstellt eine neue Karte
        // 'map' ist die ID des HTML-Elements, in dem die Karte angezeigt wird
        window.map = L.map('map', {
            // Optionen für bessere Initialisierung
            preferCanvas: false
        }).setView([51.505, -0.09], 25); // Standard-Ansicht: Weltkarte, Zoom-Level 2
        
        console.log('Karte erstellt, füge Tile Layer hinzu...');
        
        // OpenStreetMap Tile Layer hinzufügen
        // L.tileLayer() erstellt einen Karten-Layer mit Kacheln (Tiles)
        // Die URL ist das Template für die OpenStreetMap-Kacheln
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(window.map);
        
        console.log('Tile Layer hinzugefügt:', tileLayer);
        
        // Marker-Gruppe erstellen (für besseres Management aller Marker)
        // L.layerGroup() erstellt eine Gruppe von Markern, die gemeinsam verwaltet werden können
        window.markers = L.layerGroup().addTo(window.map);
        
        // Marker-IDs Set initialisieren
        if (!window.markerIds) {
            window.markerIds = new Set();
        }
        
        console.log('Leaflet-Karte erfolgreich initialisiert');
        console.log('Map-Objekt:', window.map);
        console.log('Map-Größe:', window.map.getSize());
        console.log('Marker-Gruppe:', window.markers);
        
        // WICHTIG: invalidateSize() sofort aufrufen, damit Leaflet die Größe berechnet
        setTimeout(function() {
            if (window.map && typeof window.map.invalidateSize === 'function') {
                console.log('Rufe invalidateSize() auf...');
                window.map.invalidateSize();
                console.log('Map-Größe nach invalidateSize():', window.map.getSize());
            }
        }, 100);
        
        // Wenn bereits Beobachtungen geladen wurden, füge Marker hinzu
        if (window.loadedObservations && Array.isArray(window.loadedObservations)) {
            console.log('Füge nachträglich Marker für bereits geladene Beobachtungen hinzu:', window.loadedObservations.length);
            addObservationMarkers(window.loadedObservations);
        }
        
        return true; // Initialisierung erfolgreich
    } catch (error) {
        console.error('Fehler beim Initialisieren der Karte:', error);
        console.error('Error Stack:', error.stack);
        return false;
    }
}

/**
 * Prüft ob ein Element sichtbar ist (nicht display: none)
 * @param {HTMLElement} element - Das zu prüfende Element
 * @returns {boolean} true wenn sichtbar, sonst false
 */
function isElementVisible(element) {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Wird aufgerufen, wenn die Sidebar geöffnet wird
 * Initialisiert die Karte, falls noch nicht geschehen
 */
function ensureMapInitialized() {
    console.log('ensureMapInitialized() wurde aufgerufen');
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map-Container nicht gefunden');
        return;
    }
    console.log('Map-Container gefunden:', mapContainer);
    
    // Prüfe ob Karte bereits initialisiert ist
    console.log('Prüfe ob Karte bereits initialisiert ist...');
    console.log('window.map:', typeof window.map, window.map);
    
    // WICHTIG: Prüfe ob window.map wirklich ein Leaflet Map-Objekt ist
    // (nicht das HTML-Element)
    const isLeafletMap = window.map && typeof window.map.getSize === 'function' && typeof window.map.invalidateSize === 'function';
    console.log('Ist window.map ein Leaflet-Objekt?', isLeafletMap);
    
    if (!isLeafletMap) {
        // Karte ist nicht initialisiert oder window.map ist falsch gesetzt
        if (window.map && !isLeafletMap) {
            console.warn('window.map ist gesetzt, aber kein Leaflet-Objekt!');
            console.warn('window.map ist:', window.map.constructor?.name || typeof window.map);
            console.warn('Setze window.map zurück und initialisiere neu...');
            window.map = undefined;
            window.markers = undefined;
        }
        console.log('Karte ist nicht initialisiert, starte Initialisierung...');
        // Warte bis das Element wirklich sichtbar ist
        const checkVisibility = function(attempts) {
            attempts = attempts || 0;
            console.log(`Sichtbarkeitsprüfung, Versuch ${attempts + 1}...`);
            
            const visible = isElementVisible(mapContainer);
            console.log('Element sichtbar?', visible);
            
            if (visible) {
                console.log('Element ist sichtbar, starte initializeMap()...');
                // Element ist sichtbar, initialisiere Karte
                const initialized = initializeMap();
                
                if (initialized) {
                    // Karten-Größe mehrfach neu berechnen (Leaflet braucht manchmal mehrere Versuche)
                    // Warte etwas länger, damit Leaflet die Tiles laden kann
                    setTimeout(function() {
                        if (window.map && typeof window.map.invalidateSize === 'function') {
                            console.log('Erster invalidateSize() Aufruf...');
                            window.map.invalidateSize();
                            // Zweiter Versuch nach kurzer Verzögerung
                            setTimeout(function() {
                                if (window.map && typeof window.map.invalidateSize === 'function') {
                                    console.log('Zweiter invalidateSize() Aufruf...');
                                    window.map.invalidateSize();
                                    // Dritter Versuch für Sicherheit
                                    setTimeout(function() {
                                        if (window.map && typeof window.map.invalidateSize === 'function') {
                                            console.log('Dritter invalidateSize() Aufruf...');
                                            window.map.invalidateSize();
                                        }
                                    }, 200);
                                }
                            }, 200);
                        } else {
                            console.warn('Karte wurde initialisiert, aber invalidateSize ist nicht verfügbar');
                        }
                    }, 300);
                } else {
                    console.warn('Karten-Initialisierung fehlgeschlagen');
                }
            } else if (attempts < 20) {
                // Element noch nicht sichtbar, versuche es erneut
                console.log(`Element noch nicht sichtbar, warte 50ms und versuche erneut (Versuch ${attempts + 1}/20)...`);
                setTimeout(function() {
                    checkVisibility(attempts + 1);
                }, 50);
            } else {
                console.warn('Map-Container wurde nicht sichtbar nach 20 Versuchen');
                console.warn('Versuche trotzdem Initialisierung...');
                // Versuche trotzdem Initialisierung
                initializeMap();
            }
        };
        
        console.log('Starte Sichtbarkeitsprüfung...');
        checkVisibility(0);
    } else {
        // Karte ist bereits initialisiert
        const isLeafletMap = window.map && typeof window.map.getSize === 'function' && typeof window.map.invalidateSize === 'function';
        
        if (!isLeafletMap) {
            console.warn('window.map ist gesetzt, aber kein Leaflet-Objekt! Initialisiere neu...');
            window.map = undefined;
            window.markers = undefined;
            // Starte Initialisierung erneut
            const checkVisibility = function(attempts) {
                attempts = attempts || 0;
                console.log(`Sichtbarkeitsprüfung (Neu-Initialisierung), Versuch ${attempts + 1}...`);
                
                const visible = isElementVisible(mapContainer);
                console.log('Element sichtbar?', visible);
                
                if (visible) {
                    console.log('Element ist sichtbar, starte initializeMap()...');
                    const initialized = initializeMap();
                    if (initialized) {
                        setTimeout(function() {
                            if (window.map && typeof window.map.invalidateSize === 'function') {
                                console.log('Rufe invalidateSize() auf...');
                                window.map.invalidateSize();
                            }
                        }, 100);
                    }
                } else if (attempts < 20) {
                    setTimeout(function() {
                        checkVisibility(attempts + 1);
                    }, 50);
                }
            };
            checkVisibility(0);
            return;
        }
        
        console.log('Karte ist bereits initialisiert, rufe invalidateSize() auf...');
        // Karte existiert bereits, aber Größe muss neu berechnet werden
        // invalidateSize() teilt Leaflet mit, dass sich die Größe des Containers geändert hat
        const visible = isElementVisible(mapContainer);
        console.log('Element sichtbar?', visible);
        console.log('window.map vorhanden?', window.map !== null);
        console.log('invalidateSize vorhanden?', typeof window.map?.invalidateSize === 'function');
        
        if (visible && window.map && typeof window.map.invalidateSize === 'function') {
            console.log('Rufe invalidateSize() auf...');
            setTimeout(function() {
                window.map.invalidateSize();
                // Zweiter Versuch für sicherheit
                setTimeout(function() {
                    if (window.map && typeof window.map.invalidateSize === 'function') {
                        window.map.invalidateSize();
                    }
                }, 100);
            }, 50);
        }
    }
}

/**
 * Fügt einen Marker für eine Beobachtung zur Karte hinzu
 * @param {Object} observation - Die Beobachtungsdaten von der iNaturalist API
 */
function addObservationMarker(observation) {
    // Prüfe ob Karte initialisiert ist
    if (typeof window.map === 'undefined' || window.map === null) {
        console.warn('Karte noch nicht initialisiert. Marker wird nicht hinzugefügt.');
        return;
    }
    
    // Prüfe ob Marker-Gruppe existiert
    if (typeof window.markers === 'undefined' || window.markers === null) {
        console.warn('Marker-Gruppe noch nicht initialisiert. Marker wird nicht hinzugefügt.');
        return;
    }
    
    // Prüfe ob Koordinaten vorhanden sind
    // iNaturalist API liefert: observation.geojson.coordinates oder observation.latitude/longitude
    let lat, lng;
    
    if (observation.geojson && observation.geojson.coordinates) {
        // GeoJSON Format: [longitude, latitude]
        lng = observation.geojson.coordinates[0];
        lat = observation.geojson.coordinates[1];
    } else if (observation.latitude && observation.longitude) {
        // Direkte Koordinaten
        lat = observation.latitude;
        lng = observation.longitude;
    } else {
        // Keine Koordinaten vorhanden
        console.warn('Beobachtung ohne Koordinaten:', observation.id);
        return;
    }
    
    // Prüfe ob Marker bereits existiert (verhindert Duplikate)
    if (window.markerIds && window.markerIds.has(observation.id)) {
        console.log('Marker für Beobachtung', observation.id, 'bereits vorhanden');
        return;
    }
    
    // Marker erstellen
    // L.marker() erstellt einen Marker an den angegebenen Koordinaten
    const marker = L.marker([lat, lng]);
    
    // Pop-up-Inhalt erstellen
    // WICHTIG: Lateinischer Name hat Priorität, dann englischer Name
    const latinName = observation.taxon?.name || 'Unbekannt';
    // preferred_common_name ist meistens der englische Name in der iNaturalist API
    const commonName = observation.taxon?.preferred_common_name || '';
    const observedDate = observation.observed_on || observation.created_at || '';
    const formattedDate = formatDate(observedDate);
    const place = observation.place_guess || observation.location || '';
    
    // Hauptname: Lateinischer Name (immer fett angezeigt)
    let popupContent = `<strong>${latinName}</strong>`;
    
    // Zusätzlicher Name: Englischer/Common Name (falls vorhanden und anders als lateinischer Name)
    // preferred_common_name ist in der Regel der englische Name
    if (commonName && commonName !== latinName) {
        popupContent += `<br>${commonName}`;
    }
    
    if (formattedDate) {
        popupContent += `<br>Datum: ${formattedDate}`;
    }
    // Ort: Nur anzeigen wenn er lateinische Zeichen enthält
    if (place && isLatinOnly(place)) {
        popupContent += `<br>Ort: ${place}`;
    }
    
    // Pop-up an Marker binden
    // bindPopup() fügt ein Pop-up zum Marker hinzu, das beim Klick angezeigt wird
    marker.bindPopup(popupContent);
    
    // Marker zur Marker-Gruppe hinzufügen
    marker.addTo(window.markers);
    
    // Marker-ID speichern (verhindert Duplikate)
    if (!window.markerIds) {
        window.markerIds = new Set();
    }
    window.markerIds.add(observation.id);
    
    console.log('Marker für Beobachtung', observation.id, 'hinzugefügt:', lat, lng);
}

/**
 * Fügt mehrere Marker für Beobachtungen zur Karte hinzu
 * @param {Array} observations - Array von Beobachtungsdaten
 */
function addObservationMarkers(observations) {
    if (!Array.isArray(observations)) {
        console.error('addObservationMarkers: Erwartet Array, erhalten:', typeof observations);
        return;
    }
    
    observations.forEach(function(observation) {
        addObservationMarker(observation);
    });
    
    // Karte anpassen, um alle Marker sichtbar zu machen
    if (window.map && window.markers && window.markers.getLayers().length > 0) {
        try {
            // fitBounds() passt die Kartenansicht an, sodass alle Marker sichtbar sind
            const group = new L.featureGroup(window.markers.getLayers());
            const bounds = group.getBounds();
            if (bounds.isValid()) {
                window.map.fitBounds(bounds.pad(0.1)); // 10% Padding
            }
        } catch (error) {
            console.warn('Fehler beim Anpassen der Kartenansicht:', error);
        }
    }
}

/**
 * Entfernt alle Marker von der Karte
 */
function clearAllMarkers() {
    if (window.markers) {
        window.markers.clearLayers();
    }
    if (window.markerIds) {
        window.markerIds.clear();
    }
    console.log('Alle Marker von der Karte entfernt');
}

/**
 * Hilfsfunktion zum Formatieren von Datum (aus observations.js kopiert)
 * @param {string} dateString - Datum im Format "YYYY-MM-DD" oder "YYYY-MM-DDTHH:mm:ss"
 * @returns {string} Formatiertes Datum oder leerer String
 */
function formatDate(dateString) {
    if (!dateString) return "";
    
    const datePart = dateString.split('T')[0];
    const parts = datePart.split('-');
    
    if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    
    return datePart;
}

