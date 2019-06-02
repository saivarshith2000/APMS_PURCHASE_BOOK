import * as types from "../types";

export default (state = "", action) => {
  if (action.type === types.SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};
