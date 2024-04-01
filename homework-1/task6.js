const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку, которую нужно разбить: ', (str) => {
    const result = uncamelizeString(str);
    console.log('Результат:', result);
    rl.close();
});

function uncamelizeString(str) {
    const gap = " ";
    return str.replace(/[A-Z]/g, item => gap + item.toLowerCase());
}

// TASK6
// Write a JavaScript function to uncamelize a string
// input : HelloWorldHowAreYou
// output : hello world how are you