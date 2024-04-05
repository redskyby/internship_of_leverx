const generateUUID = require("./generateUUID");
const generatePrice = require("./generatePrice");
const generateQuantity = require("./generateQuantity");
const generateDate = require("./generateDate");
const writeStream = require("../writeFile");

const generateDateToSvfFile = (n) => {
    let csvData = "UUID,Price,Quantity,Date\n";

    for (let i = 0; i < n; i++) {
        const uuid = generateUUID();
        const price = generatePrice();
        const quantity = generateQuantity();
        const date = generateDate().toDateString();

        csvData += `${uuid},${price},${quantity},${date}\n`;
        writeStream.write(csvData, "utf8");
    }


};

module.exports = generateDateToSvfFile;
