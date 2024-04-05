const fs = require("fs");
const path = require("path");
const generateUUID = require("./moduleForWrite/generateUUID");
const generatePrice = require("./moduleForWrite/generatePrice");
const generateQuantity = require("./moduleForWrite/generateQuantity");
const generateDate = require("./moduleForWrite/generateDate");

const NAME_FILE = path.resolve(__dirname, "dataOfCsv.csv");
const COUNT_OF_ROWS = 3000;

const generateDateToSvfFile = (n) => {
    // Открываем поток записи
    const writeStream = fs.createWriteStream(NAME_FILE);

    writeStream.on("error", (error) => {
        console.log("Ошибка при создании потока записи : ", error);
    });

    // Записываем заголовок CSV
    writeStream.write("UUID,Price,Quantity,Date\n", "utf8");

    // Генерируем и записываем строки CSV
    for (let i = 0; i < n; i++) {
        const uuid = generateUUID();
        const price = generatePrice();
        const quantity = generateQuantity();
        const date = generateDate().toDateString();

        const csvData = `${uuid},${price},${quantity},${date}\n`;
        writeStream.write(csvData, "utf8");
    }

    // Закрываем поток записи
    writeStream.end(() => {
        console.log("Файл успешно создан.");
    });
};

generateDateToSvfFile(COUNT_OF_ROWS);
