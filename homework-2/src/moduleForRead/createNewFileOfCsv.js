const createNewFileOfCsv = (data) => {
    let newCsv = "UUID,Price,Quantity,Date\n";

    for (let i = 0; i < data.length; i++) {
        const uuid = data[i].UUID;
        const price = data[i].Price;
        const quantity = data[i].Quantity;
        const date = data[i].Date;

        newCsv += `${uuid},${price},${quantity},${date}\n`;
    }

    return newCsv;
};

module.exports = createNewFileOfCsv;
