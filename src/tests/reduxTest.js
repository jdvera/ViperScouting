import reducer from "../redux/reducers";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reduxActions from "../redux/actions";


console.log("running tests");

const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk)
);

// const testMatch = {
//     'matchNum': 5,
//     'teamNum': 6800,
//     'preMatch': {
//         'pos': 'lvl1',
//         'piece': 'hatch',
//         'config': '2/0'
//     },
//     'timeline': [
//         { 'time': 0, 'eventType': 'H_' },
//         { 'time': 8653, 'eventType': 'H_DP' },
//         { 'time': 14653, 'eventType': 'H_R1' },
//         { 'time': 18653, 'eventType': 'H_' },
//         { 'time': 28653, 'eventType': 'H_R1' },
//         { 'time': 35653, 'eventType': 'H_' },
//         { 'time': 42653, 'eventType': 'H_' },
//         { 'time': 56653, 'eventType': 'H_R2' },
//         { 'time': 60653, 'eventType': 'H_' },
//         { 'time': 69653, 'eventType': 'H_R2' },
//         { 'time': 78653, 'eventType': 'H_' },
//         { 'time': 85653, 'eventType': 'H_R3' },
//         { 'time': 96653, 'eventType': 'H_' },
//         { 'time': 106653, 'eventType': 'H_R3' },
//         { 'time': 115653, 'eventType': 'C_' },
//         { 'time': 121653, 'eventType': 'C_R1' },
//         { 'time': 127653, 'eventType': 'C_' },
//         { 'time': 133653, 'eventType': 'C_R1' },
//         { 'time': 140653, 'eventType': 'C_' },
//         { 'time': 142653, 'eventType': 'CLMB_S' },
//         { 'time': 147653, 'eventType': 'CLMB_F' }
//     ],
//     'postGame': {
//         'pos': 'lvl2',
//         'host': 0,
//         'liftability': 'good',
//         'defense': 'meh',
//         'broken': 'healthy'
//     }
// };

const testMatch = {
    "defense": 1,
    "endLevel": 1,
    "events": [
        {
            "time": 1364,
            "type": "c_"
        },

        {
            "time": 2246,
            "type": "c_r2"
        },

        {
            "time": 2899,
            "type": "h_"
        },

        {
            "time": 3188,
            "type": "h_cs"
        },

        {
            "time": 3564,
            "type": "c_"
        },

        {
            "time": 3768,
            "type": "c_r3"
        },

        {
            "time": 4068,
            "type": "h_"
        },

        {
            "time": 4315,
            "type": "h_dp"
        },

        {
            "time": 4641,
            "type": "h_"
        },

        {
            "time": 4879,
            "type": "h_r2"
        },

        {
            "time": 5131,
            "type": "h_"
        },

        {
            "time": 5363,
            "type": "h_r3"
        },

        {
            "time": 5616,
            "type": "h_"
        },

        {
            "time": 5849,
            "type": "h_r2"
        },

        {
            "time": 6072,
            "type": "h_"
        },

        {
            "time": 6305,
            "type": "h_r3"
        },

        {
            "time": 6642,
            "type": "c_"
        },

        {
            "time": 6866,
            "type": "c_cs"
        },

        {
            "time": 7108,
            "type": "c_"
        },

        {
            "time": 7349,
            "type": "c_r2"
        },

        {
            "time": 7674,
            "type": "h_"
        },

        {
            "time": 7914,
            "type": "h_r3"
        }
    ],
    "host": 2,
    "liftability": 1,
    "liftablitity": null,
    "matchNum": "23",
    "robotBreak": 2,
    "role":  {
        "cargoShipper": false,
        "climber": false,
        "rocketeer": true
    },
    "showPage": "postmatch",
    "teamNum": "6800"
};

store.dispatch(reduxActions.saveMatch(testMatch)).then(() => {
    console.log(store.getState());
    console.log(store.getState().results['5::6800']);
    console.log(store.getState().teams['6800']);
});
