export enum TravelMode {
    DRIVE = "DRIVE",
    TRANSIT = "TRANSIT",
    TWO_WHEELER = "TWO_WHEELER",
    BICYCLE = "BICYCLE",
    WALK = "WALK",
}


export interface RawTravelData {
    durationSeconds: number
    distanceMeters: number
}


export interface FormattedTravelData {
    formattedTime: string
    formattedDistance: string
}


export interface AllTravelData {
    drive: FormattedTravelData | undefined
    transit: FormattedTravelData | undefined
    twoWheeler: FormattedTravelData | undefined
    bicycle: FormattedTravelData | undefined
    walk: FormattedTravelData | undefined
}


export interface AllTravelDataUnformatted {
    driveRaw: RawTravelData | undefined
    transitRaw: RawTravelData | undefined
    twoWheelerRaw: RawTravelData | undefined
    bicycleRaw: RawTravelData | undefined
    walkRaw: RawTravelData | undefined
}


export interface Payload {
    "origin": { "address": string },
    "destination": { "address": string },
    "travelMode": TravelMode,
    "languageCode": string,
    "routingPreference"?: string,
    "departureTime"?: string,
}


export class ApiResponse {
    "distanceMeters": number
    "duration": string

    constructor(distanceMeters: number, duration: string) {
        this.distanceMeters = distanceMeters;
        this.duration = duration;
    }
}
