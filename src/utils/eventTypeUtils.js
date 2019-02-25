import * as eventTypes from '../constants/EventTypes';

export function of(eventTypeAbbr) {
    Object.values(eventTypes).forEach((eventType) => {
        if(eventType.abbr === eventTypeAbbr) {
            return eventType;
        }
    });
}