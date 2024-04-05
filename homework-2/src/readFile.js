const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const { stringify } = require("csv-stringify");
const filterData = require("./moduleForRead/newThread");

const OLD_DATA_FILE = path.resolve(__dirname, "dataOfCsv.csv");
const NEW_DATA_FILE = path.resolve(__dirname, "newDataOfCsv.csv");

const readAndWriteCsvFile = () => {
    fs.createReadStream(OLD_DATA_FILE)
        .on("error", (error) => {
            console.error(`Ошибка при чтении файла ${OLD_DATA_FILE} : `, error);
        })
        .pipe(parse({ columns: true }))
        .pipe(filterData())
        .pipe(stringify({ header: true }))
        .pipe(fs.createWriteStream(NEW_DATA_FILE))
        .on("error", (error) => {
            console.error(`Ошибка при записи в файл ${NEW_DATA_FILE} : `, error);
        })
        .on("finish", () => {
            console.log(`Данные успешно записаны в файл ${NEW_DATA_FILE}`);
        });
};

readAndWriteCsvFile();
