const { input, sub, vol } = require('./init');

let cubes = [];
input.map((curr) => {
    cubes = cubes.flatMap((c) => sub(c, curr));

    if (curr.status) {
        cubes.push(curr);
    }
});

const res = cubes.map((c) => vol(c)).reduce((a, b) => a + b, 0n).toString();

console.log(res);