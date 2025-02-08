export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;


export function computeDistanceString(metersTotal: number): string {
    let meters;
    let kilometers;
    let megameters;

    // 0-999 m -> show meters
    if (metersTotal < 1000) {
        return `${metersTotal} m`;
    }

    // 1-100 km -> show kilometers with 1 decimal
    if (metersTotal >= 1000 && metersTotal <= 100_000) {
        kilometers = Math.floor(metersTotal / 1000);
        meters = metersTotal % 1000;
        let decimal = Math.round(meters / 100);
        if (decimal === 0) {
            return `${kilometers} km`
        } else if (decimal === 10) {
            return `${kilometers + 1} km`
        } else {
            return `${kilometers}.${decimal} km`
        }
    }

    // 100-10'000 km -> show kilometers without decimals
    if (metersTotal > 100_000 && metersTotal < 9_999_500) {
        kilometers = Math.round(metersTotal / 1000);
        return `${kilometers} km`;
    }

    // > 10'000 km -> show with thousands separator
    megameters = Math.round(metersTotal / 1_000_000);
    let km = Math.round((metersTotal % 1_000_000) / 1000).toString().padStart(3, "0");
    if (km === "1000") {
        km = "000";
    }
    return `${megameters}'${km} km`
}


export function computeTimeString(secondsTotal: number): string {
    let minutes;
    let hours;
    let days;

    if (secondsTotal < MINUTE) {
        // < 1min -> return seconds unchanged
        return `${secondsTotal} s`;
    }

    if (secondsTotal < (HOUR - 30)) {
        // < 59.5min -> return rounded minutes
        minutes = Math.round(secondsTotal / 60);
        return `${minutes} min`;
    }

    if (secondsTotal < (DAY - 30)) {
        // < 23h 59.5min -> return hours and rounded minutes
        hours = Math.floor(secondsTotal / HOUR);
        minutes = Math.round((secondsTotal % HOUR) / 60);
        if (minutes < MINUTE) {
            return `${hours}h ${minutes}min`
        } else {
            return `${hours + 1}h 0min`
        }
    }

    // from 23h 59.5min on: round up to 1d
    if (secondsTotal >= (DAY - 30) && secondsTotal < DAY) {
        return `1d 0h 0min`
    }

    // return days, hours and rounded minutes
    days = Math.floor(secondsTotal / DAY);
    hours = Math.floor((secondsTotal % DAY) / HOUR);
    minutes = Math.round((secondsTotal % HOUR) / 60);
    if (minutes === 60) {
        hours += 1;
        minutes = 0;
    }
    if (hours === 24) {
        days += 1;
        hours = 0;
    }
    return `${days}d ${hours}h ${minutes}min`
}
