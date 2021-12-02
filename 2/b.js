const input = require('./input').split(/\n/g).map((row) => [ row.split(' ')[0], parseInt(row.split(' ')[1], 10) ]);

let horizontal = 0;
let vertical = 0;
let aim = 0;

const cmds = {
    up: (amount) => aim -= amount,
    down: (amount) => aim += amount,
    forward: (amount) => {
        horizontal += amount;
        vertical += aim * amount;
    },
};

for (let i = 0; i < input.length; i++) {
    const [direction, amount] = input[i];
    cmds[direction](amount);
}

console.log(horizontal * vertical);