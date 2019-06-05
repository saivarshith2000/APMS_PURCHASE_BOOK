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

let EXCEL_HEADERS = [
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
const INDEX_OF_DATE = 3;

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

    for (let j = 0; j < transactionsOfThisAccount.length; j++) {
      DATA_ARRAY.push(
        convertTransactionToArray(j + 1, transactionsOfThisAccount[j])
      );
    }
    // sort this array by dates
    DATA_ARRAY.sort((a, b) => {
      return new Date(a[INDEX_OF_DATE]) - new Date(b[INDEX_OF_DATE]);
    });

    // create a copy of the DATA_ARRAY without the headers
    let DATA_COPY = DATA_ARRAY;

    // add date banners to the DATA_ARRAY
    console.log(addMonthsBanner(DATA_ARRAY));
    // add the headers to DATA_ARRAY
    DATA_ARRAY = [EXCEL_HEADERS].concat(DATA_ARRAY);
    // create a new workbook
    const wb = XLSX.utils.book_new();
    // create a new worksheet that contains all transactions
    let ws = XLSX.utils.aoa_to_sheet(DATA_ARRAY);
    // Append this worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "All Transactions");

    // Now add a new sheet for every category
    for (let k = 0; k < categoriesInThisAccount.length; k++) {
      let DATA_OF_THIS_SHEET = DATA_COPY.filter(data => {
        return data[INDEX_OF_CATEGORY] === categoriesInThisAccount[k];
      });
      DATA_OF_THIS_SHEET = [EXCEL_HEADERS].concat(DATA_OF_THIS_SHEET);
      ws = XLSX.utils.aoa_to_sheet(DATA_OF_THIS_SHEET);
      // Add date banners to the array
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

// this functions add as a new row in the array that shows the month of purchases
const addMonthsBanner = DATA_ARRAY => {
  if (DATA_ARRAY == null || DATA_ARRAY.length < 2) {
    return DATA_ARRAY;
  }
  let ARRAY_WITH_BANNER = [];
  let currentRow = [];
  let currentMonth = "";
  let nextMonth = "";
  ARRAY_WITH_BANNER.push(
    monthText[1 + getDateObj(DATA_ARRAY[0][INDEX_OF_DATE]).getMonth()]
  );
  for (let i = 0; i < DATA_ARRAY.length - 1; i++) {
    currentRow = DATA_ARRAY[i];
    currentMonth = (
      1 + getDateObj(currentRow[INDEX_OF_DATE]).getMonth()
    ).toString();
    nextMonth = (
      1 + getDateObj(DATA_ARRAY[i + 1][INDEX_OF_DATE]).getMonth()
    ).toString();
    // dates are formatted as dd-mm-yyyy => month is at index 3,4
    // Add a banner showing the month of the first month

    if (currentMonth !== nextMonth) {
      // push a new row containing next month
      ARRAY_WITH_BANNER.push(monthText[nextMonth]);
    }
    // push the next row
    ARRAY_WITH_BANNER.push(DATA_ARRAY[i + 1]);
  }
  return ARRAY_WITH_BANNER;
};

const getDateObj = dateString => {
  if (dateString == null || dateString.length == 0) {
    return null;
  }
  let dateParts = dateString.split("-");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};

const monthText = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};
