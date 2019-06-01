import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  let ById = {};
  switch (type) {
    case types.ADD_NEW_ACCOUNT:
      const id = payload.Account.id;
      const count = state.count + 1;
      ById = { ...state.ById };
      ById[id] = payload.Account;
      let AllIds = [...state.AllIds, id];
      return { count, ById, AllIds };
    case types.ADD_NEW_TRANSACTION:
      // this new transaction to the transactions array of the transactionAccount
      ById = { ...state.ById };
      ById[payload.accountId].transactions.push(payload.id);
      // deduct/increase this amount from the account balance
      if (payload.type === types.ADD_MONEY) {
        ById[payload.accountId].balance += payload.amount;
      } else if (payload.type === types.ADD_PURCHASE) {
        ById[payload.accountId].balance -= payload.amount;
      }
      return { ...state, ById };

    default:
      return state;
  }
};
