const input = require('./input').split(/\n/g);

let gamma = '';
let epsilon = '';

for (let digit = 0; digit < input[0].length; digit++) {
    let zeros = input.reduce((acc, curr) => acc + (curr[digit] === '0' ? 1 : 0), 0);
    if (zeros > input.length / 2) {
        gamma += '0';
        epsilon += '1';
    } else {
        gamma += '1';
        epsilon += '0';
    }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
