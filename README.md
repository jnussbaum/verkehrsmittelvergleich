# CAS Programmierarbeit: Verkehrsmittel-Vergleich 

Studenten: Roman Leuenberger, Johannes Nussbaum 

Thematische Anbindung: Jürg Nietlispach: Funktionale Programmierung 

Studiengang: CAS Modern Software Engineering & Development 

## Aufgabenstellung 

Im Rahmen des CAS müssen wir eine Programmierarbeit durchführen. Aufwand ca. 40 Stunden. Die Arbeit besteht aus 2 Teilen: 

- Code (muss lauffähig sein, aber eher prototyp-mässig) 
- Komponentendiagramm/UML 

## Unser Projekt

Eine einfache React App, welche für ein Startort-Zielort-Paar verschiedene Verkehrsmittel anzeigt.
Der User kann Abfahrtsort, Abfahrtszeit und Zielort angeben.
Ein Klick auf den "Los geht's" Button sendet im Hintergrund Requests an die Google Routes API 
(https://developers.google.com/maps/documentation/routes).
Die Responses werden schön aufbereitet, sodass der User die Verkehrsmittel punkto Distanz und Dauer vergleichen kann
(in Tabellenform und mit 2 Balkendiagrammen). 

## Requirements

- Ein gültiger Google Routes API Key muss hinterlegt sein in `.env`, in der Form `REACT_APP_API_KEY=xyz`.
- Führe folgende Befehle aus im Terminal: `docker-compose up --build`
- Navigiere in einem Browser zu <http://localhost:3000/>

## Dokumentation

- Komponentendiagramm/UML: `docs/ComponentDiagram.puml`
- Rückblick/Lessons Learned: `docs/lessons-learned.md`
