const input = require('./input').split(/\n/g).map(Number);

let count = 0;

for (let i = 4; i < input.length; i++) {
    if (input[i] > input[i - 3]) {
        count++;
    }
}

console.log(count);
