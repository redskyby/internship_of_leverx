const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку, которую нужно разбить:', (str) => {
    const result = uncamelizeString(str);
    if (result === undefined) {
        console.log('Некорректное значение. Программа будет завершена!');
        rl.close();
        return;
    }
    console.log('Результат:', result);
    rl.close();
});

function uncamelizeString(str) {
    if (str.length === 0) {
        console.log("Вы отправили пустую строку!")
        return;
    }

    const gap = " ";
    return str.replace(/[A-Z]/g, item => gap + item.toLowerCase()).trim();
}

// TASK6
// Write a JavaScript function to uncamelize a string
// input : HelloWorldHowAreYou
// output : hello world how are you