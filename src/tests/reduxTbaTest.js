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
Promise.resolve(
    store.dispatch(reduxActions.setEventCode("2018txpa"))
).then(() => {
    console.log(store.getState());
}).then(() => {
    store.dispatch(reduxActions.updateMatches()).then(() => {
        console.log(store.getState());
    })
});
