const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку, потом через пробел subString: ', (input) => {
    const [str, subStr] = input.split(' ');
    const result = countOfSubStr(str, subStr);
    console.log('Результат:', result);
    rl.close();
});

function countOfSubStr(str, subStr) {
    if (str.length === 0) {
        return 0;
    }

    let count = 0;
    let index = 0;

    while ((index = str.indexOf(subStr, index)) !== -1) {
        count++;
        index += subStr.length;
    }


    return count;
}

// TASK7
// Write a JavaScript function to count the occurrence of a substring in a string