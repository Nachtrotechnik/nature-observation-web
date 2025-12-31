# Helferdatei  – Bootstrap Framework (Übung 3)

Diese Datei erklärt alle Bootstrap-Konzepte, Komponenten und Utility-Klassen, die in Übung 3 verwendet wurden, um CSS durch Bootstrap zu ersetzen.

---

## 1. BOOTSTRAP EINBINDUNG

### CDN-Link
Bootstrap wird über einen CDN-Link eingebunden:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
```

**Vorteile:**
- Keine lokale Installation nötig
- Immer aktuelle Version verfügbar
- Schnelles Laden durch CDN

**Version:** Bootstrap 5.3.8 (wie in der Übung gefordert)

---

## 2. GRID SYSTEM

### Container
Container umschließen den Inhalt und sorgen für zentrierte Ausrichtung mit maximaler Breite.

**Klassen:**
- `container` - Feste maximale Breite, responsive
- `container-fluid` - Volle Breite des Viewports

**Beispiel aus dem Projekt:**
```html
<div class="container-fluid d-flex ...">
```

**Verwendung:** Header, Footer, Main-Content-Bereiche

---

### Row & Columns
Das Bootstrap Grid-System basiert auf 12 Spalten.

**Klassen:**
- `row` - Zeile für Spalten
- `col-*` - Spalten (z.B. `col-12`, `col-md-6`, `col-lg-4`)
- `g-*` - Gap zwischen Spalten (z.B. `g-4`)

**Beispiel aus dem Projekt:**
```html
<div class="container">
    <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4">
            <!-- Card -->
        </div>
    </div>
