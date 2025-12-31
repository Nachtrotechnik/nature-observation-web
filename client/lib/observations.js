// JavaScript für AJAX-Funktionalität zum Laden von Naturbeobachtungen
// Übung 4, Aufgabe 2: AJAX & JSON mit iNaturalist API

// 1. KONFIGURATION & KONSTANTEN

// Use API config if available, otherwise fallback
const API_BASE_URL = (typeof API_CONFIG !== 'undefined' && API_CONFIG.external?.iNaturalist?.baseURL) 
    ? API_CONFIG.external.iNaturalist.baseURL 
    : "https://api.inaturalist.org/v1/observations";
const OBSERVATIONS_PER_PAGE = 6;
const MAX_PAGES_TO_SEARCH = 24; // Maximale Anzahl Seiten beim Suchen nach gültigen Beobachtungen

// 2. DOM-ELEMENTE

const gridContainer = document.querySelector('.beobachtungen-grid');
const grid = gridContainer ? gridContainer.querySelector('.row') : null;
const template = gridContainer ? gridContainer.querySelector('.col-12') : null;
const viewMoreButton = document.getElementById('view_more');

// Prüfe ob Template existiert
if (!template) {
    console.warn("Template-Artikel nicht gefunden. Artikel werden dynamisch erstellt.");
}

// 3. GLOBALE VARIABLEN

let currentPage = 1; // Aktuelle Seitennummer für Pagination
let collectedObservations = []; // Temporäre Sammlung beim Laden bis 6 gefunden sind
let displayedObservationIds = new Set(); // Trackt bereits angezeigte Beobachtungen (verhindert Duplikate)
let currentView = 'inaturalist'; // 'inaturalist' oder 'local' - aktuelle Ansicht

// 4. HILFSFUNKTIONEN

/**
 * Erstellt die vollständige API-URL mit Pagination-Parametern
 * @param {number} page - Seitennummer
 * @returns {string} Vollständige API-URL
 */
function buildApiUrl(page) {
    // Sicherstellen, dass page definiert ist und eine gültige Zahl ist
    const pageNum = page || 1;
    return `${API_BASE_URL}?page=${pageNum}&per_page=${OBSERVATIONS_PER_PAGE}&order=desc&order_by=created_at`;
}

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
 * Konvertiert den ersten Buchstaben eines Strings zu einem Großbuchstaben
 * @param {string} string - Der zu formatierende String
 * @returns {string} String mit großgeschriebenem ersten Buchstaben
 */
function capitalizeFirstLetter(string) {
    if (!string || string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Konvertiert das API-Datum (YYYY-MM-DD) in deutsches Format (DD.MM.YYYY)
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

/**
 * Prüft ob eine Beobachtung gültig ist (Bild vorhanden, nicht dupliziert, hat taxon)
 * @param {Object} observation - Die zu prüfende Beobachtung
 * @returns {boolean} true wenn gültig, sonst false
 */
function isValidObservation(observation) {
    if (observation.taxon) {
        // Prüfe ob Beobachtung eine ID hat und nicht bereits angezeigt wurde
        const isNotDuplicate = observation.id && !displayedObservationIds.has(observation.id);
        // Prüfe ob taxon vorhanden ist (für Name)
        const hasTaxon = observation.taxon && observation.taxon.name;
        // Prüfe ob Bilder vorhanden sind (photos Array existiert und hat mindestens 1 Element mit URL)
        const hasPhotos = observation.photos && 
                        observation.photos.length > 0 && 
                        observation.photos[0].url &&
                        observation.photos[0].url.trim() !== '';
        
        return isNotDuplicate && hasTaxon && hasPhotos;
    } else {
        return false
    }

}

// 5. API-FUNKTIONEN

/**
 * Lädt Beobachtungen von der iNaturalist API
 * @param {number} page - Seitennummer
 * @param {boolean} ensureSixObservations - Wenn true, werden weitere Seiten geladen bis 6 gültige gefunden sind
 */
function loadObservations(page, ensureSixObservations = false) {
    const url = buildApiUrl(page);
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (ensureSixObservations) {
                collectValidObservations(data, page, page);
            } else {
                displayObservations(data);
            }
        })
        .catch(error => {
            console.error("Fehler beim Laden der Beobachtungen:", error);
        });
}

