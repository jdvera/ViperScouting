import * as eventTypes from '../constants/EventTypes';

export function of(eventTypeAbbr) {
    Object.values(eventTypes).forEach((eventType) => {
        if(eventType.abbr === eventTypeAbbr) {
            return eventType;
        }
    });
}

export const eventTypeAbbrList = Object.values(eventTypes).map((eventType) => eventType.abbr);

export const rocketCargoEventList = Object.values(eventTypes)
    .filter((et) => et.category === "rocket" && et.piece === 'CARGO');

export const rocketHatchEventList = Object.values(eventTypes)
    .filter((et) => et.category === "rocket" && et.piece === 'HATCH');

export const cargoShipEventList = Object.values(eventTypes)
                                         .filter((eventType) => eventType.category === "cargoShip");