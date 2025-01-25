export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;


export function computeDistanceString(meters_total: number): string {
    if (meters_total < 1000) {  // < 1 km
        return `${meters_total} m`;
    }
    if (meters_total > 100_000) {  // > 100 km
        const kilometers = Math.floor(meters_total / 1000);
        return `${kilometers} km`;
    }
    // 1 km <= meters_total <= 100 km
    const kilometers = Math.floor(meters_total / 1000);
    const meters = meters_total % 1000;
    const decimal = Math.round(meters / 100);
    if(decimal === 0) {
        return `${kilometers} km`
    } else if(decimal === 10) {
        return `${kilometers + 1} km`
    } else {
        return `${kilometers}.${decimal} km`
    }
}


export function computeTimeString(seconds_total: number): string {
    if (seconds_total < MINUTE) {
        return `${seconds_total}s`;
    }
    
    if (seconds_total < (HOUR - 30)) {  // < 59 min 30 s
        let minutes = Math.round(seconds_total / 60);
        return `${minutes}min`;
    }

    if (seconds_total < (DAY - 30)) {  // < 23 h 59 min 30 s
        const hours = Math.floor(seconds_total / HOUR);
        const minutes = Math.round((seconds_total % HOUR) / 60);
        if(minutes < MINUTE) {
            return `${hours}h ${minutes}min`
        } else {
            return `${hours + 1}h 0min`
        }
    }

    const days = Math.floor(seconds_total / DAY);
    const hours = Math.floor((seconds_total % DAY) / HOUR);
    return `${days}d ${hours}h`
}