// 6. FILTERUNG & SAMMLUNG

/**
 * Sammelt gültige Beobachtungen bis 6 gefunden sind und lädt bei Bedarf weitere Seiten
 * @param {Object} data - API-Antwort mit Beobachtungen
 * @param {number} currentPageNum - Aktuelle Seitennummer
 * @param {number} startPage - Startseite für die Suche (verhindert Endlosschleife)
 */
function collectValidObservations(data, currentPageNum, startPage = null) {
    if (startPage === null) {
        startPage = currentPageNum;
    }
    
    // Prüfe ob Daten vorhanden sind
    if (!data || !data.results || data.results.length === 0) {
        console.warn("Keine Beobachtungen mehr gefunden");
        if (collectedObservations.length > 0) {
            displayCollectedObservations();
        }
        collectedObservations = [];
        return;
    }
    
    // Filtere gültige Beobachtungen und entferne bereits angezeigte
    const validObservations = data.results.filter(obs => 
        isValidObservation(obs) && !displayedObservationIds.has(obs.id)
    );
    console.log(`Seite ${currentPageNum}: ${validObservations.length} neue gültige Beobachtungen gefunden`);
    
    // Füge zur Sammlung hinzu
    collectedObservations = collectedObservations.concat(validObservations);
    console.log(`Gesamt gesammelt: ${collectedObservations.length} Beobachtungen`);
    
    // Prüfe ob genug Beobachtungen gefunden wurden
    if (collectedObservations.length >= OBSERVATIONS_PER_PAGE) {
        // Nimm nur die ersten 6 Beobachtungen
        collectedObservations = collectedObservations.slice(0, OBSERVATIONS_PER_PAGE);
        console.log(`Genug Beobachtungen gefunden. Zeige ${collectedObservations.length} an.`);
        
        // Zeige die Beobachtungen an
        displayCollectedObservations();
        
        // Reset für nächsten Ladevorgang
        collectedObservations = [];
    } else {
        // Lade nächste Seite
        const nextPage = currentPageNum + 1;
        const pagesSearched = nextPage - startPage;
        
        if (pagesSearched < MAX_PAGES_TO_SEARCH) {
            fetch(buildApiUrl(nextPage))
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    collectValidObservations(data, nextPage, startPage);
                })
                .catch(error => {
                    console.error("Fehler beim Laden der Beobachtungen:", error);
                    if (collectedObservations.length > 0) {
                        displayCollectedObservations();
                    }
                    collectedObservations = [];
                });
        } else {
            console.warn("Maximale Seitenanzahl erreicht. Zeige gefundene Beobachtungen.");
            if (collectedObservations.length > 0) {
                displayCollectedObservations();
            }
            collectedObservations = [];
        }
    }
}

// 7. DOM-MANIPULATION & ANZEIGE

/**
 * Erstellt ein Artikel-Element für eine Beobachtung
 * @param {Object} observation - Die Beobachtungsdaten
 * @returns {HTMLElement} Erstelltes article-Element
 */
