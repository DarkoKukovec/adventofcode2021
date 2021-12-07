const input = require('./input').split(/,/g).map(Number);

const min = Math.min(...input);
const max = Math.max(...input);
let cost = Infinity;

for (let pos = min; pos <= max; pos++) {
    const currCost = input.reduce((sum, curr) => sum + Math.abs(curr - pos), 0);
    if (currCost <= cost) {
        cost = currCost;
    } else {
        break;
    }
}

console.log(cost);
