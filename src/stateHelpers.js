// passed to various props
// this file contains helper functions to extract data from the state
export const getAccountDetails = state => {
  // pass the state.accounts.ById object as parameters
  // This functions returns [Accounts] array
  return Array.from(
    Object.keys(state.Accounts.ById),
    key => state.Accounts.ById[key]
  );
};

export const getAllTransactionsOfThisAccount = state => {
  // This functions returns a list of transactions of the currentAccount in the state
  const transactions = Array.from(
    Object.keys(state.transactions.ById),
    key => state.transactions.ById[key]
  );
  return transactions.filter(transaction => {
    return transaction.accountId === state.currentAccount.id;
  });
};

export const getAllTransactions = state => {
  // this function returs all the transactions from the state
  return (transactions = Array.from(
    Object.keys(state.transactions.ById),
    key => state.transactions.ById[key]
  ));
};
