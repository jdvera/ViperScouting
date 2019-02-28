import * as eventTypes from '../constants/EventTypes';

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