import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/redux/reducers.js";
import Main from "./src/index.js";

const store = createStore(reducer, {});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  };
};
