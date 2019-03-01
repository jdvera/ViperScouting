import { combineReducers } from 'redux';
import _get from 'lodash/get';
import _mean from 'lodash/mean';
import {validateRawResults} from "../utils/validators";
import {generateProcessedTasks, matchId} from "../utils/matchUtils";
import {findTeamMatches} from "./selectors";
import {eventTypeAbbrList} from "../utils/eventTypeUtils";

const resultsReducer = (state = {}, action) => {

    switch (action.type) {
        case 'SAVE_MATCH_OFFLINE':
            const rawResult = _get(action, "payload", {});
            if (!validateRawResults(rawResult)) {
                console.warn("Improperly formatted payload for saveGameOffline()");
                return state
            }
            return Object.assign(state,{
                    [matchId(rawResult)]:
                        Object.assign(rawResult, {
                            'submitted': false,
                            'taskMap': generateProcessedTasks(rawResult)
                        })
                }
                );
        default:
            return state;
    }
};


const assignTeamState = (state, teamNum, source) => {
    return Object.assign(state,
        {
            [`_${teamNum}`]: Object.assign(_get(state, teamNum, {}), source)
        });
}

const teamReducer = (state = { }, action) => {

    const teamNum = _get(action, "payload.teamNum", 0);

    switch (action.type) {
        case 'ADD_RESULT':
            const matchIds = [..._get(state, `_${teamNum}.matches`, []), matchId(action.payload)];
            return assignTeamState(state,  teamNum, { matches: matchIds });
        case 'CALCULATE_AVERAGES':
            const matches = findTeamMatches(action.state, { teamNum: action.payload.teamNum });
            const taskAverageMap = {};

            eventTypeAbbrList.forEach((eventTypeAbbr) => {
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
                });
                taskAverageMap[eventTypeAbbr] = { count: _mean(matchCount), time: _mean(allTasks)};
            });
            return assignTeamState(state, teamNum, { taskAverageMap });
        default:
            return state;
    }
};


const reducer = combineReducers({
    results: resultsReducer,
    teams: teamReducer
});

export default reducer;
