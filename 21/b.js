const { input, mod } = require('./init');

const pos = input.slice();
const cache = new Map();

const combinations = Array.from({ length: 27 })
    .map((_, i) => i.toString(3).padStart(3, '0').split('').map(Number).map((x) => x + 1));

function play(pos, points) {
    if (points[1] >= 21) return [0, 1];

    const key = [...pos, ...points].join(',');
    const cached = cache.get(key);
    if (cached) return cached;

    let res = [0, 0];

    for (const rolls of combinations) {
        let newPos = mod(pos[0] + rolls[0] + rolls[1] + rolls[2], 10);
        let newPoints = points[0] + newPos;
        const wins = play([pos[1], newPos], [points[1], newPoints]);
        res[0] += wins[1];
        res[1] += wins[0];
    }

    cache.set(key, res);
    return res;
}

const wins = play(pos, [0, 0]);

console.log(Math.max(...wins));
