const filterCsvFile = (result) => {
    // тут импровизированные поля для сортировки

    const fromDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toDateString();
    const toDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toDateString();
    const minPrice = 20;
    const maxPrice = 70;
    const minQuantity = 10;
    const maxQuantity = 40;

    return result.filter(
        (item) =>
            parseInt(item.Price) >= minPrice &&
            parseInt(item.Price) <= maxPrice &&
            parseInt(item.Quantity) >= minQuantity &&
            parseInt(item.Quantity) <= maxQuantity &&
            item.Date > fromDate &&
            item.Date <= toDate,
    );
};

module.exports = filterCsvFile;
