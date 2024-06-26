const reverseObj = (obj) => {
    const swappedObj = {};
    // old code
    // for (const key in obj) {
    //     if (Object.hasOwnProperty.call(obj, key)) {
    //         swappedObj[obj[key]] = key;
    //     }
    // }


    //new code
    Object.entries(obj).forEach(([key, value]) => {
        swappedObj[value] = key;
    });

    console.log(swappedObj);
}

// Example usage:
const originalObject = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
};

reverseObj(originalObject);


// TASK4
// Write a JavaScript function to get a copy of the object where the keys have
// become the values and the values the keys
