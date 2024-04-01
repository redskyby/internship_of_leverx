const runPromisesFromArray = (promises) => {
    return promises.reduce((prevPromise, nextPromise) => {
        return prevPromise.then(() => nextPromise());
    }, Promise.resolve());
}

const promises = [
    () => new Promise(resolve => setTimeout(() => resolve(console.log(1)), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve(console.log(2)), 2000)),
    () => new Promise(resolve => setTimeout(() => resolve(console.log(3)), 3000))
];

runPromisesFromArray(promises)
    .then(() => console.log('Все промисы отработали согласно очередности.'));

// TASK11
// Write a JavaScript program to run a given array of promises in series.
// output :
// 1
// 2
// 3
// Все промисы отработали согласно очередности.