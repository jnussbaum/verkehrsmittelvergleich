import { computeDistanceString, computeTimeString, MINUTE, HOUR, DAY } from "./stringFormatters";


describe("computeDistanceString", () => {
    it("should return 0-999m as-is", () => {
        expect(computeDistanceString(0)).toBe("0 m");
        expect(computeDistanceString(999)).toBe("999 m");
    });
    it("should round kilometers to 1 decimal, if 1-100 km", () => {
        expect(computeDistanceString(1_049)).toBe("1 km");
        expect(computeDistanceString(1_050)).toBe("1.1 km");
        expect(computeDistanceString(1_949)).toBe("1.9 km");
        expect(computeDistanceString(1_950)).toBe("2 km");
        expect(computeDistanceString(10_049)).toBe("10 km");
        expect(computeDistanceString(10_050)).toBe("10.1 km");
        expect(computeDistanceString(99_950)).toBe("100 km");
    });
    it("should show kilometers without decimals, if 100-10'000 km", () => {
        expect(computeDistanceString(9_999_499)).toBe("9999 km");
    });
    it("should show kilometers with thousands separator, if > 10'000 km", () => {
        expect(computeDistanceString(9_999_500)).toBe("10'000 km");
        expect(computeDistanceString(10_000_500)).toBe("10'001 km");
    });
});


describe("computeTimeString", () => {
    it("should return seconds as-is, if < 1min", () => {
        expect(computeTimeString(0)).toBe("0 s");
        expect(computeTimeString(58)).toBe("58 s");
    });
    it("should round with 1 minute precision, if < 59 min 30 s", () => {
        expect(computeTimeString(61)).toBe("1 min");
        expect(computeTimeString(130)).toBe("2 min");
        expect(computeTimeString((9 * MINUTE) + 20)).toBe("9 min");
        expect(computeTimeString((51 * MINUTE) + 40)).toBe("52 min");
    });
    it("should return hours and rounded minutes, if < 23h 59.5min", () => {
        expect(computeTimeString((59 * MINUTE) + 40)).toBe("1h 0min");
        expect(computeTimeString((1 * HOUR) + (12 * MINUTE) + 10)).toBe("1h 12min");
        expect(computeTimeString((1 * HOUR) + (58 * MINUTE) + 50)).toBe("1h 59min");
        expect(computeTimeString((2 * HOUR) + (0 * MINUTE) + 50)).toBe("2h 1min");
        expect(computeTimeString((9 * HOUR) + (59 * MINUTE) + 40)).toBe("10h 0min");
        expect(computeTimeString((21 * HOUR) + (2 * MINUTE) + 20)).toBe("21h 2min");
        expect(computeTimeString((23 * HOUR) + (59 * MINUTE) + 29)).toBe("23h 59min");
    });
    it("should round 23h 59.5min up to 1d 0h 0min", () => {
        expect(computeTimeString((23 * HOUR) + (59 * MINUTE) + 30)).toBe("1d 0h 0min");
    });
    it("should return days, hours and rounded minutes", () => {
        expect(computeTimeString((1 * DAY) + (0 * HOUR) + (0 * MINUTE) + 30)).toBe("1d 0h 1min");
        expect(computeTimeString((1 * DAY) + (12 * HOUR) + (35 * MINUTE) + 40)).toBe("1d 12h 36min");
        expect(computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 29)).toBe("5d 6h 59min");
        expect(computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 30)).toBe("5d 7h 0min");
        expect(computeTimeString((5 * DAY) + (23 * HOUR) + (59 * MINUTE) + 30)).toBe("6d 0h 0min");
    });
});

