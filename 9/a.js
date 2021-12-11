const input = require('./input').split(/\n/g).map((row) => row.split('').map(Number));

let riskSum = 0;

for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
        const curr = input[x][y];
        if (
            Math.min(
                (input[x]?.[y - 1] ?? Infinity) - curr,
                (input[x]?.[y + 1] ?? Infinity) - curr,
                (input[x - 1]?.[y] ?? Infinity) - curr,
                (input[x + 1]?.[y] ?? Infinity) - curr,
            ) > 0
        ) {
            riskSum += curr + 1;
        }
    }
}

console.log(riskSum);
