# Naturbeobachtungs-Portal

## Projektbeschreibung

Das **Naturbeobachtungs-Portal** ist ein responsives HTML/CSS-Mockup, das im Rahmen einer Übung zur Erstellung eines professionellen Webauftritts entwickelt wurde. Das Portal ermöglicht es Nutzern, Naturbeobachtungen zu dokumentieren, zu durchsuchen und zu verwalten.

## Projektstatus

**Aktueller Stand:** Übung 03 - Basis-Programmierung (HTML/CSS-Mockup)  
**Entwicklungsphase:** Erste Ausbaustufe (Programmieraufgabe 1)

## Technische Umsetzung

### Technologien
- **HTML5** – Semantische Markup-Struktur
- **CSS3** – Responsive Web Design mit Flexbox und Grid
- **Mobile-First Ansatz** – Optimiert für alle Bildschirmgrößen

### Struktur
- **6 HTML-Seiten:** index.html, detail.html, login.html, Registrierung.html, Kontakt.html, Impressum.html
- **Zentrales Stylesheet:** style.css
- **Responsive Design:** Breakpoints für Mobile, Tablet und Desktop

### Design-Prinzipien
- **Semantisches HTML5:** Verwendung von `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`
- **Barrierefreiheit:** Labels mit `for`-Attributen, `alt`-Texte, ARIA-Labels, Keyboard-Navigation
- **Wartbarkeit:** CSS-Variablen, strukturierte Kommentare, konsistente Klassen-Namen
- **Mobile-First:** Optimiert für Smartphones, Tablets und Desktop

## Seitenübersicht

### index.html
Hauptseite mit Übersichtskarte, Suchfunktion und Grid-Layout aller Beobachtungen. Jede Beobachtung wird als `<article>` dargestellt.

### detail.html
Detailansicht einer einzelnen Beobachtung mit Bild, Metadaten-Tabelle und Kommentarformular.

### login.html
Login-Formular für bestehende Benutzer.

### Registrierung.html
Registrierungsformular zur Erstellung neuer Benutzerkonten.

### Kontakt.html
Kontaktformular für Nutzeranfragen.

### Impressum.html
Rechtliche Informationen und Kontaktdaten.

## Responsive Design

Das Design passt sich automatisch an verschiedene Bildschirmgrößen an:

- **Mobile** (< 768px): Einspaltiges Layout, vertikale Navigation, optimierte Touch-Bedienung
- **Tablet** (768px - 1199px): Zweispaltiges Grid für Beobachtungen
- **Desktop** (≥ 1200px): Dreispaltiges Grid für Beobachtungen, horizontale Navigation

## Wichtige Features

- ✅ Responsive Design für alle Geräte
- ✅ Semantisches HTML5-Markup
- ✅ Barrierefreie Formulare mit Labels und `required`-Attributen
- ✅ Einheitliches Design-System mit CSS-Variablen
- ✅ Optimierte Lesbarkeit und Benutzerfreundlichkeit
- ✅ Konsistente Navigation auf allen Seiten

## Projektstruktur

```
website/
├── index.html              # Hauptseite
├── detail.html             # Detailansicht
├── login.html              # Login-Seite
├── Registrierung.html      # Registrierungsseite
├── Kontakt.html            # Kontaktseite
├── Impressum.html          # Impressum
├── style.css               # Zentrales Stylesheet
├── README.md               # Diese Datei

## Entwickler

**Autor:** Tobias  
**Projekt:** Übung 03 - Basis-Programmierung (Web-Technologien)  

## Hinweise

Dieses Projekt ist ein **Mockup** ohne Backend-Funktionalität. Alle Formulare verwenden `action="#"` und `method="get"`. Die PHP-Logik wird in späteren Übungsaufgaben implementiert.

## Lizenz

Dieses Projekt wurde im Rahmen einer Hochschulübung erstellt und dient ausschließlich Lernzwecken.

