import * as types from "../types";

const INITIAL_STATE = {
  count: 0,
  list: {}
};

export default () => (state = INITIAL_STATE, { type, payload }) => {
  if (type === types.ADD_NEW_ACCOUNT) {
    let count = state.count++;
    let list = { ...state.list, payload };
    return { count, list };
  }
  return state;
};
