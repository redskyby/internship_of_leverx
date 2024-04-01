const exampleObject = {
    key1: 'value_1',
    key2: 'value_2',
    key3: 'value_3'
};

const pairObj = (obj) => {
    const pairs = [];

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            pairs.push([key, obj[key]]);
        }
    }

    console.log(pairs)
}

pairObj(exampleObject);

// TASK5
// Write a JavaScript function to convert an object into a list of `[key, value]` pairs
