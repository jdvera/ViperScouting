// -------------------------
// -- RAW RESULTS ACTIONS --
// -------------------------

export function saveRawMatchOffline(rawResult) {
    return {
        type: 'SAVE_MATCH_OFFLINE',
        payload: rawResult
    };
};


// -------------------------
// ----- TEAM ACTIONS ------
// -------------------------

export function addResults(rawResult) {
    return {
        type: 'ADD_RESULT',
        payload: rawResult
    };
};

export function saveMatch(rawResult) {
    return (dispatch) => {
        return Promise.resolve(
            dispatch(saveRawMatchOffline(rawResult))
        ).then(() => {
                dispatch(addResults(rawResult))
        });
    }
}