import keyGen from "../keyGenerator";
import * as types from "./types";

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
  accountId,
  dateTime,
  remarks
) => {
  return {
    type: types.ADD_MONEY,
    id: keyGen(),
    amount,
    accountId,
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
  accountId,
  dateTime,
  remarks,
  chequeNumber,
  voucherNumber,
  category,
  title,
  opening
) => {
  return {
    type: types.ADD_PURCHASE,
    id: keyGen(),
    amount,
    accountId,
    dateTime,
    remarks,
    chequeNumber,
    voucherNumber,
    category,
    title,
    opening,
    closing: opening - amount
  };
};
