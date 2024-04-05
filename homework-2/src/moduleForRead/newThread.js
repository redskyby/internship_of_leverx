const through2 = require("through2");
const filterCsvFile = require("./filterCsvFile");
const filterData = () => {
    // Создаем трансформирующий поток для фильтрации данных
    return through2.obj((record, encoding, callback) => {
        // Фильтруем записи с помощью вашей функции filterCsvFile
        if (filterCsvFile(record)) {
            callback(null, record);
        } else {
            callback();
        }
    });
};

module.exports = filterData;
