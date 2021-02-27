import { createStore, applyMiddleware, combineReducers } from "redux";
import DataDropdownReducer from "./reducers/DataDropdownReducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ DataDropdownReducer }),
  applyMiddleware(thunk)
);
export default store;
