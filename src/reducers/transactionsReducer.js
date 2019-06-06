import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_NEW_TRANSACTION:
      // check if a transaction with the same voucherNumber exists
      if (payload.type === types.ADD_PURCHASE) {
        if (checkIfVoucherExists(state.ById, payload.voucherNumber)) {
          return state;
        }
      }
      const count = state.count + 1;
      const id = payload.id;
      let ById = { ...state.ById };
      ById[id] = payload;
      const AllIds = [...state.AllIds, id];
      return { count, ById, AllIds };
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
