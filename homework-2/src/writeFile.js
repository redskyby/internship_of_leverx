const fs = require("fs");
// const generateDateToSvfFile = require("./moduleForWrite/generateDateToSvfFile");
const path = require("path");
const generateUUID = require("./moduleForWrite/generateUUID");
const generatePrice = require("./moduleForWrite/generatePrice");
const generateQuantity = require("./moduleForWrite/generateQuantity");
const generateDate = require("./moduleForWrite/generateDate");

const NAME_FILE = path.resolve(__dirname, "data.csv");
const COUNT_OF_ROWS = 3000;

// const createCvfFile = (name, data) => {
    //Old code
    // try {
    //     fs.writeFileSync(name, data);
    //     console.log("Файл успешно создан.");
    // } catch (error) {
    //     console.log("Ошибка при создании : ", error);
    // }

    //New code
    // const writeStream = fs.createWriteStream(name , { flags: 'a' });
    // const writeStream = fs.createWriteStream(NAME_FILE , { flags: 'a' });
    //
    // module.exports = writeStream;
    //
    // writeStream.on("error", (error) => {
    //     console.log("Ошибка при создании потока записи : ", error);
    // });

    // writeStream.write(data, "utf8", (error) => {
    //     if (error) {
    //         console.log("Ошибка при создании : ", error);
    //     } else {
    //         console.log("Файл успешно создан.");
    //     }
    //     writeStream.end();
    // });
// };
// const csvData = generateDateToSvfFile(COUNT_OF_ROWS);
const generateDateToSvfFile = (n) => {
    // Открываем поток записи
    const writeStream = fs.createWriteStream(NAME_FILE, { flags: 'a' });

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

generateDateToSvfFile(COUNT_OF_ROWS)

// createCvfFile(NAME_FILE, csvData);
