import * as types from "../types";
import * as names from "../names";

// the default state is a string whose value is HomeScreen's Name
export default (state = names.HOME, action) => {
  if (action.type === types.CURRENT_TAB_CHANGED) {
    return action.payload.newTab;
  }
  return state;
};
