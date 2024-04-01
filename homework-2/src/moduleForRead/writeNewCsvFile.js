const fs = require("fs");

const writeNewCsvFile = (name, data) => {
    try {
        fs.writeFileSync(name, data);
        console.log("Файл успешно обновлен.");
    } catch (error) {
        console.log("Ошибка при создании : ", error);
    }
};

module.exports = writeNewCsvFile;