function createObservationArticle(observation) {
    // Erstelle oder klone das col-Div (enthält die Card)
    // "let" declares a block-scoped variable that will be assigned either the cloned template or a newly created div
    let colDiv;
    if (template) {
        colDiv = template.cloneNode(true);
    } else {
        // Fallback: Erstelle die Bootstrap-Struktur manuell
        colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4';
        const article = document.createElement('article');
        article.className = 'card h-100';
        
        const img = document.createElement('img');
        img.className = 'card-img-top';
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        const h2 = document.createElement('h2');
        h2.className = 'card-title h5';
        const pLatin = document.createElement('p');
        pLatin.className = 'card-text';
        const pDate = document.createElement('p');
        pDate.className = 'card-text';
        
        cardBody.appendChild(h2);
        cardBody.appendChild(pLatin);
        cardBody.appendChild(pDate);
        article.appendChild(img);
        article.appendChild(cardBody);
        colDiv.appendChild(article);
    }
    
    // Finde das article-Element innerhalb des geklonten col-Divs
    const article = colDiv.querySelector('article');
    
    // Bild-URL extrahieren und anpassen (square → large)
    // Da wir bereits gefiltert haben, sollte hier immer ein Bild vorhanden sein
    let imageUrl = null;
    if (observation.photos && observation.photos.length > 0 && observation.photos[0].url) {
        // Ersetze 'square' durch 'large' für größeres Bild
        imageUrl = observation.photos[0].url.replace('square', 'large');
    }
    
    // Bild-Element aktualisieren
    const img = article.querySelector('img');
    if (img && imageUrl) {
        img.src = imageUrl;
        img.alt = observation.taxon?.name || "Naturbeobachtung";
    } else if (img) {
        // Falls kein Bild vorhanden (sollte nicht passieren nach Filterung)
        console.warn("Beobachtung ohne Bild wurde gefiltert:", observation.id);
        // Entferne das Bild-Element, da kein Bild vorhanden ist
        img.remove();
    }
    
    // Lateinischer Name
    const latinName = observation.taxon?.name || "";
    const cardTexts = article.querySelectorAll('.card-text');
    if (cardTexts[0]) {
        cardTexts[0].textContent = latinName;
    }
    
    // Beobachtungsdatum
    const observedDate = observation.observed_on || observation.created_at;
    const formattedDate = formatDate(observedDate);
    if (cardTexts[1]) {
        cardTexts[1].textContent = formattedDate;
    }
    
    // Ort (falls vorhanden) - Nur lateinische Schriftzeichen
    const place = observation.place_guess || observation.location || "";
    if (cardTexts[2]) {
        // Prüfe ob Ort nur lateinische Zeichen enthält, sonst leer lassen oder alternativen Text
        if (place && isLatinOnly(place)) {
            cardTexts[2].textContent = place;
        } else if (place) {
            // Ort enthält nicht-lateinische Zeichen - nicht anzeigen oder alternativen Text
            cardTexts[2].textContent = ""; // Oder: "Ort nicht verfügbar"
        } else {
            cardTexts[2].textContent = "";
        }
    }
    
    // Name (taxon.preferred_common_name oder taxon.name als Fallback)
    const h2 = article.querySelector('.card-title');
    if (h2) {
        if (observation.taxon?.preferred_common_name) {
            // Deutscher Name vorhanden: verwende diesen mit Großbuchstabe
            const name = capitalizeFirstLetter(observation.taxon.preferred_common_name);
            h2.textContent = name;
        } else if (observation.taxon?.name) {
            // Kein deutscher Name: verwende lateinischen Namen
            h2.textContent = observation.taxon.name;
        }
    }
    
    // Details-Link aktualisieren (falls vorhanden)
    const detailsLink = article.querySelector('a.btn');
    if (detailsLink && observation.id) {
        detailsLink.href = `detail.html?id=${observation.id}`;
    }
    
    return colDiv;
}

/**
 * Zeigt die gesammelten Beobachtungen an
 */
function displayCollectedObservations() {
    console.log(`displayCollectedObservations: Zeige ${collectedObservations.length} Beobachtungen an`);
    collectedObservations.forEach(observation => {
        if (observation.id && !displayedObservationIds.has(observation.id)) {
            const article = createObservationArticle(observation);
            if (grid) {
                grid.appendChild(article);
                displayedObservationIds.add(observation.id);
            }
        } else {
            console.log(`Beobachtung ${observation.id} bereits angezeigt oder keine ID`);
        }
    });
    
    // Beobachtungen in globaler Variable speichern (für nachträgliche Marker-Erstellung)
    window.loadedObservations = collectedObservations;
    
    // Marker zur Karte hinzufügen, falls Karte initialisiert ist
    if (typeof addObservationMarkers === 'function' && 
        typeof window.map !== 'undefined' && window.map !== null &&
        typeof window.markers !== 'undefined' && window.markers !== null) {
        addObservationMarkers(collectedObservations);
    }
}

