import { combineReducers } from 'redux';

/****
Array [
  Object {
    "time": 1812,
    "type": "c",
  },
  Object {
    "time": 2467,
    "type": "dp_c",
  },
  Object {
    "time": 3126,
    "type": "c",
  },
  Object {
    "time": 3776,
    "type": "dp_c",
  },
]
****/

const gameState = (state = { gameDataArr: [] }, action) => {
    let newState = Object.assign({}, state);
    const gameData = action.payload || {};

    switch (action.type) {
        case 'LOAD_GAME_DATA':
            newState.gameDataArr.push(gameData);
            return newState;

        default:
            return state;
    }
};


const test = (state = { text: "" }, action) => {
    let newState = Object.assign({}, state);
    const { text } = action.payload || {};

    switch (action.type) {
        case 'NEW_TEXT':
            newState.text = text;
            return newState;

        default:
            return state;
    }
};


export default combineReducers({
    gameState,
    test
});
