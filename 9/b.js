const input = require('./input').split(/\n/g).map((row) => row.split('').map(Number));

let basinSizes = [];

function checkBasin(x, y, checked) {
    if (x < 0 || y < 0) return 0;
    if (x >= input.length || y >= input[x].length) return 0;
    if (checked.includes(`${x},${y}`)) return 0;
    checked.push(`${x},${y}`);
    const curr = input[x][y];
    if (curr < 9) {
        return 1
            + checkBasin(x + 1, y, checked)
            + checkBasin(x - 1, y, checked)
            + checkBasin(x, y + 1, checked)
            + checkBasin(x, y - 1, checked);
    }
    return 0;
}

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
            basinSizes.push(checkBasin(x, y, []));
        }
    }
}

basinSizes.sort((a, b) => b - a);

console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);
