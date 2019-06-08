import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

import { addNewTransaction } from "./transactionHelper";

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_NEW_TRANSACTION: {
      // check if a transaction with the same voucherNumber exists
      if (payload.type === types.ADD_PURCHASE) {
        if (checkIfVoucherExists(state.ById, payload.voucherNumber)) {
          return state;
        }
      }
      const count = state.count + 1;
      const id = payload.id;
      let ById = { ...state.ById };
      addNewTransaction(ById, Object.assign({}, payload));

      ById[id] = payload;
      const AllIds = [...state.AllIds, id];
      return { count, ById, AllIds };
    }

    case types.DELETE_ACCOUNT: {
      // delete all accounts with the accountId of the payload (deleted account)
      let ById = state.ById;
      let count = state.count;
      let AllIds = state.AllIds;
      Object.keys(ById).forEach(key => {
        if (ById[key].accountId === payload.id) {
          delete ById[key];
          count = count - 1;
          AllIds = AllIds.filter(id => id !== key);
        }
      });

      return { ById, count, AllIds };
    }
    case types.DELETE_TRANSACTION: {
      const AllIds = state.AllIds.filter(id => id !== payload.id);
      let ById = state.ById;
      delete ById[payload.id];
      const count = state.count - 1;
      return { count, ById, AllIds };
    }
    default:
      return state;
  }
};

const checkIfVoucherExists = (ByID, voucherNumber) => {
  let retVal = false;
  Object.keys(ByID).forEach(key => {
    if (ByID[key].type === types.ADD_PURCHASE) {
      if (ByID[key].voucherNumber === voucherNumber) {
        retVal = true;
      }
    }
  });
  return retVal;
};
