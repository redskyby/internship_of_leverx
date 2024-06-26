const a = [1, 2, 3];
const b = [100, 2, 1, 10];

const c = [1, 2, 3, 4, 5];
const d = [1, [2], [3, [[4]]], [5, 6]];

const check = (a, b) => {

    const newA = a.flat(Infinity);
    const newB = b.flat(Infinity)
    const fullFlatArray = [...newA, ...newB];
    let result = []


    for (let i = 0; i < fullFlatArray.length; i++) {
        if ((!newA.includes(fullFlatArray[i]) && newB.includes(fullFlatArray[i])) ||
            ((newA.includes(fullFlatArray[i]) && !newB.includes(fullFlatArray[i])))) {
            result.push(fullFlatArray[i]);
        }
    }


    console.log(result);
}

check(a, b);
check(c, d);


// TASK2
// 2) Write a JavaScript function to find the unique elements from two arrays
// Example #1
// Input: console.log(difference([1, 2, 3], [100, 2, 1, 10]));
// Output: ["3", "10", "100"]
// Example #2
// Input: console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
// Output: ["6"]
