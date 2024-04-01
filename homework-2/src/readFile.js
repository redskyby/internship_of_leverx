const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const writeNewCsvFile = require("./moduleForRead/writeNewCsvFile");
const createNewFileOfCsv = require("./moduleForRead/createNewFileOfCsv");
const filterCsvFile = require("./moduleForRead/filterCsvFile");

const OLD_DATA_FILE = path.resolve(__dirname, "data.csv");
const NEW_DATA_FILE = path.resolve(__dirname, "newData.csv");

const readAnFilterCsvFile = () => {
    let result = [];

    fs.createReadStream(OLD_DATA_FILE)
        .on("error", (error) => {
            console.error(`Ошибка при чтении файла ${OLD_DATA_FILE} : `, error);
        })
        .pipe(parse({ columns: true }))
        .on("data", (item) => {
            result.push(item);
        })
        .on("end", () => {
            const filter = filterCsvFile(result);
            const newData = createNewFileOfCsv(filter);
            writeNewCsvFile(NEW_DATA_FILE, newData);
        });
};

readAnFilterCsvFile();
