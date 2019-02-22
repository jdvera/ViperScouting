// -------------------------
// ----- GAME ACTIONS ------
// -------------------------

export function loadGameData(gameObj) {
    return {
        type: 'LOAD_GAME_DATA',
        payload: gameObj
    };
};


// -------------------------
// ----- TEST ACTIONS ------
// -------------------------

export function loadText(text) {
    return {
        type: 'NEW_TEXT',
        payload: { text }
    };
};