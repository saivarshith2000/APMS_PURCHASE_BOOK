// this file contains all the actions creators for now

import * as types from "../types";
import { transactions } from "../DUMMY_DATA";

export const currentTabChanged = newTab => {
  return {
    type: types.CURRENT_TAB_CHANGED,
    payload: {
      newTab // name of the new currentTab
    }
  };
};

export const getDataFromDB = () => {
  return {
    type: types.GET_DATA_FROM_DB,
    payload: {
      transactions
    }
  };
};
