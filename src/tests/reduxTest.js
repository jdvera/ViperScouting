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

const testMatch1 = {
    'matchNum': 5,
    'teamNum': 6800,
    'preMatch': {
        'pos': 'lvl_1',
        'piece': 'hatch',
        'config': '2/0'
    },
    'timeline': [
        { 'time': 0, 'eventType': 'H_' },
        { 'time': 8000, 'eventType': 'H_DP' },
        { 'time': 14000, 'eventType': 'H_R1' },
        { 'time': 18000, 'eventType': 'H_' },
        { 'time': 28000, 'eventType': 'H_R1' },
        { 'time': 35000, 'eventType': 'H_' },
        { 'time': 42000, 'eventType': 'H_' },
        { 'time': 56000, 'eventType': 'H_R2' },
        { 'time': 60000, 'eventType': 'H_' },
        { 'time': 69000, 'eventType': 'H_R2' },
        { 'time': 78000, 'eventType': 'H_' },
        { 'time': 85000, 'eventType': 'H_R3' },
        { 'time': 96000, 'eventType': 'H_' },
        { 'time': 106000, 'eventType': 'H_R3' },
        { 'time': 115000, 'eventType': 'C_' },
        { 'time': 121000, 'eventType': 'C_R1' },
        { 'time': 127000, 'eventType': 'C_' },
        { 'time': 133000, 'eventType': 'C_R1' },
        { 'time': 140000, 'eventType': 'C_' },
        { 'time': 142000, 'eventType': 'CLMB_S' },
        { 'time': 147000, 'eventType': 'CLMB_F' }
    ],
    'postMatch': {
        'pos': 2,
        'host': 0,
        'liftability': 'good',
        'defense': 'meh',
        'broken': 'healthy'
    }
};

const testMatch2 = {
    'matchNum': 11,
    'teamNum': 6800,
    'preMatch': {
        'pos': 'lvl_1',
        'piece': 'hatch',
        'config': '2/0'
    },
    'timeline': [
        { 'time': 0, 'eventType': 'H_' },
        { 'time': 8000, 'eventType': 'H_DP' },
        { 'time': 13000, 'eventType': 'H_R1' },
        { 'time': 19000, 'eventType': 'H_' },
        { 'time': 22000, 'eventType': 'H_R1' },
        { 'time': 30000, 'eventType': 'H_' },
        { 'time': 40000, 'eventType': 'H_' },
        { 'time': 50000, 'eventType': 'H_CS' },
        { 'time': 65000, 'eventType': 'H_' },
        { 'time': 69000, 'eventType': 'H_CS' },
        { 'time': 72000, 'eventType': 'H_' },
        { 'time': 82000, 'eventType': 'H_CS' },
        { 'time': 99000, 'eventType': 'H_' },
        { 'time': 101000, 'eventType': 'H_CS' },
        { 'time': 111000, 'eventType': 'C_' },
        { 'time': 128000, 'eventType': 'C_CS' },
        { 'time': 129000, 'eventType': 'C_' },
        { 'time': 130000, 'eventType': 'C_CS' },
        { 'time': 143000, 'eventType': 'C_' },
        { 'time': 144000, 'eventType': 'CLMB_S' },
        { 'time': 147000, 'eventType': 'CLMB_F' }
    ],
    'postMatch': {
        'pos': 3,
        'host': 1,
        'liftability': 'good',
        'defense': 'meh',
        'broken': 'healthy'
    }
};


store.dispatch(reduxActions.saveMatch(testMatch1)).then(() => {
    // console.log(store.getState().results['5::6800'].points);
    // console.log(store.getState().teams['6800']);
});

store.dispatch(reduxActions.saveMatch(testMatch2)).then(() => {
    // console.log("\n***Match 2***\n");
    // console.log(store.getState().results['11::6800'].points);
    console.log(store.getState().teams['6800']);
});
