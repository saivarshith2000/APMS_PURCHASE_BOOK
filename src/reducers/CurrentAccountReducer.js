import * as types from "../types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_ACCOUNT:
      return payload;
    case types.ADD_NEW_TRANSACTION:
      // we need to update the current account details when a new transaction is made
      // a transaction is made only in the current account, so we just need to update the
      // current balance accordingly
      return {
        ...state,
        balance:
          payload.type === types.ADD_MONEY
            ? state.balance + parseFloat(payload.amount)
            : state.balance - parseFloat(payload.amount)
      };
    case types.DELETE_ACCOUNT: {
      if (Object.keys(state).length === 0 && state.constructor === state) {
        // checked for empty state === no current account present
        return state;
      }
      if (state.id === payload.id) {
        return {};
      }
      return state;
    }
  }
  return state;
};
