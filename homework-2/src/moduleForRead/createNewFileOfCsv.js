const createNewFileOfCsv = (data) => {
    let newCsv = "UUID,Price,Quantity,Date\n";

    // old code
    // for (let i = 0; i < data.length; i++) {
    //     const uuid = data[i].UUID;
    //     const price = data[i].Price;
    //     const quantity = data[i].Quantity;
    //     const date = data[i].Date;
    //
    //     newCsv += `${uuid},${price},${quantity},${date}\n`;
    // }

    // new code
    for (const item of data) {
        const { UUID, Price, Quantity, Date } = item;
        newCsv += `${UUID},${Price},${Quantity},${Date}\n`;
    }

    return newCsv;
};

module.exports = createNewFileOfCsv;
