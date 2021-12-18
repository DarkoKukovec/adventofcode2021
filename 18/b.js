const { input, add, getMagnitude } = require('./init');

let maxMagnitude = 0;

for (let a = 0; a < input.length; a++) {
    for (let b = 0; b < input.length; b++) {
        if (a === b) continue;
        maxMagnitude = Math.max(maxMagnitude, getMagnitude(add(input[a], input[b])));
    }
}

console.log(maxMagnitude);
