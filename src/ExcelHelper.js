import XLSX from "xlsx";
import RNFetchBlob from "rn-fetch-blob";
import { createMaterialTopTabNavigator } from "react-navigation";

const {
  writeFile,
  dirs: { DownloadDir }
} = RNFetchBlob.fs;
const DDP = DownloadDir + "/APMS_VOUCHER_BOOK/";

// helper function to convert data to ascii
const output = str => str.split("").map(x => x.charCodeAt(0));

/* What this functions does 
01. Create a new Excel file for each account
02. Add a a new worksheet in each file for each category 
    and add all categories transactions in another sheet
03. That's it
*/

const EXCEL_HEADERS = [
  "Serial No.",
  "Item",
  "Amount",
  "Date",
  "Voucher Number",
  "Cheque Number",
  "Category",
  "Opening",
  "Closing",
  "Remarks"
];

const INDEX_OF_CATEGORY = 6;

export const writeExcelFile = (accountList, transactionList) => {
  // check for error
  if (accountList == null || accountList.length <= 0) {
    return "No accounts added, please Add an account to generate data";
  }
  if (transactionList == null || transactionList.length <= 0) {
    return "No Transactions took place, please again try later";
  }

  // Loop over all the accounts
  for (let i = 0; i < accountList.length; i++) {
    const currentAccount = accountList[i];
    const transactionsOfThisAccount = transactionList.filter(
      transaction => transaction.accountId === currentAccount.id
    );
    let categoriesInThisAccountWithDupes = transactionsOfThisAccount
      .map(transaction => {
        if (transaction.type === "ADD_PURCHASE") {
          return transaction.category;
        }
      })
      .filter(transaction => transaction != undefined);
    // remove duper from this array
    const categoriesInThisAccount = [
      ...new Set(categoriesInThisAccountWithDupes)
    ];
    // create an array of arrays for the excel sheet
    let DATA_ARRAY = [];
    DATA_ARRAY.push(EXCEL_HEADERS);

    for (let j = 0; j < transactionsOfThisAccount.length; j++) {
      DATA_ARRAY.push(
        convertTransactionToArray(j + 1, transactionsOfThisAccount[j])
      );
    }
    // create a new workbook
    const wb = XLSX.utils.book_new();
    // create a new worksheet that contains all transactions
    let ws = XLSX.utils.aoa_to_sheet(DATA_ARRAY);
    // Append this worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "All Transactions");

    let DATA_COPY = DATA_ARRAY;
    DATA_COPY.splice(0, 1);
    // Now add a new sheet for every category
    for (let k = 0; k < categoriesInThisAccount.length; k++) {
      ws = XLSX.utils.aoa_to_sheet(
        DATA_COPY.filter(data => {
          return data[INDEX_OF_CATEGORY] === categoriesInThisAccount[k];
        })
      );
      XLSX.utils.book_append_sheet(wb, ws, categoriesInThisAccount[k]);
    }

    // Write to file
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    const fileName =
      DDP + currentAccount.accountName.replace(" ", "_") + ".xlsx";
    writeFile(fileName, output(wbout), "ascii").then(res => console.log(res));
  }
};

// helper functions
const convertTransactionToArray = (serialNumber, transaction) => {
  if (transaction == null) {
    throw "Invalid transaction";
  }
  // if the transactions is add_money return a array with only 3 strings
  // but format it according to the EXCEL HEADER. For add_money item will be MONEY ADDED
  if (transaction.type === "ADD_MONEY") {
    return [
      serialNumber,
      "MONEY ADDED",
      transaction.amount,
      dateExtractor(transaction.dateTime),
      "",
      "",
      "",
      "",
      "",
      transaction.remarks
    ];
  }
  // if its an ADD_PURCHASE transaction
  const {
    title,
    dateTime,
    amount,
    voucherNumber,
    chequeNumber,
    category,
    opening,
    closing,
    remarks
  } = transaction;
  return [
    serialNumber,
    title,
    amount,
    dateExtractor(dateTime),
    voucherNumber,
    chequeNumber,
    category,
    opening,
    closing,
    remarks
  ];
};

const dateExtractor = date => {
  const dateParam = new Date(date);
  const day = dateParam.getDate();
  let month = dateParam.getMonth();
  if (month.length < 2) {
    month = "0" + month;
  }
  const year = dateParam.getFullYear();
  return `${day}-${month}-${year}`;
};
