import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {fetchData, addToCart} from "./reducers";
import MySaga from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({fetchData, addToCart});

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(MySaga);
