const { input, mod } = require('./init');

const pos = input.slice();
const points = [0, 0];
let rolls = 0;

while (points[0] < 1000 && points[1] < 1000) {
    const player = rolls % 2;
    const move = mod(++rolls) + mod(++rolls) + mod(++rolls);
    pos[player] = mod(pos[player] + move, 10);
    points[player] += pos[player];
}

console.log(rolls * Math.min(...points));