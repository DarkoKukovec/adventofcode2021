const input = require('./input')
    .split(/\n/g)
    .map(
        (row) => row
            .split(/\,|\-\>/g)
            .filter((x) => x.length)
            .map(Number),
    );

const map = {};

input.forEach(([x1, y1, x2, y2]) => {
    if (x1 === x2) {
        const yMin = Math.min(y1, y2);
        const yMax = Math.max(y1, y2);
        for (let y = yMin; y <= yMax; y++) {
            map[`${x1},${y}`] = (map[`${x1},${y}`] || 0) + 1;
        }
    } else if (y1 === y2) {
        const xMin = Math.min(x1, x2);
        const xMax = Math.max(x1, x2);
        for (let x = xMin; x <= xMax; x++) {
            map[`${x},${y1}`] = (map[`${x},${y1}`] || 0) + 1;
        }
    }
})

const dangerous = Object.values(map).reduce((sum, curr) => curr > 1 ? sum + 1 : sum, 0);

console.log(dangerous);