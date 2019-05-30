// this file contains the module exports for all the reducers
import { combineReducers } from "redux";

import currentTabReducer from "./currentTabReducer.js";
import transactionReducer from "./transactionsReducer";
import CategoryReducer from "./CategoryReducer";
import SelectedItemReducer from "./SelectedItemReduce";

export default combineReducers({
  currentTab: currentTabReducer,
  transactions: transactionReducer,
  categories: CategoryReducer,
  selectedItem: SelectedItemReducer
});
