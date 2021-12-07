const input = require('./input').split(/,/g).map(Number);

const min = Math.min(...input);
const max = Math.max(...input);
let cost = Infinity;

const knownCost = {};

function getSingleCost(num) {
    if (!knownCost[num]) {
        knownCost[num] = Array.from({ length: num }).reduce((sum, _, i) => sum + i + 1, 0);
    }
    return knownCost[num];
}

for (let pos = min; pos <= max; pos++) {
    const currCost = input.reduce((sum, curr) => sum + getSingleCost(Math.abs(curr - pos)), 0);
    if (currCost <= cost) {
        cost = currCost;
    } else {
        break;
    }
}

console.log(cost);
