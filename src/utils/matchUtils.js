import _get from 'lodash/get';
import _sum from 'lodash/sum';

import * as eventTypes from '../constants/EventTypes';
import * as preMatchOptions from '../constants/preMatchOptions';
import * as postMatchOptions from '../constants/postMatchOptions';
import {cargoShipEventList, rocketEventList} from "./eventTypeUtils";



export function matchId(rawResult) {
    return `${rawResult.matchNum}::${rawResult.teamNum}`;
}

function getEmptyTaskMap() {
    const taskMap = {};

    Object.values(eventTypes).forEach((eventType) => { taskMap[eventType.abbr] = []; });
    return taskMap;
}

export function generateProcessedTasks(rawResult) {
    const taskMap = getEmptyTaskMap();
    const timeline = [...rawResult.timeline];

    let lastEvent = timeline.splice(0, 1)[0];
    timeline.forEach((event) => {
        taskMap[event.eventType].push(event.time - lastEvent.time);
        lastEvent = event;
    });

    return taskMap;
}

export function calculatePoints(result) {
    const preMatchpts = preMatchOptions.position.options.find(
        (option) => option.text === _get(result, `preMatch.${preMatchOptions.position.label}`)
    ).points;

    const rocketPts = _sum(rocketEventList.map((event) => _get(result, `taskMap.${event.abbr}`).length * event.points));
    const cargoShipPts = _sum(cargoShipEventList.map((event) => _get(result, `taskMap.${event.abbr}`).length * event.points));

    const climbPts = postMatchOptions.position.options[_get(result, `postMatch.${postMatchOptions.position.name}`)].points *
        (_get(result, `postMatch.${postMatchOptions.buddyClimbs.name}`) + 1);

    return { rocketPts, cargoShipPts, habPts: _sum([climbPts, preMatchpts]), totalPts: _sum([preMatchpts, rocketPts, cargoShipPts, climbPts]) };
}