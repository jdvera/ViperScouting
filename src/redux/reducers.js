import { combineReducers } from 'redux';
import _get from 'lodash/get';
import _mean from 'lodash/mean';
import _meanBy from 'lodash/meanBy';
import {validateRawResults} from "../utils/validators";
import {calculatePoints, generateProcessedTasks, matchId} from "../utils/matchUtils";
import {findTeamMatches} from "./selectors";
import {eventTypeAbbrList} from "../utils/eventTypeUtils";

const assignNestedState = (state, key, source) => {
    return Object.assign(state,
        {
            [key]: Object.assign(_get(state, key, {}), source)
        });
};

const resultsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_MATCH_OFFLINE':
            const rawResult = _get(action, "payload", {});
            if (!validateRawResults(rawResult)) {
                console.warn("Improperly formatted payload for saveGameOffline()");
                return state
            }
            const result = Object.assign(rawResult, {
                'submitted': false,
                'taskMap': generateProcessedTasks(rawResult)
            });

            result.points = calculatePoints(result);

            return assignNestedState(state, matchId(rawResult), result);

        default:
            return state;
    }
};

const teamReducer = (state = {}, action) => {
    const teamNum = _get(action, "payload.teamNum", 0);

    switch (action.type) {
        case 'ADD_RESULT':
            const matchIds = [..._get(state, `${teamNum}.matches`, []), matchId(action.payload)];
            return assignNestedState(state,  teamNum, { matches: matchIds });

        case 'CALCULATE_AVERAGES':
            const matches = findTeamMatches(action.globalState, { teamNum: action.payload.teamNum });
            const taskAverageMap = {};

            eventTypeAbbrList.forEach((eventTypeAbbr) => {

                console.log(eventTypeAbbr);

                const matchCount = [];
                const allTasks = [];
                matches.forEach((match) => {
                    const taskRecords = _get(match, `taskMap.${eventTypeAbbr}`);
                    if(!taskRecords) {
                        console.err(`Missing task information for task type ${eventTypeAbbr} in match ${matchId(match)}`);
                        return state;
                    }
                    matchCount.push(taskRecords.length);
                    allTasks.push(...taskRecords);
                    console.log(matchCount);
                    console.log(allTasks);
                });
                taskAverageMap[eventTypeAbbr] = { count: _mean(matchCount), time: _mean(allTasks)};
            });

            const avgPts = _meanBy(matches, `points.totalPts`);
            const avgRocketPts = _meanBy(matches, `points.rocketPts`);
            const avgCargoShipPts = _meanBy(matches, `points.cargoShipPts`);
            const avgClimbPts = _meanBy(matches, `points.climbPts`);

            return assignNestedState(state, teamNum, { taskAverageMap, avgPts, avgRocketPts, avgCargoShipPts, avgClimbPts });

        default:
            return state;
    }
};


const reducer = combineReducers({
    results: resultsReducer,
    teams: teamReducer
});

export default reducer;
