// this file contains the module exports for all the reducers
import { combineReducers } from "redux";

import currentTabReducer from "./currentTabReducer.js";
import transactionReducer from "./transactionsReducer";

export default combineReducers({
  currentTab: currentTabReducer,
  transactions: transactionReducer
});
