# CAS Programmierarbeit: Verkehrsmittel-Vergleich

&nbsp;

**🚀 Besuche unsere App live auf <https://jnussbaum.github.io/verkehrsmittelvergleich/>! 🚀**

&nbsp;

## Unser Projekt

Eine einfache React App, welche für ein Startort-Zielort-Paar verschiedene Verkehrsmittel anzeigt.
Der User kann Abfahrtsort, Abfahrtszeit und Zielort angeben.
Ein Klick auf den "Los geht's" Button sendet im Hintergrund Requests an die
[Google Routes API](https://developers.google.com/maps/documentation/routes).

Die Responses werden schön aufbereitet, sodass der User die Verkehrsmittel punkto Distanz und Dauer vergleichen kann
(in Tabellenform und mit 2 Balkendiagrammen).

## Dokumentation

- Komponentendiagramm/UML: `docs/ComponentDiagram.puml`
- Rückblick/Lessons Learned: `docs/lessons-learned.md`

## Requirements für lokale Entwicklung

- Ein Google Routes API Key muss hinterlegt sein in `.env.development.local`, in der Form `VITE_API_KEY=xyz`.
- Starte einen lokalen Live-Server:
  - Variante 1:
    - Führe folgenden Befehl aus im Terminal: `docker-compose up --build`
    - Dazu muss [Docker Desktop](https://www.docker.com/) installiert sein.
  - Variante 2:
    - Führe folgenden Befehl aus im Terminal: `npm start`
    - Dazu muss Node (Version 23 oder höher) installiert sein.
- Navigiere in einem Browser zu <http://localhost:3000/>
- Die Code-Änderungen im Repository werden automatisch in der App reflektiert.


## Deployment auf github.io

github.io benötigt einen Google Routes API Key, der im Quellcode sichtbar sein wird.
Deshalb muss in `.env.production` die Variable `VITE_API_KEY` gesetzt sein auf einen API Key,
dessen Gültigkeit auf den HTTP-Referrer <https://jnussbaum.github.io/> eingeschränkt ist.
Somit kann jedermann den API Key einsehen, aber nichts damit anfangen.

`npm run deploy` erstellt auf einem separaten Branch `gh-pages`
ein optimiertes Build (d.h. minimiertes JavaScript und CSS) und deployt es zu github.io.
Auf <https://jnussbaum.github.io/verkehrsmittelvergleich/> ist die App öffentlich erreichbar,
in dem Zustand, wie sie beim letzten Mal `npm run deploy` war.
Nach jeder Code-Änderung muss der Befehl erneut ausgeführt werden.

## Impressum

- Studenten: Roman Leuenberger, Johannes Nussbaum
- Thematische Anbindung: Jürg Nietlispach: Funktionale Programmierung
- Studiengang: HSLU: CAS Modern Software Engineering & Development
- Aufgabenstellung: Im Rahmen des CAS müssen wir eine Programmierarbeit durchführen.
  Aufwand ca. 40 Stunden. Die Arbeit besteht aus 2 Teilen:
  - Code (muss lauffähig sein, aber eher prototyp-mässig)
  - Komponentendiagramm/UML