/**
 * Zeigt gefilterte Beobachtungen an (normale Anzeige ohne Sammeln)
 * @param {Object} data - API-Antwort mit Beobachtungen
 */
function displayObservations(data) {
    if (!data || !data.results || data.results.length === 0) {
        console.warn("Keine Beobachtungen gefunden");
        return;
    }
    
    // Filtere gültige Beobachtungen
    const validObservations = data.results.filter(isValidObservation);
    
    // Zeige Beobachtungen an
    validObservations.forEach(observation => {
        if (observation.id && !displayedObservationIds.has(observation.id)) {
            const article = createObservationArticle(observation);
            if (grid) {
                grid.appendChild(article);
                displayedObservationIds.add(observation.id);
            }
        }
    });
    
    // Beobachtungen in globaler Variable speichern (für nachträgliche Marker-Erstellung)
    window.loadedObservations = validObservations;
    
    // Marker zur Karte hinzufügen, falls Karte initialisiert ist
    if (typeof addObservationMarkers === 'function' && 
        typeof window.map !== 'undefined' && window.map !== null &&
        typeof window.markers !== 'undefined' && window.markers !== null) {
        addObservationMarkers(validObservations);
    }
}

function clearGrid() {
    if (grid) {
        grid.replaceChildren();
    }
    displayedObservationIds.clear();
    collectedObservations = [];
}

function createLocalObservationArticle(observation) {
    let colDiv;
    colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-md-6 col-lg-4';
    const article = document.createElement('article');
    article.className = 'card h-100';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const h2 = document.createElement('h2');
    h2.className = 'card-title h5';
    const pLatin = document.createElement('p');
    pLatin.className = 'card-text';
    const pDate = document.createElement('p');
    pDate.className = 'card-text';
    const pLocation = document.createElement('p');
    pLocation.className = 'card-text';

    cardBody.appendChild(h2);
    cardBody.appendChild(pLatin);
    cardBody.appendChild(pDate);
    cardBody.appendChild(pLocation);
    article.appendChild(cardBody);
    colDiv.appendChild(article);


    // Lateinischer Name
    const latinName = observation.latinName || "";
    const cardTexts = article.querySelectorAll('.card-text');
    if (cardTexts[0]) {
        cardTexts[0].textContent = latinName;
    }

    // Beobachtungsdatum
    let formattedObservedDate = "";
    if (observation.date) {
        // Check if it's a Date object or already a string
        if (observation.date instanceof Date) {
            formattedObservedDate = formatDate(observation.date.toISOString());
        } else if (typeof observation.date === 'string') {
            formattedObservedDate = formatDate(observation.date);
        }
    }
    
    if (cardTexts[1]) {
        cardTexts[1].textContent = formattedObservedDate;
    }

    // Ort (falls vorhanden) - Nur lateinische Schriftzeichen
    const place = observation.location || "";
    if (cardTexts[2]) {
        // Prüfe ob Ort nur lateinische Zeichen enthält, sonst leer lassen oder alternativen Text
        if (place && isLatinOnly(place)) {
            cardTexts[2].textContent = place;
        } else if (place) {
            // Ort enthält nicht-lateinische Zeichen - nicht anzeigen oder alternativen Text
            cardTexts[2].textContent = ""; // Oder: "Ort nicht verfügbar"
        } else {
            cardTexts[2].textContent = "";
        }
    }

    const name = capitalizeFirstLetter(observation.title);
    h2.textContent = name;


    return colDiv;
}

function displayLocalObservations(data) {
    if (!data) {
        console.warn("Keine Beobachtungen gefunden");
        return;
    }

    // Zeige Beobachtungen an
    data.forEach(observation => {
        const observationId = observation._id.toString()          
        if (observationId && !displayedObservationIds.has(observationId)) {
            const article = createLocalObservationArticle(observation);
            if (grid) {
                grid.appendChild(article);
                displayedObservationIds.add(observationId);
            }
        }
    });
}    

