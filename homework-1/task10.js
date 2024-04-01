const after6Seconds = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Промис через 6 секунд");
        }, 6000);
    });
}

after6Seconds().then((data) => {
    console.log(data);
}).catch((e) => {
    console.error(e);
});

// TASK10
// Write a function that returns Promise, which is resolved after 6 seconds.