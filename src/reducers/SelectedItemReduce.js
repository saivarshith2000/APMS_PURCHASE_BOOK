import * as types from "../types";

export default (state = "", action) => {
  if (action.type === types.SET_SELECTED_ITEM) {
    return action.payload.title;
  }
  return state;
};