function loadLocalObservations() {
    const server = API_CONFIG.baseURL + API_CONFIG.endpoints.observations.getAll;
    fetch(server)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayLocalObservations(data);
         })
        .catch(error => {
            console.error("Fehler beim Laden der Beobachtungen:", error);
        });
}


// 8. EVENT-LISTENER & INITIALISIERUNG

// Event-Listener für "mehr"-Button
if (viewMoreButton) {
    viewMoreButton.addEventListener('click', () => {
        // Prüfe welche Ansicht aktiv ist und lade entsprechend
        if (currentView === 'local') {
            // Für lokale Ansicht: Lade alle lokalen Beobachtungen
            console.log('Lade weitere lokale Beobachtungen');
            loadLocalObservations();
        } else {
            // Für iNaturalist Ansicht: Lade nächste Seite
            // Seitennummer erhöhen für die nächsten 6 Beobachtungen
            currentPage++;
            
            // Sammlung zurücksetzen, damit wirklich neue 6 Beobachtungen geladen werden
            collectedObservations = [];
            
            console.log(`Lade Seite ${currentPage} - Ziel: 6 neue Beobachtungen`);
            
            // Neue 6 Beobachtungen laden (ensureSixObservations = true garantiert genau 6)
            loadObservations(currentPage, true);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Prüfe ob das Grid existiert und nur das Template-Kind enthält
    if (grid && grid.children.length <= 1) {
        // Entferne das statische Template für einen sauberen Start
        if (template && template.parentNode === grid) {
            grid.removeChild(template);
        }
        // Setze Sammelvariablen und Seitennummer zurück
        collectedObservations = [];
        currentPage = 1;
        displayedObservationIds.clear(); // Set zurücksetzen verhindert Duplikate

        // Meldung in der Konsole für Entwickler
        console.log(`Starte mit Seite 1 - Ziel: 6 Beobachtungen`);

        // Lade die ersten 6 Beobachtungen direkt beim Seitenstart
        loadObservations(1, true);
        $('#export-button').on('click', function() {
            let exportData = [];
            const cards = $('.beobachtungen-grid .card');
            
            cards.each(function(index, card) {
                const $card = $(card);
                // Verwende Strukturselektoren statt IDs (da IDs nach Klonen nicht eindeutig sind)
                const cardTexts = $card.find('.card-text');
                const observationEntry = {
                    name: cardTexts.eq(0).text() || '', // Lateinischer Name (erstes .card-text)
                    datum: cardTexts.eq(1).text() || '', // Beobachtungsdatum (zweites .card-text)
                    ort: cardTexts.eq(2).text() || '' // Ort (drittes .card-text)
                };
                exportData.push(observationEntry);
            });
            
            // JSON-String erstellen und an Server senden
            const jsonData = JSON.stringify(exportData, null, 2);
            $.ajax({
                url: API_CONFIG.baseURL + API_CONFIG.endpoints.observations.export,
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
    }
    const viewLocalRadio = $('#view-local');
    const viewInaturalistRadio = $('#view-inaturalist');
    
    console.log('view-local radio found:', viewLocalRadio.length > 0);
    console.log('view-inaturalist radio found:', viewInaturalistRadio.length > 0);
    
    // Setze initiale Button-Zustände: iNaturalist aktiv, Lokal inaktiv
    viewInaturalistRadio.prop('checked', true);
    viewLocalRadio.prop('checked', false);
    currentView = 'inaturalist'; // Sicherstellen, dass currentView korrekt gesetzt ist
    
    viewLocalRadio.on('change', function(e) {
        // Verhindere unnötige Neuladung wenn bereits in dieser Ansicht
        if (currentView === 'local') {
            return;
        }
        
        console.log('better call Sanjeev');
        currentView = 'local';
        clearGrid();
        loadLocalObservations();
    });
    
    viewInaturalistRadio.on('change', function(e) {
        // Verhindere unnötige Neuladung wenn bereits in dieser Ansicht
        if (currentView === 'inaturalist') {
            return;
        }
        
        console.log('better call Tobi');
        currentView = 'inaturalist';
        clearGrid();
        loadObservations(1, true);
    });
});
