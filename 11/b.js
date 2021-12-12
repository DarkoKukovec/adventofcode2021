const { input, inc } = require('./init');

let step = 0;
let flashes;
do {
    flashes = 0;
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            inc(x, y);
        }
    }
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            if (input[x][y] > 9) {
                flashes++;
                input[x][y] = 0;
            }
        }
    }
    step++;
} while (flashes < 100);

console.log(step);
