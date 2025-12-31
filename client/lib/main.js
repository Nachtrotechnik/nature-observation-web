// JavaScript für Formular-Validierung und Vorschau
// Übung 4, Aufgabe 1: JavaScript, DOM-Manipulation
// 1. DOM-ELEMENTE
const regist = document.getElementById("registrierung-form");
const label = document.querySelectorAll(".content-container form label");
const input = document.querySelectorAll(".content-container form input");
const error = document.querySelectorAll(".content-container .error_msg");
const checkbox = document.getElementById("registrieren-datenschutz");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const button_submit = document.querySelector(".content-container section form button");

// 2. KONSTANTEN
// Feld-Indizes als Konstanten (Magic Numbers vermeiden)
const FIELD_INDICES = {
    NAME: 0,
    EMAIL: 1,
    PHONE: 2,
    BIRTH: 3,
    URL: 4,
    PASSWORD: 5,
    CONFIRM: 6,
    CHECKBOX: 7
};

// Regex-Patterns für Validierung
const namePattern = /[a-zA-Z]+, [a-zA-Z]+/;
const mailPattern = /[a-zA-Z0-9\.\_\-]+\@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/;
const phonePattern = /\+\d{1,3}\s\d{3,4}\s\d{4,8}/;
const urlPattern = /www\.[a-zA-Z\-]+\.[a-zA-Z]+[a-zA-Z\-\_\/]/;

// 3. GLOBALE VARIABLEN
let previewShown = false; // Flag: zeigt an, ob die Vorschau bereits angezeigt wurde

// 4. HILFSFUNKTIONEN FÜR FEHLERBEHANDLUNG
/**
 * Zeigt eine Fehlermeldung für ein Feld an
 * @param {number} index - Index des Feldes
 * @param {string} message - Fehlermeldung
 */
function showError(index, message) {
    error[index].innerText = message;
    label[index].style.color = "#FF0000";
    input[index].style.border = "3px solid #FF0000";
}

/**
 * Entfernt die Fehlermeldung für ein Feld
 * @param {number} index - Index des Feldes
 */
function clearError(index) {
    error[index].innerText = "";
    label[index].style.color = "";
    input[index].style.border = "";
}

// 5. VALIDIERUNGSFUNKTIONEN

/**
 * Generische Regex-Validierungsfunktion
 * @param {number} index - Index des Feldes
 * @param {RegExp} pattern - Regex-Pattern
 * @param {string} errorMessage - Fehlermeldung bei ungültiger Eingabe
 * @param {boolean} isOptional - Ob das Feld optional ist
 * @returns {boolean} true wenn valide, sonst false
 */
function validateRegex(index, pattern, errorMessage, isOptional = false) {
    const value = input[index].value;
    // Wenn optional und leer, ist es valide
    if (isOptional && !value) {
        clearError(index);
        return true;
    }
    // Wenn nicht optional und leer, ist es invalide
    if (!isOptional && !value) {
        showError(index, errorMessage);
        return false;
    }
    // Pattern-Test
    if (pattern.test(value)) {
        clearError(index);
        return true;
    } else {
        showError(index, errorMessage);
        return false;
    }
}

/**
 * Altersprüfung (mindestens 18 Jahre)
 * @param {number} index - Index des Geburtsdatum-Feldes
 * @returns {boolean} true wenn mindestens 18 Jahre, sonst false
 */
