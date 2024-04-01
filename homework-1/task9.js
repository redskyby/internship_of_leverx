const filterNullUndefinedArray = (array, callback) => {
    const filteredArray = array.filter(value => value !== null && value !== undefined);

    setTimeout(() => {
        callback(filteredArray);
    }, 5000);
}

const testArray = [1, null, 2, undefined, 3, 4, null, 5];
const showResult = result => {
    console.log("Отфильтрованный массив:", result);
};

filterNullUndefinedArray(testArray, showResult);

// TASK9
// Write a function that deletes null and undefined values from the array. The
// function takes two parameters: array, callback, runs for 5 seconds and then calls a
// callback function-parameter that displays the result of the execution.