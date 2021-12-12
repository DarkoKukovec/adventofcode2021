const { input, inc } = require('./init');

let flashes = 0;

for (let i = 0; i < 100; i++) {
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
}

console.log(flashes);
