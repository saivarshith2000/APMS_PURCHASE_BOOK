import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  ById: {},
  AllIds: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_NEW_TRANSACTION:
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
