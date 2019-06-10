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
  // this async function recieves a json string and writes it to APMS_BACKUP.json file
  return new Promise(function(resolve, reject) {
    writeFile(fileName, output(data), "ascii")
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export const restoreBackup = () => {
  return new Promise(function(resolve, reject) {
    readFile(fileName)
      .then(data => {
        console.log(data);
        resolve(JSON.parse(data));
      })
      .catch(err => {
        reject(err);
      });
  });
};