</div>
```

**Responsive Breakpoints:**
- `col-12` - Mobile: 100% Breite
- `col-md-6` - Tablet (≥768px): 50% Breite
- `col-lg-4` - Desktop (≥992px): 33% Breite

---

## 3. FLEXBOX UTILITIES

Bootstrap bietet umfangreiche Flexbox-Utilities für Layouts.

### Display
- `d-flex` - Flexbox aktivieren
- `d-block` - Block-Element
- `d-inline` - Inline-Element

### Direction
- `flex-column` - Vertikale Ausrichtung
- `flex-row` - Horizontale Ausrichtung (Standard)
- `flex-md-row` - Horizontale Ausrichtung ab Medium-Breakpoint

**Beispiel aus dem Projekt:**
```html
<div class="d-flex flex-column flex-md-row justify-content-between">
```

### Justify Content
- `justify-content-start` - Links ausrichten
- `justify-content-end` - Rechts ausrichten
- `justify-content-center` - Zentrieren
- `justify-content-between` - Raum zwischen Elementen
- `justify-content-around` - Raum um Elemente

### Align Items
- `align-items-center` - Vertikal zentrieren
- `align-items-start` - Oben ausrichten
- `align-items-end` - Unten ausrichten
- `align-items-stretch` - Dehnen

### Align Self
- `align-self-center` - Einzelnes Element zentrieren
- `align-self-start` - Einzelnes Element oben
- `align-self-end` - Einzelnes Element unten
- `align-self-baseline` - Baseline-Ausrichtung

**Beispiel aus dem Projekt:**
```html
<figure class="figure align-self-center">
<h1 class="h1 align-self-baseline text-uppercase text-white">
<nav class="align-self-end">
```

### Flex Grow
- `flex-grow-1` - Element nimmt verfügbaren Platz ein

**Verwendung für Sticky Footer:**
```css
main {
    flex-grow: 1;
}
```

---

## 4. SPACING UTILITIES

Bootstrap bietet konsistente Abstände durch Utility-Klassen.

### Margin
- `m-*` - Margin alle Seiten (0-5)
- `mt-*` - Margin top
- `mb-*` - Margin bottom
- `ms-*` - Margin start (links)
- `me-*` - Margin end (rechts)
- `mx-*` - Margin horizontal
- `my-*` - Margin vertical

**Beispiele:**
- `mt-2` = 0.5rem (8px)  
  *(rem bedeutet "root em" und bezieht sich auf die Schriftgröße des <html>-Elements, also meist 16px)*
- `mt-3` = 1rem (16px)
- `mt-4` = 1.5rem (24px)
- `mb-0` = 0

**Beispiel aus dem Projekt:**
```html
<header class="pt-3 pt-md-4">
<div class="text-center my-3">
```

### Padding
- `p-*` - Padding alle Seiten
- `pt-*` - Padding top
- `pb-*` - Padding bottom
- `ps-*` - Padding start
- `pe-*` - Padding end
- `px-*` - Padding horizontal
- `py-*` - Padding vertical

**Beispiel aus dem Projekt:**
```html
<div class="px-2 px-md-4 py-2">
<main class="py-2 py-md-3 px-2 px-md-3">
```

### Gap
- `gap-*` - Abstand zwischen Flexbox-Items
- `gap-2` = 0.5rem
- `gap-md-4` = 1.5rem, gilt ab dem "md" (Medium) Breakpoint

**Hinweis:**  
Der Medium-Breakpoint (`md`) ist in Bootstrap standardmäßig bei `min-width: 768px` festgelegt.  
Das bedeutet: Die Klasse `gap-md-4` sorgt ab einer Bildschirmbreite von 768px oder mehr für einen Abstand von 1.5rem zwischen Flex-Items.
### Bootstrap Breakpoints

Bootstrap verwendet folgende Standard-Breakpoints (ab Bootstrap 5):

| Alias  | min-width | Beschreibung             |
|--------|-----------|--------------------------|
| xs     | 0         | Extra small (mobile)     |
| sm     | 576px     | Small (mobile quer)      |
| md     | 768px     | Medium (Tablet)          |
| lg     | 992px     | Large (Desktop)          |
| xl     | 1200px    | Extra large (großer Bildschirm) |
| xxl    | 1400px    | Extra extra large        |

**Verhalten:**  
Breakpoints funktionieren "mobile first", d.h. ab der definierten `min-width` wird die jeweilige Klasse angewendet.

**Beispiel für `gap-md-4`:**  
Wirkt **nur** ab einer Bildschirmbreite von **768px** oder mehr (`md`).

**Typische Anwendung in den Klassen:**  
- `col-md-6` → ab 768px 6 Spalten breit  
- `d-lg-flex` → ab 992px Display-Mode `flex`
- `py-xl-5` → ab 1200px vertikal Padding 3rem

**Tipp:**  
Du kannst Breakpoints in fast allen Responsive-Utility-Klassen wie folgt verwenden:  
- `<klasse>-<breakpoint>-<wert>` (z.B. `mb-md-4`, `fs-xl-1`)
  
Weitere Infos: [Bootstrap Breakpoints Doku](https://getbootstrap.com/docs/5.3/layout/breakpoints/)

**Beispiel aus dem Projekt:**
```html
<div class="d-flex gap-2 gap-md-4">
```

---

## 5. BUTTONS

### Button-Klassen
- `btn` - Basis-Button-Klasse
- `btn-success` - Grüner Button (primäre Aktionen)
- `btn-outline-success` - Grüner Umriss-Button (sekundäre Aktionen)
- `btn-outline-light` - Heller Umriss-Button (auf dunklem Hintergrund)
- `btn-link` - Link-Style Button

**Beispiel aus dem Projekt:**
```html
<button class="btn btn-success">Anmelden</button>
<a href="detail.html" class="btn btn-outline-success">Details</a>
<button class="btn btn-outline-light">Suchen</button>
```

**Button-Varianten im Projekt:**
- Primäre Aktionen: `btn-success` (Anmelden, Senden, Benutzerkonto erstellen)
- Sekundäre Aktionen: `btn-outline-success` (Details, Pagination, Merkliste, "mehr")
- Header/Footer: `btn-outline-light` (Suchen, Newsletter)

---

## 6. FORMS

### Form Controls
- `form-control` - Standard Input-Feld
- `form-label` - Label für Formularfelder
- `form-check-input` - Checkbox/Radio-Button
- `form-check-label` - Label für Checkboxen

**Beispiel aus dem Projekt:**
```html
<label class="form-label" for="name">Name</label>
<input class="form-control" type="text" id="name" name="name" required>
<input class="form-check-input" type="checkbox" id="datenschutz">
```

### Input Groups
- `input-group` - Container für Input + Button
- `input-group-sm` - Kleine Variante (wurde entfernt für einheitliche Schriftgrößen)

**Beispiel aus dem Projekt:**
```html
<form class="input-group w-100 w-md-50" role="search">
    <label class="ms-3 me-3 mb-0 align-self-center" for="suche">Beobachtungen:</label>
    <input class="form-control" type="text" id="suche" name="q" placeholder="Beobachtungen">
    <button class="btn btn-outline-light" type="submit">Suchen</button>
</form>
```

---

## 7. FORM VALIDATION (Bootstrap)

Bootstrap bietet eingebaute Validierung ohne JavaScript.

### Klassen
- `needs-validation` - Auf Formular-Element
- `was-validated` - Nach erstem Submit-Versuch
- `invalid-feedback` - Fehlermeldung
- `required` - Pflichtfeld-Attribut

**Beispiel aus dem Projekt:**
```html
<form id="registrierung-form" class="needs-validation" novalidate>
    <input type="text" class="form-control" id="name" required>
    <div class="invalid-feedback">
        Bitte geben Sie Ihren Namen ein.
    </div>
