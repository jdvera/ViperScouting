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

export function recalculateAverages(globalState, teamNum) {
    return {
        type: 'CALCULATE_AVERAGES',
        payload: {teamNum},
        globalState
    };
}

export function saveMatch(rawResult) {
    return (dispatch, getState) => {
        return Promise.resolve(
        //     console.log(getState())
        // ).then(() =>
            dispatch(saveRawMatchOffline(rawResult))
        ).then(() => {
            dispatch(addResults(rawResult.matchNum, rawResult.teamNum))
        }).then(() => {
            dispatch(recalculateAverages(getState(), rawResult.teamNum))
        // }).then(() => {
        //     console.log(getState())
        });
    }
}