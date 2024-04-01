function generateDate() {
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
    const endDate = new Date();
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

module.exports = generateDate;
