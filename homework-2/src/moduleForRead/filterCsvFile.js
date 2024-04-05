const filterCsvFile = (result) => {
    // тут импровизированные поля для сортировки

    const fromDate = new Date(new Date().setFullYear(new Date().getFullYear() - 4)).toDateString();
    const toDate = new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toDateString();
    const minPrice = 20;
    const maxPrice = 70;
    const minQuantity = 10;
    const maxQuantity = 40;

    if (
        parseInt(result.Price) >= minPrice &&
        parseInt(result.Price) <= maxPrice &&
        parseInt(result.Quantity) >= minQuantity &&
        parseInt(result.Quantity) <= maxQuantity &&
        new Date(result.Date) > new Date(fromDate) &&
        new Date(result.Date) <= new Date(toDate)
    ) {
        // Если объект проходит проверку, возвращаем его
        return result;
    } else {
        // Если объект не проходит проверку, возвращаем null
        return null;
    }
};

module.exports = filterCsvFile;
