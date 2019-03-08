import { getMatches } from "../tba/tba.js";
import {findCurrentTeam} from "./selectors";

// -------------------------
// -- RAW RESULTS ACTIONS --
// -------------------------

function saveRawMatchOffline(rawResult) {
    return {
        type: 'SAVE_MATCH_OFFLINE',
        payload: rawResult
    };
}


// -------------------------
// ----- TEAM ACTIONS ------
// -------------------------

function addResults(matchNum, teamNum) {
    return {
        type: 'ADD_RESULT',
        payload: {matchNum, teamNum}
    };
}

function recalculateAverages(globalState, teamNum) {
    return {
        type: 'CALCULATE_AVERAGES',
        payload: {teamNum},
        globalState
    };
}


// -------------------------
// --- SCHEDULE ACTIONS ----
// -------------------------
export function setEventCode(eventCode) {
    return {
        type: 'SET_EVENT_CODE',
        payload: {eventCode}
    };
}

function setMatches(matches) {
    return {
        type: 'SET_MATCHES',
        payload: {matches}
    };
}

export function updateMatches(){
    return (dispatch, getState) => {
        const eventCode = getState().schedule.eventCode;
        return getMatches(eventCode)
            .then((matches) => {
                dispatch(setMatches(matches));
            });
    }
}

// -------------------------
// --- SCOUTING ACTIONS ----
// -------------------------

export function setScoutingInfo(currentMatch, alliance, position) {
    return {
        type: 'SET_SCOUTING_INFO',
        payload: { currentMatch, alliance, position }
    };
}
export function setPreGame(props) {
    return {
        type: 'SET_PRE_GAME',
        payload: props
    };
}
export function setTimeline(props) {
    return {
        type: 'SET_TIMELINE',
        payload: props
    };
}
export function gotoNextMatch() {
    return {
        type: 'GOTO_NEXT_MATCH',
        payload: {}
    };
}

export function updateScoutingInfo(currentMatch, alliance, position) {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch(setScoutingInfo(currentMatch, alliance, position))
        )
    };
}

// -------------------------
// --- COMBINED ACTIONS ----
// -------------------------

export function saveMatch(postMatch) {
    return (dispatch, getState) => {
        const rawResult = {
            matchNum: getState().scouting.currentMatch,
            teamNum:  findCurrentTeam(getState()),
            preMatch: getState().scouting.preMatch,
            timeline: getState().scouting.timeline,
            postMatch};

        return Promise.resolve(
        //     console.log(getState())
        // ).then(() =>
            dispatch(saveRawMatchOffline(rawResult))
        ).then(() => {
            dispatch(addResults(rawResult.matchNum, rawResult.teamNum))
        }).then(() => {
            dispatch(recalculateAverages(getState(), rawResult.teamNum))
        }).then(() => {
            dispatch(gotoNextMatch())
        });
    };
}