</form>
```

### JavaScript für Validierung – Erklärung der Funktion

Das folgende JavaScript sorgt dafür, dass das Bootstrap-Validierungs-Design nur dann angezeigt wird, wenn der Benutzer das Formular absendet und mindestens ein Pflichtfeld nicht ausgefüllt ist.

**Funktionsweise im Detail:**

- Das Formular mit der ID `registrierung-form` wird ausgewählt.
- Ein Event-Listener für das `submit`-Ereignis wird hinzugefügt.
- Beim Abschicken des Formulars wird mit `form.checkValidity()` geprüft, ob alle eingebauten HTML5-Validierungsregeln (z.B. required) erfüllt sind.
- Ist das Formular **nicht** gültig, wird das Abschicken mit `e.preventDefault()` und `e.stopPropagation()` verhindert.
- Egal ob gültig oder nicht, bekommt das Formular die Klasse `was-validated`. Dadurch werden die Bootstrap-Validierungsstyles angezeigt.

**Code:**
```javascript
const form = document.getElementById('registrierung-form');
form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        e.preventDefault(); // Verhindert Abschicken, wenn ungültig
        e.stopPropagation(); // Stoppt das Ereignis für andere Listener
    }
    form.classList.add('was-validated'); // Zeigt Validierungs-Styles an
});
```

```

**Anforderung Übung 3:** Es genügt zu überprüfen, ob Pflichtfelder nicht leer sind.

---

## 8. CARDS

Cards sind Container für strukturierten Inhalt.

### Card-Klassen
- `card` - Basis-Card-Container
- `card-img-top` - Bild oben in Card
- `card-body` - Card-Inhalt
- `card-title` - Titel in Card
- `card-text` - Text in Card
- `h-100` - Volle Höhe (für gleich hohe Cards)

**Beispiel aus dem Projekt:**
```html
<article class="card h-100 d-flex flex-column">
    <img class="card-img-top" src="..." alt="...">
    <div class="card-body d-flex flex-column flex-grow-1">
        <h2 class="card-title">Titel</h2>
        <p class="card-text">Text</p>
        <a href="detail.html" class="btn btn-outline-success mt-auto">Details</a>
    </div>
</article>
```

**Trick für gleich hohe Cards:**
- `h-100` auf Card
- `d-flex flex-column` auf Card
- `flex-grow-1` auf card-body
- `mt-auto` auf Button (schiebt Button nach unten)

---

## 9. NAVBAR & NAVIGATION

### Navbar-Komponenten
- `navbar-nav` - Navigation-Liste
- `nav-item` - Navigation-Item
- `nav-link` - Navigation-Link

**Beispiel aus dem Projekt:**
```html
<nav aria-label="Hauptnavigation">
    <ul class="navbar-nav d-flex flex-row gap-2">
        <li class="nav-item">
            <a class="nav-link text-white" href="index.html">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-white" href="login.html">Login</a>
        </li>
    </ul>
</nav>
```

**Responsive Navigation:**
- Immer sichtbar (kein Hamburger-Menü, da JavaScript für Design vermieden wird)
- Flexbox-Layout passt sich automatisch an

---

## 10. BACKGROUND UTILITIES

### Background-Klassen
- `bg-success` - Grüner Hintergrund
- `bg-secondary` - Grauer Hintergrund
- `bg-gradient` - Gradient-Effekt

**Beispiel aus dem Projekt:**
```html
<div class="bg-success bg-gradient text-white">
<div class="bg-secondary bg-gradient text-white">
```

---

## 11. TEXT UTILITIES

### Text-Ausrichtung
- `text-center` - Zentriert
- `text-start` - Links
- `text-end` - Rechts

### Text-Farbe
- `text-white` - Weißer Text
- `text-black` - Schwarzer Text

### Text-Transformation
- `text-uppercase` - Großbuchstaben
- `text-lowercase` - Kleinbuchstaben
- `text-capitalize` - Erster Buchstabe groß

### Text-Wrapping
- `text-nowrap` - Kein Zeilenumbruch

**Beispiel aus dem Projekt:**
```html
<h1 class="h1 text-uppercase text-white">Naturbeobachtungen</h1>
<!--
text-nowrap ist eine Bootstrap Utility-Klasse, die verhindert, dass der enthaltene Text in die nächste Zeile umbricht. 
Das bedeutet: Der Text bleibt immer in einer Zeile, auch wenn er eigentlich umgebrochen werden müsste.
-->
<label class="text-nowrap">Beobachtung hinzufügen</label>
```

---

## 12. RESPONSIVE UTILITIES

Bootstrap verwendet Breakpoints für responsive Design.

### Breakpoints
- Kein Präfix: Mobile First (< 576px)
- `sm`: ≥576px (Small)
- `md`: ≥768px (Medium)
- `lg`: ≥992px (Large)
- `xl`: ≥1200px (Extra Large)
- `xxl`: ≥1400px (Extra Extra Large)

