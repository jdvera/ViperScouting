import React from 'react';
import {applyMiddleware, createStore} from "redux";
import { Provider } from "react-redux";
import reducer from "./src/redux/reducers.js";
import Main from "./src/index.js";
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  };
};
