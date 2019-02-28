import { combineReducers } from 'redux';
import _get from 'lodash/get';
import {validateRawResults} from "../utils/validators";
import {generateProcessedTasks, matchId} from "../utils/matchUtils";

const rawResultsReducer = (state = {}, action) => {

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


const teamReducer = (state = { }, action) => {

    switch (action.type) {
        case 'ADD_RESULT':
            const teamNum = action.payload.teamNum;
            return Object.assign(state, {
                [teamNum]:[..._get(state, `${teamNum}.matches`, []), matchId(action.payload)]
            });
        default:
            return state;
    }
};


const reducer = combineReducers({
    rawResults: rawResultsReducer,
    team: teamReducer
});

export default reducer;
