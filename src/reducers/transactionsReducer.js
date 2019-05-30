import * as types from "../types";

const INITIAL_STATE = {
  dataObtained: false,
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_DATA_FROM_DB: {
      return {
        dataObtained: true,
        list: action.payload.transactions
      };
    }
    case types.ADD_NEW_TRANSACTION: {
      // add the new transaction to the list
      return { ...state, list: [...state.list, action.payload.transaction] };
    }
  }
  return state;
};
