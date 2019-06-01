// this file contains helper functions to extract data from the state
// passed to various props
export const getAccountDetails = state => {
  // pass the state.accounts.ById object as parameters
  // This functions returns [Accounts] array
  return Array.from(
    Object.keys(state.Accounts.ById),
    key => state.Accounts.ById[key]
  );
};
