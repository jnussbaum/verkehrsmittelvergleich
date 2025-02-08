const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const computeDurationAxis = (value: number | string) => {
    // this is just to make the type checker happy. it should never happen
    if (typeof value === "string") return value;

    if (value >= (DAY - 0.5 * HOUR)) {  // 23.5h -> 1d
        // round on 0.5 d precision: round the double of the value, then divide by 2
        return `${Math.round((value / DAY) * 2) / 2}d`;
    } else if (value > (10 * HOUR)) {
        // round on 1 hour precision: round the number
        return `${Math.round(value / HOUR)}h`;
    } else if (value >= (HOUR - 2.5 * MINUTE)) {  // 57.5min -> 1h
        // round on 30 min precision: round the double of the value, then divide by 2
        return `${Math.round((value / HOUR) * 2) / 2}h`;
    } else if (value > (10 * MINUTE)) {
        // round on 5 min precision: round the 5th of the value, then multiply by 5
        return `${Math.round(value / (60 * 5)) * 5}min`;
    } else if (value > (4 * MINUTE)) {
        // round on 1 min precision: round the number
        return `${Math.round(value / MINUTE)}min`;
    }
    else {
        // round on 0.5 min precision: round the double, then divide by 2
        return `${Math.round((value / MINUTE) * 2) / 2}min`;
    }
};


const KM = 1000;

export const computeDistanceAxis = (value: number | string) => {
    // this is just to make the type checker happy. it should never happen
    if (typeof value === "string") return value;

    if (value > (100 * KM)) {
        // round on 50 km precision: round the 50th of the value, then multiply by 50
        return `${Math.round(value / (1000 * 50)) * 50}km`;
    } else if (value >= 975) {
        // round on 0.5 km precision: round the double of the value, then divide by 2
        return `${Math.round((value / 1000) * 2) / 2}km`;
    } else {
        // round on 50 m precision: round the 50th of the value, then multiply by 50
        return `${Math.round(value / 50) * 50}m`;
    }
}
