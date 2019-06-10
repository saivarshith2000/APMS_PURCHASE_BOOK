import * as types from "../types";

export default (state = [], action) => {
  if (action.type === types.ADD_NEW_CATEGORY) {
    if (!state.includes(action.payload.category.toUpperCase())) {
      return [...state, action.payload.category.toUpperCase()];
    }
  }
  if (action.type === types.RESTORE_BACKUP) {
    return action.payload.categories;
  }
  return state;
};
