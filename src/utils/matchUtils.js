import _get from 'lodash/get';
import _sum from 'lodash/sum';

import * as eventTypes from '../constants/EventTypes';
import * as preMatchOptions from '../constants/preMatchOptions';
import * as postMatchOptions from '../constants/postMatchOptions';
import {cargoShipEventList, rocketCargoEventList, rocketHatchEventList} from "./eventTypeUtils";



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
    const preMatchpts = _get(preMatchOptions, `position.options.${_get(result, `preMatch.pos`, -1)}.points`, 0);

    //     preMatchOptions.position.options.find(
    //     (option) => option.text === _get(result, `preMatch.${preMatchOptions.position.label}`)
    // ).points;

    const rocketCargoPts = _sum(rocketCargoEventList.map((event) => _get(result, `taskMap.${event.abbr}`).length * event.points));
    const rocketHatchPts = _sum(rocketHatchEventList.map((event) => _get(result, `taskMap.${event.abbr}`).length * event.points));
    const cargoShipPts = _sum(cargoShipEventList.map((event) => _get(result, `taskMap.${event.abbr}`).length * event.points));

    const climbPts = _get(postMatchOptions, `position.options.${_get(result, `postMatch.pos`, -1)}.points`, 0) *
        (_get(result, `postMatch.${postMatchOptions.buddyClimbs.name}`) + 1);

    // console.log(`Calculating score for ${_get(result, `teamNum`)}: preMatchpts: ${preMatchpts} climbPts: ${climbPts}`);

    return {
        rocketPts: _sum([rocketCargoPts, rocketHatchPts]),
        rocketCargoPts,
        rocketHatchPts,
        cargoShipPts,
        habPts: _sum([climbPts, preMatchpts]),
        nonHabPts: _sum([rocketCargoPts, rocketHatchPts, cargoShipPts]),
        totalPts: _sum([preMatchpts, rocketCargoPts, rocketHatchPts, cargoShipPts, climbPts]) };
}