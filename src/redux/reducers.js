import { combineReducers } from 'redux';
import _get from 'lodash/get';
import _mean from 'lodash/mean';
import _meanBy from 'lodash/meanBy';
import _maxBy from 'lodash/maxBy';
import {validatePayload, validateRawResults} from "../utils/validators";
import {calculatePoints, generateProcessedTasks, matchId} from "../utils/matchUtils";
import {findTeamMatches} from "./selectors";
import {eventTypeAbbrList} from "../utils/eventTypeUtils";

const assignNestedState = (state, key, source) => {
    return Object.assign(state,
        {
            [key]: Object.assign(_get(state, key, {}), source)
        });
};

/**
 * Maintains a map from {matchId: {matchResult}}
 *  where matchResult is in the following form:
 *
 * {
       // Raw Result
       "matchNum": Number,
       "teamNum": Number,
       "submitted": Boolean,
       "preMatch": {
         "config": "cs_c",
         "piece": "hatch",
         "pos": "lvl_1",
       },
       "postMatch": {
         "broken": 3,
         "defense": 0,
         "host": 0,
         "liftability": 2,
         "pos": 3,
       },
       "timeline": [ { "eventType": String, "time":  Number } ... ],

       // Processed Tasks
       "taskMap": {
         EventType: [ Number... ], ... // Each Number in this array represents the robot performing task. The Number is how long that instance took in ms.
       },

       // Calculated Points
       "points": {
         "totalPts": Number,
         "rocketPts": Number,
         "cargoShipPts": Number,
         "habPts": Number,
       }
     }
 */
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

/**
 * Maintains a map from {teamNum: {teamInfo}}
 *  where teamInfo is in the following form:
 *  {
       "teamNum": String,
       "matches": [ matchId, ...],
       "taskAverageMap": {
         EventType: {
           "count": Number, // Average number of times the team performs the task each match
           "time": Number // Average time (in ms) the team performs the task
         }
       },
       "avgPoints": Number,
       "avgRocketPts": Number,
       "avgCargoShipPts": Number,
       "avgHabPts": Number,
     }
 */
const teamReducer = (state = {}, action) => {
    const teamNum = Number.parseInt(_get(action, "payload.teamNum", 0));

    switch (action.type) {
        case 'ADD_RESULT':
            const matchIds = [..._get(state, `${teamNum}.matches`, []), matchId(action.payload)];
            return assignNestedState(state,  teamNum, { matches: matchIds, teamNum: teamNum});

        case 'CALCULATE_AVERAGES':
            const matches = findTeamMatches(action.globalState, { teamNum: action.payload.teamNum });
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

            const avgPts = _meanBy(matches, `points.totalPts`);
            const maxPts = _get(_maxBy(matches, `points.totalPts`), `points.totalPts`);
            const avgNonHabPts = _meanBy(matches, `points.nonHabPts`);
            const maxNonHabPts = _get(_maxBy(matches, `points.nonHabPts`), `points.nonHabPts`);
            const avgRocketPts = _meanBy(matches, `points.rocketPts`);
            const avgRocketCargoPts = _meanBy(matches, `points.rocketCargoPts`);
            const avgRocketHatchPts = _meanBy(matches, `points.rocketHatchPts`);
            const avgCargoShipPts = _meanBy(matches, `points.cargoShipPts`);
            const avgHabPts = _meanBy(matches, `points.habPts`);

            return assignNestedState(state, teamNum, { taskAverageMap, avgPts, maxPts, avgNonHabPts, maxNonHabPts, avgRocketPts, avgRocketCargoPts, avgRocketHatchPts, avgCargoShipPts, avgHabPts });

        default:
            return state;
    }
};

/**
 * Maintains the eventCode for the tournment (for the Blue Alliance api) and
 * the match schedule for the tournament in the form:
    {
        "eventCode": String,
        "matchesLoaded": Boolean,
        "matches" : [
            { matchNumber: Number, blue: [blue1, blue2, blue3], red: [red1, red2, red3]},
            ...
        ]
    }
 */
const scheduleReducer = (state = { matches: [], eventCode: "2019txdel", matchesLoaded: false}, action) => {
    switch (action.type) {
        case 'SET_EVENT_CODE':
            if (!validatePayload(action.payload, 'eventCode')){
                return state;
            }
            return Object.assign(state, { eventCode: action.payload.eventCode });
        case 'SET_MATCHES':
            if (!validatePayload(action.payload, 'matches')){
                return state;
            }
            return Object.assign(state, { matches: action.payload.matches, matchesLoaded: true });
        default:
            return state;
    }
};

/**
 * Maintains the eventCode for the tournment (for the Blue Alliance api) and
 * the match schedule for the tournament in the form:
 {
        "currentMatch": Number,
        "alliance": "blue" || "red",
        "position": Number,
        "currentScoutingDetailsTeam": Number
    }
 */
const scoutingReducer = (state = { currentMatch: 0, alliance: null, position: null, currentScoutingDetailsTeam: 6800}, action) => {
    switch (action.type) {
        case 'SET_SCOUTING_INFO':
            if (!(validatePayload(action.payload, 'currentMatch') &&
                validatePayload(action.payload, 'alliance') &&
                validatePayload(action.payload, 'position')
            )) {
                return state;
            }
            return Object.assign(state, { ...action.payload });
        case 'SET_PRE_GAME':
            if (!(validatePayload(action.payload, 'pos') &&
                validatePayload(action.payload, 'piece') &&
                validatePayload(action.payload, 'config')
            )) {
                console.log(`Bad payload for SET_PRE_GAME: ${action.payload}`)
                return state;
            }
            return Object.assign(state, { preMatch: action.payload });
        case 'SET_TIMELINE':
            return Object.assign(state, { ...action.payload });
        case 'GOTO_NEXT_MATCH':
            return Object.assign(state, { currentMatch: state.currentMatch + 1 });
        case 'SET_CURRENT_SCOUTING_DETAILS_TEAM':
            return Object.assign(state, { currentScoutingDetailsTeam: action.payload.teamNum });
        default:
            return state;
    }
};


const reducer = combineReducers({
    results: resultsReducer,
    teams: teamReducer,
    schedule: scheduleReducer,
    scouting: scoutingReducer
});

export default reducer;
