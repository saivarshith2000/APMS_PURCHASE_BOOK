import * as types from "../types";

// All transactions are stored in storage sorted by their date
// when adding a new transaction, put this transaction in its correct slot based on the dateTime
// change the closing and opening of all the transaction that took place after this new transaction

// this functions recives the ById object and the new transaction
// it converts the object to an array and inserts the new transaction and changes
// all the required values of other transactions and converts back to an object and returns it
// This procedure might take time, so dispatch a loading action to show the feedback for this time
export const addNewTransaction = (ById, newTransaction) => {
  if (ById === null || newTransaction === null) {
    throw "Transaction or ById object is NULL !!!";
  }
  // convert to array
  let transactionsArray = Object.keys(ById).map(key => ById[key]);

  // if there are less than two transactions, there is no need to loop
  if (transactionsArray.length === 0) {
    return { [newTransaction.id]: newTransaction };
  }
  const newTransactionTimestamp = new Date(newTransaction.dateTime).getTime();
  console.log("new : " + newTransactionTimestamp);
  if (transactionsArray.length === 1) {
    console.log(
      "already present : " +
        new Date(transactionsArray[0].dateTime).getTime() +
        "\namount : " +
        transactionsArray[0].amount
    );
    if (
      new Date(transactionsArray[0].dateTime).getTime() <
      newTransactionTimestamp
    ) {
      // if the newly added transaction is later than the transaction present
      console.log("I am called");
      transactionsArray.unshift(newTransaction);
      const retVal = {
        [transactionsArray[0].id]: transactionsArray[0],
        [transactionsArray[1].id]: transactionsArray[1]
      };
      return retVal;
    } else {
      // if the newTransaction is older than the transaction present, it
      // becomes the first Transaction
      newTransaction.opening = 0;
      newTransaction.closing = getClosing(newTransaction);
      transactionsArray[0].opening = newTransaction.closing;
      transactionsArray[0].closing = getClosing(transactionsArray[0]);
      transactionsArray.push(newTransaction);
    }
    const retVal = {
      [transactionsArray[0].id]: transactionsArray[0],
      [transactionsArray[1].id]: transactionsArray[1]
    };
    return retVal;
  }

  // push the newTransaction to the transactions array
  transactionsArray.push(newTransaction);
  transactionsArray = sortByDates(transactionsArray);
  // now we need to find the newTransactionIndex in this sorted array and modify the transactions in the
  // higher indices
  let slot = 0;
  for (let i = 0; i < transactionsArray.length; i++) {
    if (transactionsArray[i].id === newTransaction.id) {
      slot = i;
      break;
    }
  }

  // now modify all the transactions with index equal and greater than the slot
  if (slot === 0) {
    // if newTransaction is the oldest
    transactionsArray[slot].opening = 0;
    transactionsArray[slot].closing = getClosing(transactionsArray[slot]);
    for (let i = 1; i < transactionsArray.length; i++) {
      transactionsArray[i].opening = transactionsArray[i - 1].closing;
      transactionsArray[i].closing = getClosing(transactionsArray[i]);
    }
    return convertToObject(transactionsArray);
  }

  if (slot === transactionsArray.length - 1) {
    // if this transaction is the latest, nothing needs to be done, convert to object and return
    return convertToObject(transactionsArray);
  }
  // if the slot is somewhere in between
  transactionsArray[slot].opening = transactionsArray[slot - 1].closing;
  transactionsArray[slot].closing = getClosing(transactionsArray[slot]);
  for (i = slot + 1; i < transactionsArray.length; i++) {
    transactionsArray[i].opening = transactionsArray[i - 1].closing;
    transactionsArray[i].closing = getClosing(transactionsArray[i]);
  }
  return convertToObject(transactionsArray);
};

// When deleting a transaction, all the transactions that took place after, are affected too
// The functions takes the ById object and converts it to an array and removes the required transaction
// and then modifies the remaining transactions and returns the modified ById object
// This procedure might take time, so dispatch a loading action to show the feedback for this time
export const deleteTransaction = (ById, transactionId) => {
  let transactionsArray = sortByDates(Object.keys(ById).map(key => ById[key]));
  let slot = -1;
  // find the position of the required transaction
  for (let i = 0; i < transactionsArray.length; i++) {
    if (transactionsArray[i].id === transactionId) {
      slot = i;
      break;
    }
  }
  if (slot === -1) {
    // exit if the given id is not found.
    return {};
  }

  if (slot === 0) {
    // if the transaction to delete is the oldest
    transactionsArray.shift();
    if (transactionsArray.length === 0) {
      // if there is only one transaction and it is deleted, exit
      return {};
    }

    transactionsArray[0].opening = 0;
    transactionsArray[0].closing = getClosing(transactionsArray[0]);
    for (let i = 0; i < transactionsArray.length; i++) {
      transactionsArray[i].opening = transactionsArray[i - 1].closing;
      transactionsArray[i].closing = getClosing(transactionsArray[i]);
    }
    return convertToObject(transactionsArray);
  }
  if (slot === transactionsArray.length - 1) {
    // if the transaction to delete is the latest, just pop it, then return object
    transactionsArray.pop();
    return convertToObject(transactionsArray);
  }
  // if the transaction to delete is inbetween
  // opening of [slot+1] = closing of [slot-1]
  transactionsArray.splice(slot, 1); // remove the transaction from the array
  for (let i = slot; i < transactionsArray.length; i++) {
    transactionsArray[i].opening = transactionsArray[i - 1].closing;
    transactionsArray[i].closing = getClosing(transactionsArray[i]);
  }
  return convertToObject(transactionsArray);
};

// Sorting helper -> sorts by dates in latest last fashion
const sortByDates = transactionsArray => {
  return transactionsArray.sort((a, b) => {
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
  });
};

// function to get the closing balance of a transaction based on type
const getClosing = transaction => {
  if (transaction.type === types.ADD_MONEY) {
    return parseFloat(transaction.opening) + parseFloat(transaction.amount);
  }
  return parseFloat(transaction.opening) - parseFloat(transaction.amount);
};

// function to convert array to Object
const convertToObject = array => {
  let retVal = {};
  array.forEach(element => {
    retVal[element.id] = element;
  });
  console.log(retVal);
  return retVal;
};
