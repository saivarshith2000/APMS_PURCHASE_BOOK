import RNFetchBlob from "rn-fetch-blob";

const {
  writeFile,
  readFile,
  dirs: { DownloadDir }
} = RNFetchBlob.fs;
const DDP = DownloadDir + "/APMS_VOUCHER_BOOK/";
const fileName = DDP + "APMS_BACKUP.json";

const output = str => str.split("").map(x => x.charCodeAt(0));

export const createBackup = data => {
  // this function recieves a json string and writes it to APMS_BACKUP.json file
  let retVal = false; // success status of backup
  writeFile(fileName, output(data), "ascii")
    .then(res => {
      retVal = true;
    })
    .catch(err => {
      console.log(error), (retVal = false);
    });
  return retVal;
};

export const restoreBackup = () => {
  let retVal = null;
  readFile(fileName)
    .then(data => (retVal = JSON.parse(data)))
    .catch(err => console.log(err));
  return retVal;
};
