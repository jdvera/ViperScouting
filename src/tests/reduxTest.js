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

const testMatch = {
    'matchNum': 5,
    'teamNum': 6800,
    'preMatch': {
        'pos': 'lvl1',
        'piece': 'hatch',
        'config': '2/0'
    },
    'timeline': [
        { 'time': 0, 'eventType': 'H_' },
        { 'time': 8653, 'eventType': 'H_DP' },
        { 'time': 14653, 'eventType': 'H_R1' },
        { 'time': 18653, 'eventType': 'H_' },
        { 'time': 28653, 'eventType': 'H_R1' },
        { 'time': 35653, 'eventType': 'H_' },
        { 'time': 42653, 'eventType': 'H_' },
        { 'time': 56653, 'eventType': 'H_R2' },
        { 'time': 60653, 'eventType': 'H_' },
        { 'time': 69653, 'eventType': 'H_R2' },
        { 'time': 78653, 'eventType': 'H_' },
        { 'time': 85653, 'eventType': 'H_R3' },
        { 'time': 96653, 'eventType': 'H_' },
        { 'time': 106653, 'eventType': 'H_R3' },
        { 'time': 115653, 'eventType': 'C_' },
        { 'time': 121653, 'eventType': 'C_R1' },
        { 'time': 127653, 'eventType': 'C_' },
        { 'time': 133653, 'eventType': 'C_R1' },
        { 'time': 140653, 'eventType': 'C_' },
        { 'time': 142653, 'eventType': 'CLMB_S' },
        { 'time': 147653, 'eventType': 'CLMB_F' }
    ],
    'postGame': {
        'pos': 'lvl2',
        'host': 0,
        'liftability': 'good',
        'defense': 'meh',
        'broken': 'healthy',
        'roles': ['rocketeer']
    }
};

// store.dispatch(reduxActions.saveRawMatchOffline(testMatch));
store.dispatch(reduxActions.saveMatch(testMatch)).then(() => {
    console.log(store.getState());
    console.log(store.getState().results['5::6800']);
    console.log(store.getState().teams['_6800']);
});
