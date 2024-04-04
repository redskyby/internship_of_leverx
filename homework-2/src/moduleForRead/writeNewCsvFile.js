const fs = require("fs");

const writeNewCsvFile = (name, data) => {
    // old code
    // try {
    //     fs.writeFileSync(name, data);
    //     console.log("Файл успешно обновлен.");
    // } catch (error) {
    //     console.log("Ошибка при создании : ", error);
    // }

    // new code

    const writeStream = fs.createWriteStream(name);

    writeStream.on("error", (error) => {
        console.log("Ошибка при создании потока записи : ", error);
    });
    writeStream.write(data, "utf8", (error) => {
        if (error) {
            console.log("Ошибка при записи : ", error);
        } else {
            console.log("Файл успешно обновлен.");
        }
        writeStream.end();
    });
};

module.exports = writeNewCsvFile;
