// this file contains the module exports for all the reducers
import { combineReducers } from "redux";

import currentTabReducer from "./currentTabReducer.js";
import transactionReducer from "./transactionsReducer";
import CategoryReducer from "./CategoryReducer";
import SelectedItemReducer from "./SelectedItemReduce";
import AccountsReducer from "./AccountsReducer";
import CurrentAccountReducer from "./CurrentAccountReducer";
import SearchTermReducer from "./SearchTermReducer";

export default combineReducers({
  // App Data Reducers
  Accounts: AccountsReducer,
  transactions: transactionReducer,
  // UI State Reducers
  currentTab: currentTabReducer,
  categories: CategoryReducer,
  selectedItem: SelectedItemReducer,
  currentAccount: CurrentAccountReducer,
  searchTerm: SearchTermReducer
});
