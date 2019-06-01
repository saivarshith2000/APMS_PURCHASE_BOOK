import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_NEW_TRANSACTION:
      let count = state.count++;
      let id = payload.id;
      let ById = { ...state.ById, id: payload };
      let AllIds = [...state.AllIds, id];
      return { id, count, ById, AllIds };
    default:
      return state;
  }
};
