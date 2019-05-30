/* Each Purchase Transaction contains 
01. Amount
02. Category
03. DateTime
04. Cheque Number
05. Voucher Number
06. Remarks
07. Title
08. Aaccount number 
*/

/* Each Money Transaction contains
01. Amount
02. Account Number
03. DateTime
04. Remarks
*/

// But all transactions are represented by the same object
// cheq no, vouch no, category for money transactions
export const createMoneyTransaction = (
  amount,
  accountNumber,
  dateTime,
  remarks
) => {
  return {
    type: "add_money",
    amount,
    accountNumber,
    dateTime,
    remarks,
    chequeNumber: "",
    voucherNumber: "",
    category: "",
    title: ""
  };
};

export const createPurchaseTransaction = (
  amount,
  accountNumber,
  dateTime,
  remarks,
  chequeNumber,
  voucherNumber,
  category,
  title
) => {
  return {
    type: "add_purchase",
    amount,
    accountNumber,
    dateTime,
    remarks,
    chequeNumber,
    voucherNumber,
    category,
    title
  };
};
