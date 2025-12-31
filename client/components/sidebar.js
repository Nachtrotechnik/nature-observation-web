// JavaScript für Sidebar-Ein-/Ausblenden mit jQuery
// Übung 4, Aufgabe 1: jQuery für Sidebar-Toggle

/**
 * Initialisiert die Sidebar-Funktionalität
 * - Sidebar wird standardmäßig ausgeblendet
 * - Button zum Ein-/Ausblenden
 * - Grid-Breite wird dynamisch angepasst
 */
$(document).ready(function() {
    console.log('sidebar.js geladen');
    
    // Elemente auswählen
    const $toggleButton = $('#toggle-sidebar');
    const $sidebar = $('#sidebar');
    const $observationsContainer = $('#observations-container');
    
    console.log('Button gefunden:', $toggleButton.length > 0);
    console.log('Sidebar gefunden:', $sidebar.length > 0);
    console.log('Observations Container gefunden:', $observationsContainer.length > 0);
    
    // Initialer Zustand: Sidebar ist ausgeblendet
    let sidebarVisible = false;
    
    /**
     * Aktualisiert die Spaltenbreite aller Beobachtungs-Karten
     * @param {string} removeClass - Klasse die entfernt werden soll
     * @param {string} addClass - Klasse die hinzugefügt werden soll
     */
    function updateCardColumns(removeClass, addClass) {
        // WICHTIG: Selektor jedes Mal neu ausführen, um auch dynamisch hinzugefügte Karten zu erfassen
        const $observationCards = $('.beobachtungen-grid .col-12, .beobachtungen-grid .col-md-6');
        
        $observationCards.each(function() {
            $(this)
                .removeClass(removeClass)
                .addClass(addClass);
        });
    }
    
    // Event-Handler für Button-Klick
    $toggleButton.on('click', function() {
        if (sidebarVisible) {
            // Sidebar ausblenden
            $sidebar.addClass('d-none');
            
            // Grid-Container auf volle Breite (col-md-12)
            $observationsContainer
                .removeClass('col-md-8')
                .addClass('col-md-12');
            
            // Karten-Spalten: 3 Spalten (col-lg-4)
            updateCardColumns('col-lg-6', 'col-lg-4');
            
            // Button-Text ändern
            $toggleButton.text('Karte anzeigen');
            
            sidebarVisible = false;
        } else {
            // Sidebar einblenden
            $sidebar.removeClass('d-none');
            
            // Grid-Container auf 2/3 Breite (col-md-8)
            $observationsContainer
                .removeClass('col-md-12')
                .addClass('col-md-8');
            
            // Karten-Spalten: 2 Spalten (col-lg-6)
            updateCardColumns('col-lg-4', 'col-lg-6');
            
            // Button-Text ändern
            $toggleButton.text('Karte ausblenden');
            
            sidebarVisible = true;
             
           // Karte initialisieren, wenn Sidebar geöffnet wird
            console.log('Sidebar wurde geöffnet. Prüfe ensureMapInitialized...');
            if (typeof ensureMapInitialized === 'function') {
                console.log('ensureMapInitialized() gefunden, rufe auf...');
                ensureMapInitialized();
            } else {
                console.error('ensureMapInitialized() ist nicht definiert! map.js wurde möglicherweise nicht geladen.');
            }
        }
    });
});