function validateAge(index) {
    if (!input[index].value) {
        showError(index, "Sie müssen mindestens 18 Jahre alt sein");
        return false;
    }

    const birthDate = new Date(input[index].value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const hasBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
    const actualAge = hasBirthdayPassed ? age : age - 1;

    if (actualAge < 18) {
        showError(index, "Sie müssen mindestens 18 Jahre alt sein");
        return false;
    } else {
        clearError(index);
        return true;
    }
}

/**
 * Passwort-Längen-Validierung (mindestens 8 Zeichen)
 * @returns {boolean} true wenn mindestens 8 Zeichen, sonst false
 */
function validatePasswordLength() {
    if (password.value.length < 8) {
        showError(FIELD_INDICES.PASSWORD, "Das Passwort muss mindestens acht Zeichen lang sein");
        return false;
    } else {
        clearError(FIELD_INDICES.PASSWORD);
        return true;
    }
}

/**
 * Passwort-Übereinstimmung prüfen
 * @returns {boolean} true wenn Passwörter übereinstimmen, sonst false
 */
function validatePasswordMatch() {
    if (confirm.value !== password.value) {
        showError(FIELD_INDICES.CONFIRM, "Die Passwörter sind nicht identisch");
        return false;
    } else {
        clearError(FIELD_INDICES.CONFIRM);
        return true;
    }
}

/**
 * Checkbox-Validierung (Datenschutz)
 * @param {string} errorMessage - Fehlermeldung
 * @returns {boolean} true wenn angehakt, sonst false
 */
function validateCheckbox(errorMessage) {
    if (!checkbox.checked) {
        showError(FIELD_INDICES.CHECKBOX, errorMessage);
        return false;
    } else {
        clearError(FIELD_INDICES.CHECKBOX);
        return true;
    }
}

/**
 * Zentrale Validierungsfunktion für alle Felder
 * @returns {boolean} true wenn alle Felder valide sind, sonst false
 */
function validateAllFields() {
    const results = {
        name: validateRegex(FIELD_INDICES.NAME, namePattern, "Bitte geben Sie Ihren Namen im Format 'Nachname, Vorname' an"),
        email: validateRegex(FIELD_INDICES.EMAIL, mailPattern, "Bitte geben Sie eine gültige E-Mail Adresse an"),
        phone: validateRegex(FIELD_INDICES.PHONE, phonePattern, "Bitte geben Sie eine gültige Telefonnummer an", true),
        birth: validateAge(FIELD_INDICES.BIRTH),
        url: validateRegex(FIELD_INDICES.URL, urlPattern, "Bitte geben Sie eine gültige URL an", true),
        password: validatePasswordLength(),
        confirm: validatePasswordMatch(),
        checkbox: validateCheckbox("Bitte stimmen Sie dem Datenschutz zu")
    };

    return Object.values(results).every(result => result === true);
}

/**
 * Validierungsfunktion für einzelne Felder (wird während der Eingabe aufgerufen)
 * @param {number} index - Index des zu validierenden Feldes
 * @returns {boolean} true wenn valide, sonst false
 */
function validateField(index) {
    let isValid = true;

    switch (index) {
        case FIELD_INDICES.NAME:
            isValid = validateRegex(FIELD_INDICES.NAME, namePattern, "Bitte geben Sie Ihren Namen im Format 'Nachname, Vorname' an");
            break;
        case FIELD_INDICES.EMAIL:
            isValid = validateRegex(FIELD_INDICES.EMAIL, mailPattern, "Bitte geben Sie eine gültige E-Mail Adresse an");
            break;
        case FIELD_INDICES.PHONE:
            isValid = validateRegex(FIELD_INDICES.PHONE, phonePattern, "Bitte geben Sie eine gültige Telefonnummer an", true);
            break;
        case FIELD_INDICES.BIRTH:
            isValid = validateAge(FIELD_INDICES.BIRTH);
            break;
        case FIELD_INDICES.URL:
            isValid = validateRegex(FIELD_INDICES.URL, urlPattern, "Bitte geben Sie eine gültige URL an", true);
            break;
        case FIELD_INDICES.PASSWORD:
            isValid = validatePasswordLength();
            // Wenn Passwort geändert wird, auch Passwort-Bestätigung prüfen
            if (confirm.value) {
                validateField(FIELD_INDICES.CONFIRM);
            }
            break;
        case FIELD_INDICES.CONFIRM:
            isValid = validatePasswordMatch();
            break;
    }

    // Submit-Button aktivieren/deaktivieren basierend auf Validierungsstatus
    updateSubmitButton();
    return isValid;
}

/**
 * Aktualisiert den Submit-Button basierend auf Validierungsstatus
 */
function updateSubmitButton() {
    const allValid = validateAllFields();
    button_submit.disabled = !allValid;
}

// 6. VORSCHAU-FUNKTION
/**
 * Zeigt eine Vorschau der eingegebenen Daten an
 * Versteckt Input-Felder, zeigt Werte als Text, entfernt Passwort-Felder
 */
function showPreview() {
    // Array mit Indizes der Input-Felder, die in der Vorschau angezeigt werden sollen
    // Passwort-Felder (5 und 6) werden entfernt, nicht angezeigt
    const fieldsToShow = [
        FIELD_INDICES.NAME,
        FIELD_INDICES.EMAIL,
        FIELD_INDICES.PHONE,
        FIELD_INDICES.BIRTH,
        FIELD_INDICES.URL,
        FIELD_INDICES.CHECKBOX
    ];

    // Für jedes Feld: Input verstecken und Text-Element erstellen
    fieldsToShow.forEach(index => {
        const currentInput = input[index];

        // Prüfe ob Vorschau bereits erstellt wurde (verhindert doppelte Erstellung)
        if (currentInput.style.display === 'none') {
            return; // Überspringe, wenn bereits versteckt
        }

        // Input-Feld verstecken
        currentInput.style.display = 'none';

        // Neues Element für die Vorschau erstellen
        const previewText = document.createElement('span');

        // Prüfe zuerst ob es eine Checkbox ist, dann den Wert anzeigen
        // Checkboxen haben einen value (oft "on"), daher muss zuerst auf checked geprüft werden
        if (currentInput.type === 'checkbox') {
            previewText.textContent = currentInput.checked ? 'Ja' : 'Nein';
        } else {
            // Für alle anderen Input-Typen: Wert anzeigen
            previewText.textContent = currentInput.value || '';
        }

        // Text-Element vor dem Input-Feld einfügen
        currentInput.parentNode.insertBefore(previewText, currentInput);
    });

    // Passwort-Felder komplett entfernen
    if (password && password.parentNode) {
        password.parentNode.remove();
    }
    if (confirm && confirm.parentNode) {
        confirm.parentNode.remove();
    }

    // Submit-Button wieder aktivieren (falls deaktiviert)
    button_submit.disabled = false;

    // Button-Text ändern, um zu zeigen, dass jetzt wirklich abgeschickt wird
    button_submit.textContent = "Registrierung abschicken";
}

// 7. EVENT-LISTENER & INITIALISIERUNG
// Event-Listener für Formular-Submit
regist.addEventListener("submit", (e) => {
    // Wenn Vorschau bereits gezeigt wurde, Formular wirklich abschicken
    if (previewShown) {
        return; // Kein preventDefault() - Formular wird abgeschickt
    }

    // Validiere alle Felder
    const isValid = validateAllFields();

    if (!isValid) {
        e.preventDefault();
        button_submit.disabled = true;
    } else {
        e.preventDefault(); // Verhindere Standard-Submit, um Vorschau zu zeigen
        showPreview();
        previewShown = true; // Markiere, dass Vorschau gezeigt wurde
    }
});

// Event-Listener für Validierung während der Eingabe
const fieldConfig = [
    { index: FIELD_INDICES.NAME, event: 'input' },
    { index: FIELD_INDICES.EMAIL, event: 'input' },
    { index: FIELD_INDICES.PHONE, event: 'input' },
    { index: FIELD_INDICES.BIRTH, event: 'change' }, // change für date-Felder
    { index: FIELD_INDICES.URL, event: 'input' }
];

fieldConfig.forEach(config => {
    input[config.index].addEventListener(config.event, () => validateField(config.index));
});

// Spezielle Event-Listener für Passwort-Felder
password.addEventListener('input', () => validateField(FIELD_INDICES.PASSWORD));
confirm.addEventListener('input', () => validateField(FIELD_INDICES.CONFIRM));

// Checkbox-Event-Listener
checkbox.addEventListener('change', () => {
    validateCheckbox("Bitte stimmen Sie dem Datenschutz zu");
    updateSubmitButton();
});

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    // Auto-Focus auf erstes Feld (Anforderung 1a)
    const nameField = document.getElementById('name');
    if (nameField) {
        nameField.focus();
    }

    // Submit-Button initial deaktivieren, wenn Formular nicht valide ist
    updateSubmitButton();
});
