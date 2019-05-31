import keyGen from "../keyGenerator";

/* Each Purchase Transaction contains 
01. Amount
02. Category
03. DateTime
04. Cheque Number
05. Voucher Number
06. Remarks
07. Title
08. Aaccount number 
09. UUID
*/

/* Each Money Transaction contains
01. Amount
02. Account Number
03. DateTime
04. Remarks
05. UUID
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
    id: keyGen(),
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
    id: keyGen(),
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
