import { computeDurationAxis, computeDistanceAxis } from "./computeDiagramAxis";

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("computeDurationAxis", () => {

    it("should round with 0.5 day precision for values {x | x >= 1d}", () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 5 * HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 6 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 17 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 18 * HOUR)).toBe("2d");
        expect(computeDurationAxis(DAY + 23 * HOUR)).toBe("2d");
    });

    it("should round with 1h precision for values {x | 10h < x < 1d}", () => {
        expect(computeDurationAxis(10 * HOUR + 29 * MINUTE)).toBe("10h");
        expect(computeDurationAxis(10 * HOUR + 30 * MINUTE)).toBe("11h");
        expect(computeDurationAxis(23 * HOUR + 30 * MINUTE)).toBe("1d");
    });

    it("should round with 0.5h precision for values {x | 1h < x < 10h}", () => {
        expect(computeDurationAxis(HOUR + 14 * MINUTE)).toBe("1h");
        expect(computeDurationAxis(HOUR + 15 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 44 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 45 * MINUTE)).toBe("2h");
    });

    it("should round with 5min precision for values {x | 10 min < x < 1h}", () => {
        expect(computeDurationAxis(12 * MINUTE)).toBe("10min");
        expect(computeDurationAxis(13 * MINUTE)).toBe("15min");
        expect(computeDurationAxis(57 * MINUTE)).toBe("55min");
        expect(computeDurationAxis(58 * MINUTE)).toBe("1h");
    });

    it("should round with 1min precision for values {x | 4 min < x < 10min}", () => {
        expect(computeDurationAxis(4.4 * MINUTE)).toBe("4min");
        expect(computeDurationAxis(4.5 * MINUTE)).toBe("5min");
        expect(computeDurationAxis(9.4 * MINUTE)).toBe("9min");
        expect(computeDurationAxis(9.5 * MINUTE)).toBe("10min");
    });

    it("should round with 0.5min precision for values {x | x < 4min}", () => {
        expect(computeDurationAxis(1.2 * MINUTE)).toBe("1min");
        expect(computeDurationAxis(1.3 * MINUTE)).toBe("1.5min");
        expect(computeDurationAxis(3.2 * MINUTE)).toBe("3min");
        expect(computeDurationAxis(3.3 * MINUTE)).toBe("3.5min");
    });
});


const KM = 1000;

describe("computeDistanceAxis", () => {

    it("should round with 50km precision for values {x | x > 100km}", () => {
        expect(computeDistanceAxis(124 * KM)).toBe("100km");
        expect(computeDistanceAxis(125 * KM)).toBe("150km");
        expect(computeDistanceAxis(174 * KM)).toBe("150km");
        expect(computeDistanceAxis(175 * KM)).toBe("200km");
    });

    it("should round with 0.5km precision for values {x | 1km < x < 100km}", () => {
        expect(computeDistanceAxis(1.24 * KM)).toBe("1km");
        expect(computeDistanceAxis(1.25 * KM)).toBe("1.5km");
        expect(computeDistanceAxis(99.74 * KM)).toBe("99.5km");
        expect(computeDistanceAxis(99.75 * KM)).toBe("100km");
    });

    it("should round on 50m precision for values {x | x < 975m}", () => {
        expect(computeDistanceAxis(24)).toBe("0m");
        expect(computeDistanceAxis(25)).toBe("50m");
        expect(computeDistanceAxis(74)).toBe("50m");
        expect(computeDistanceAxis(75)).toBe("100m");
        expect(computeDistanceAxis(974)).toBe("950m");
        expect(computeDistanceAxis(975)).toBe("1km");
    });
});
