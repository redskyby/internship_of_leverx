const createNewFileOfCsv = (data) => {
    let newCsv = "UUID,Price,Quantity,Date\n";

    for (const item of data) {
        const { UUID, Price, Quantity, Date } = item;
        newCsv += `${UUID},${Price},${Quantity},${Date}\n`;
    }

    return newCsv;
};

module.exports = createNewFileOfCsv;
