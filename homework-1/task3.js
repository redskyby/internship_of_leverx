let str1 = "JavaScript Exercises";
let str2 = "exercises";

let str3 = "JavaScript Exercises";
let str4 = "Exercisess";


const caseInsensitiveSearch = (a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();

    if (lowerA.indexOf(lowerB) !== -1) {
        console.log("Matched");
    } else {
        console.log("Not Matched");
    }
}

caseInsensitiveSearch(str1, str2);
caseInsensitiveSearch(str3, str4);

// TASK
// Write a JavaScript function to create a case-insensitive search
// Example #1
// Input: console.log(caseInsensitiveSearch('JavaScript Exercises', 'exercises'));
// Output: "Matched"
// Example #2
// Input: console.log(caseInsensitiveSearch('JavaScript Exercises', 'Exercisess'));
// Output: "Not Matched"
