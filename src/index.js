import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <AppRouter />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);


serviceWorker.unregister();
