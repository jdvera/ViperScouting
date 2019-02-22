import reducer from "../src/redux/reducers.js";
import { createStore } from "redux";
import * as reduxActions from "../src/actions/reduxActions";


const store = createStore(reducer, {});

store.dispatch(reduxActions.loadText("hello"));

console.log(store.test);