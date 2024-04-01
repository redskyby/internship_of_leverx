const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const generateDateToSvfFile = require("./moduleForWrite/generateDateToSvfFile");
const path = require("path");

const NAME_FILE = path.resolve(__dirname, "data.csv");
const COUNT_OF_ROWS = 3000;

const createCvfFile = (name, data) => {
    try {
        fs.writeFileSync(name, data);
        console.log("Файл успешно создан.");
    } catch (error) {
        console.log("Ошибка при создании : ", error);
    }
};
const csvData = generateDateToSvfFile(COUNT_OF_ROWS);

createCvfFile(NAME_FILE, csvData);
