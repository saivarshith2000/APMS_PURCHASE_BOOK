import * as types from "../types";

const INITIAL_STATE = {
  dataObtained: false,
  list: []
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === types.GET_DATA_FROM_DB) {
    return {
      dataObtained: true,
      list: action.payload.transactions
    };
  }
  return state;
};
