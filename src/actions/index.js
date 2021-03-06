// this file contains all the actions creators for now

import * as types from "../types";
import keyGen from "../../keyGenerator";

export const currentTabChanged = newTab => {
  return {
    type: types.CURRENT_TAB_CHANGED,
    payload: {
      newTab // name of the new currentTab
    }
  };
};

export const addNewTransaction = transaction => {
  // the transaction object obtained must be the same as the db transaction object
  return {
    type: types.ADD_NEW_TRANSACTION,
    payload: transaction
  };
};

export const addNewCategory = category => {
  // add a category to the categoryList
  return {
    type: types.ADD_NEW_CATEGORY,
    payload: {
      category
    }
  };
};

export const setSelectedItem = id => {
  return {
    type: types.SET_SELECTED_ITEM,
    payload: {
      id
    }
  };
};

export const setCurrentAccount = ({ id, accountName, balance }) => {
  return {
    type: types.SET_CURRENT_ACCOUNT,
    payload: { id, accountName, balance }
  };
};

export const setSearchTerm = text => {
  return {
    type: types.SET_SEARCH_TERM,
    payload: text
  };
};

export const addNewAccount = accountName => {
  return {
    type: types.ADD_NEW_ACCOUNT,
    payload: {
      Account: {
        id: keyGen(),
        accountName,
        createdOn: new Date(),
        transactions: [],
        balance: 0
      }
    }
  };
};

export const deleteAccount = account => {
  return {
    type: types.DELETE_ACCOUNT,
    payload: account
  };
};

export const deleteTransaction = transaction => {
  return {
    type: types.DELETE_TRANSACTION,
    payload: transaction
  };
};

export const restoreData = ({ Accounts, transactions, categories }) => {
  return {
    type: types.RESTORE_BACKUP,
    payload: {
      Accounts,
      transactions,
      categories
    }
  };
};
