const { input } = require('./init');

let moved;
let hasMoved;
let steps = 0;
const x = input.length;
const y = input[0].length;
let map = input.map((row) => row.slice());

do {
    hasMoved = false;
    steps++;

    moved = [];
    map = map.map((row, i) => row.map((curr, j) => {
        if (curr === '>' && map[i][(j + 1) % y] === '.') {
            moved.push({ x: i, y: (j + 1) % y, val: curr });
            hasMoved = true;
            return '.';
        }
        return curr;
    }));
    moved.map(({x, y, val}) => map[x][y] = val);

    moved = [];
    map = map.map((row, i) => row.map((curr, j) => {
        if (curr === 'v' && map[(i + 1) % x][j] === '.') {
            moved.push({ x: (i + 1) % x, y: j, val: curr });
            hasMoved = true;
            return '.';
        }
        return curr;
    }));
    moved.map(({x, y, val}) => map[x][y] = val);
} while (hasMoved);

console.log(steps);