### Responsive Klassen
- `w-100` - Mobile: 100% Breite
- `w-md-50` - Ab Medium: 50% Breite
- `flex-md-row` - Ab Medium: Horizontale Ausrichtung
- `px-md-4` - Ab Medium: Größeres Padding
- `pt-md-4` - Ab Medium: Größeres Padding top

**Beispiel aus dem Projekt:**
```html
<form class="input-group w-100 w-md-50">
<div class="d-flex flex-column flex-md-row">
<header class="pt-3 pt-md-4">
```

---

## 13. WIDTH & HEIGHT UTILITIES

### Width
- `w-25` - 25% Breite
- `w-50` - 50% Breite
- `w-75` - 75% Breite
- `w-100` - 100% Breite

**Beispiel aus dem Projekt:**
```html
<form class="input-group w-100 w-md-50">
```

### Height
- `h-100` - 100% Höhe (für Cards)

---

## 14. TABLES

### Table-Klassen
- `table` - Basis-Tabelle
- `table-striped` - Zebra-Streifen

**Beispiel aus dem Projekt:**
```html
<table class="table table-striped">
```

---

## 15. CUSTOM CSS (Minimal)

Nur notwendiges Custom CSS bleibt erhalten:

### Typografie
```css
body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: #333;
}
h1, h2, h3, h4, h5, h6 {
    color: #000;
}
```

### Einheitliche Schriftgrößen
```css
.form-control, .form-label, .btn, label {
    font-size: 16px;
}
```

### Sticky Footer
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
main {
    flex-grow: 1;
}
```

### Card-Images
```css
.card-img-top {
    height: 200px;
    object-fit: cover;
    object-position: center;
}
```

### Responsive Body-Padding
```css
body {
    padding-left: 0;
    padding-right: 0;
}
@media screen and (min-width: 768px) {
    body {
        padding-left: 60px;
        padding-right: 60px;
    }
}
```

---

## 16. BEST PRACTICES IM PROJEKT

### 1. CSS durch Bootstrap ersetzen
- ✅ Layout: Grid System statt Custom CSS
- ✅ Flexbox: Bootstrap Utilities statt Custom Flexbox
- ✅ Spacing: Utility-Klassen statt Custom Margin/Padding
- ✅ Buttons: Bootstrap Button-Klassen
- ✅ Forms: Bootstrap Form-Klassen
- ✅ Responsive: Bootstrap Breakpoints

### 2. Minimales Custom CSS
- Nur Typografie (Font-Familie, -Größe, -Farbe)
- Sticky Footer (Flexbox-Layout)
- Card-Image-Sizing (object-fit)
- Responsive Body-Padding (spezifische Anforderung)

### 3. Formular-Validierung
- Bootstrap `needs-validation` und `invalid-feedback`
- Minimales JavaScript nur für `was-validated` Klasse
- `required` Attribute für Pflichtfelder
- Prüfung: Nur ob Pflichtfelder nicht leer sind

### 4. Responsive Design
- Mobile-First Ansatz
- Breakpoints für Tablet und Desktop
- Flexbox passt sich automatisch an
- Grid-System für Card-Layout

### 5. Konsistenz
- Einheitliche Button-Varianten
- Einheitliche Schriftgrößen
- Einheitliche Farben (grünes Theme)
- Einheitliche Abstände

---

## 17. ZUSAMMENFASSUNG

Dieses Projekt verwendet:

✅ **Bootstrap 5.3.8** über CDN  
✅ **Grid System** für Layout (container, row, col-*)  
✅ **Flexbox Utilities** für Ausrichtung (d-flex, justify-content, align-items)  
✅ **Spacing Utilities** für Abstände (m-*, p-*, gap-*)  
✅ **Button-Komponenten** (btn-success, btn-outline-success, btn-outline-light)  
✅ **Form-Komponenten** (form-control, form-label, needs-validation)  
✅ **Card-Komponenten** für Beobachtungs-Grid  
✅ **Navbar-Komponenten** für Navigation  
✅ **Background Utilities** (bg-success, bg-gradient)  
✅ **Text Utilities** (text-white, text-center, text-nowrap)  
✅ **Responsive Utilities** (w-md-*, flex-md-*, px-md-*)  
✅ **Bootstrap Form Validation** (needs-validation, invalid-feedback)  
✅ **Minimales Custom CSS** nur für Typografie, Sticky Footer und spezifische Anforderungen  

**Ergebnis:**
- CSS wurde so weit wie möglich durch Bootstrap ersetzt
- Responsive Web Design mit Bootstrap umgesetzt
- Formular-Validierung mit Bootstrap implementiert
- Professionelles, konsistentes Design auf allen Seiten
- Wartbarer, strukturierter Code

Diese Konzepte ermöglichen eine moderne, responsive Web-Anwendung mit minimalem Custom CSS und maximaler Nutzung des Bootstrap-Frameworks.

---
