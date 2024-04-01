const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите ограничение для последовательности Фибоначчи: ', (limit) => {
    const result = fibonacciSeries(parseInt(limit));
    console.log('Последовательность Фибоначчи:', result);
    rl.close();
});

function fibonacciSeries(limit) {
    let fibonacci = [0, 1];
    let nextNum = 0;
    while ((nextNum = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]) < limit) {
        fibonacci.push(nextNum);
    }
    return fibonacci;
}

// TASK1
// Write a Javascript function that returns the Fibonacci series up to a certain number
// Example #1
// Input: 8
// Output: [0, 1, 1, 2, 3, 5]
// Example #2
// Input: 610
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]