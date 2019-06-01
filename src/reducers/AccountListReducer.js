import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

export default () => (state = INITIAL_STATE, { type, payload }) => {
  if (type === types.ADD_NEW_ACCOUNT) {
    let id = payload.Account.id;
    let count = state.count++;
    let ById = { ...state.ById, id: payload.Account };
    let AllIds = [...state.AllIds, id];
    return { id, count, ById, AllIds };
  }
  return state;
};
