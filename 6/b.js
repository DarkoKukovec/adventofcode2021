const fish = require('./input').split(',').map(Number);

const DAYS = 256;
let count = 0;
const cache = {};

function getCount(f) {
    if (cache[f]) {
        return cache[f];
    }
    let count = 1;
    for (let x = f; x < DAYS; x += 7) {
        count += getCount(x + 9);
    }
    cache[f] = count;
    return count;
}

while(fish.length) {
    const f = fish.shift();
    count += getCount(f);
}

console.log(count);