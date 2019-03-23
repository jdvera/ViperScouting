import { getMatches } from "../tba/tba.js";
import {findCurrentTeam} from "./selectors";
import firebase from "../firebase/firebase";

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

export function processMatch(postMatch) {
    return (dispatch, getState) => {
        const rawResult = {
            matchNum: getState().scouting.currentMatch,
            teamNum:  findCurrentTeam(getState()),
            preMatch: getState().scouting.preMatch,
            timeline: getState().scouting.timeline,
            postMatch};

        return Promise.resolve(
            dispatch(saveMatch(rawResult))
        ).then(() => {
            dispatch(gotoNextMatch())
        });
    };
}

function saveMatch(rawResult) {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch(saveRawMatchOffline(rawResult))
        ).then(() => {
        //     console.log(getState())
        // }).then(() => {
            return dispatch(addResults(rawResult.matchNum, rawResult.teamNum))
        }).then(() => {
            return dispatch(recalculateAverages(getState(), rawResult.teamNum))
        })
    }
}

// Save redux to firebase
// Object.keys(state.results).forEach((matchId) => {
//     const newMatchRef = matchRef.child(`${matchId}`);
//     const {matchNum, teamNum, preMatch, timeline, postMatch} = state.results[matchId];
//     newMatchRef.set({matchNum, teamNum, preMatch, timeline, postMatch})
// })

export function syncToFirebase() {
    return (dispatch, getState) => {
        const state = getState();
        const matchesRef = firebase.database().ref(`matches`);

        return matchesRef.once('value')
            .then((matchesSnapshot) =>
                Promise.all(getSaveMatchPromises(dispatch, state, matchesSnapshot))
            // ).then(() =>
            //     console.log(`syncToFirebase: currently ${Object.keys(state.teams).length} teams and ${Object.keys(state.teams.results).length} matches`)
            );
    };
}

function getSaveMatchPromises(dispatch, state, matchesSnapshot) {
    const promises = [];
    console.log(`getSaveMatchPromises: currently ${Object.keys(state.teams).length} teams and ${Object.keys(state.results).length} matches`);

    matchesSnapshot.forEach((childMatchSnapshot) => {
        const matchId = childMatchSnapshot.key;

        if (!state.results.hasOwnProperty(matchId)) {
            const rawResult = childMatchSnapshot.val();
            rawResult.timeline = rawResult.timeline || [];
            promises.push(dispatch(saveMatch(rawResult)));
        }
    });
    return promises;
}