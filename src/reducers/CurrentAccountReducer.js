import * as types from "../types";

export default (state = "", action) => {
  if (action.type === types.SET_CURRENT_ACCOUNT) {
    return action.payload;
  }
  return state;
};
