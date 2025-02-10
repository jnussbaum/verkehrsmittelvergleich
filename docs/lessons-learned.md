# Lessons Learned

## Einleitende Gedanken

Wir hatten zuvor beide keine Erfahrung in Webentwicklung,
deshalb benötigten wir anfangs viel Zeit, um uns vertraut zu machen
mit den Basics von Javascript, Typescript, Node, React, JSX/TSX und CSS.

## Einstieg überraschend einfach (Roman)

Zu Beginn war für mich schon so die Frage, wie wir beginnen sollen und wo startet man, wenn man eine WebApp komplett neu
aufsetzen will. Glücklicherweise ist das Setup sehr einfach und intuitiv auf der React-Homepage erklärt. Mit den
Templates konnte man sich zudem einen guten Überblick verschaffen, wie eine React-App in den Grundzügen aufgebaut ist.
Von da konnte wir uns dann Schritt für Schritt weiterentwickeln. Ich habe mir das im Vorfeld wesentlich komplizierter
vorgestellt.

## Es wächst und wächst (Roman)

Ich fand sehr spannend zu beobachten. Wie schnell eine App wachsen kann. Zu Beginn hat man vielleicht nur das App.tsx
File und packt ganz vieles da rein. Aber schon bald merkt man, dass es doch schöner wäre, wenn gewisse Dinge ausgelagert
und eingenständig wären. Also erstellt man die ersten Komponenten. Später im Prozess merkten wir dann, dass wir schon
fast zu viele einzelne Komponenten haben und diese sinnvollerweise noch gruppiert werden könnten, wie beispielsweise das
Fromular. So ist letztlich doch schon eine kleine Struktur entstanden, welche sich durch die Arbeit ergeben hat. Für
mich das Takeaway - in einem kleinen Setup muss nicht alles von Anfang an genaustens geplant sein. Es kann sich nach und
nach ergeben.

## Event Bus (Roman)

Den Event Bus zu entwickeln hat mir sehr Spass gemacht. Es ist zwar für eine so kleine Applikation etwas ein Overkill.
Aber so hätte man jetzt eine gute Basis für Erweiterungen implementieren zu können. Dabei hat jede Komponente die
Möglichkeit Ereignisse zu publizieren oder von anderen zu konsumieren, was die App sehr flexibel gestaltet.
Einfache Messages zu versenden war denn auch relativ einfach umzusetzen. Schlussendlich auch die Daten der Google-API zu
transportieren hat uns dann mehr Zeit gekostet. Aber letztlich meisterten wir auch diese Hürde.

## Asynchrone Callbacks (Johannes)

Besonders schwierig fand ich das Konzept der asynchronen Callbacks.
Ich komme aus der Python CLI Programmierung, wo eine Funktion die andere aufruft und wartet, bis sie zurückkehrt.
Deshalb wollte ich die Formatierung der API responses zuerst auch so implementieren, doch es hat nicht funktioniert.
Es hat lange gedauert, bis ich verstanden habe, dass ich folgendes React-spezifische Pattern anwenden muss:

```typescript
// App.tsx
const [travelData, setTravelData] = useState();
getTravelData(from, to, setTravelData);
return <ComparisonTable travelData = {travelData}
/>;

// googleMapsAPI.ts
async function getTravelData(
    from: string,
    to: string,
    setTravelData: (data) => void,
): Promise<void> {
    // make API calls to obtain `drive`, `bicycle`, ...)
    setTravelData({drive, bicycle, walk, twoWheeler, transit});
}
```

Dieses Pattern ist sehr ungewohnt für mich, aber ich finde es interessant.

## Optionale Werte (Johannes)

Die Google Routes API gibt nicht immer für jedes Verkehrsmittel eine Antwort.
Beispielsweise für das Motorrad wird fast nie etwas zurückgegeben.
Deshalb müssen alle Komponenten mit einem optionalen Wert umgehen können.

## Formatierung und Rundung der Rohdaten (Johannes)

Als überraschend komplex hat sich die Umrechnung der Rohdaten herausgestellt.
Die Distanzen und Zeiten werden in Metern/Sekunden zurückgegeben,
also mussten wir z.B. 19990s umrechnen zu 5h 33min 10s, und dann runden auf 5h 35min.

Wir mussten mit einem breiten Spektrum an Zeitmassen umgehen,
von wenigen Sekunden bis zu einigen Tagen, und immer sinnvoll runden.

Bei den Tabellenwerten sind die Folgen einer ungünstigen Rundung vernachlässigbar,
aber nicht so bei der Skalierung der Y-Achse des Balkendiagramms.
Wir mussten verhindern, dass durch Rundungsfehler zwei identische Ticks angezeigt werden.
Wenn beispielsweise eine Reise zu Fuss 960m weit ist, und mit dem Auto 1030 m,
dann muss verhindert werden, dass zwei separate Ticks "1000m" und "1km" angezeigt werden.

Unittests haben sich als nützliches Hilfsmittel erwiesen,
und ebenso die Reduzierung der maximalen Anzahl Ticks.

## Unittests mit Jest/Vitest (Johannes)

Ich habe viel Erfahrung mit Unit Tests in Python,
doch die Herangehensweise in Typescript ist anders als gewohnt.
Mir gefällt die Ähnlichkeit zur natürlichen Sprache,
wie z.B. in untenstehendem Beispiel:
"describe the function ... : It should do ...: expect function(argument) to be expected return value"

```typescript
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("computeDurationAxis", () => {
    it("should round with 0.5 day precision for values {x | x >= 1d}", () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1d");
    });
});
```

## Schlussgedanke (Johannes)

Einerseits finde ich es ein wenig schade, dass unser Produkt nun eher dürftig ausgefallen ist,
andererseits war es für mich eine sehr wertvolle Erfahrung, bei der ich sehr viel gelernt habe.

## Schlussgedanke (Roman)

Auf den ersten Blick fällt unsere App vielleicht etwas dürftig aus. Dennoch bin ich stolz auf was wir erreicht haben. Es
gelang uns, uns in ein neues Framework und in eine neue Sprache einzuarbeiten und damit ein Produkt zu entwickeln.
Darauf lässt sich sehr gut aufbauen.
