const input = [1, 2, 1000, 300, [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]];

const flatArray = (arr) => {
    return arr.reduce((acc, curr) => {
        if (Array.isArray(curr)) {
            return acc.concat(flatArray(curr));
        } else {
            acc.push(curr);
            return acc;
        }
    }, []);
}

const sortArray = (arr) => {
    return arr.sort((a, b) => a - b);
}


const arrayFlatAndSort = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0){
        return arr;
    }

    const newFlatArray = flatArray(arr);
    return sortArray(newFlatArray);
};

const output = arrayFlatAndSort(input);
console.log(output)


// TASK7
// Flat an array (use reduce here) and sort it (by ascending)
// Example #1
// Input: [1, 2, 1000, 300, [400, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]]
// Output: [1, 1, 2, 2, 3, 3, 4, 5, 6, 10, 11, 12, 300, 400, 1000]
