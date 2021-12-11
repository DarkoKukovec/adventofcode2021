const input = require('./input').split(/\n/g).map((row) => row.split('').map(Number));

let flashes = 0;

function inc(x, y) {
    if (x < 0 || y < 0) return;
    if (x >= input.length || y >= input[x].length) return;
    if (input[x][y] > 9) return;
    input[x][y]++;
    if (input[x][y] > 9) {
        inc(x - 1, y - 1);
        inc(x - 1, y);
        inc(x - 1, y + 1);
        inc(x, y - 1);
        inc(x, y + 1);
        inc(x + 1, y - 1);
        inc(x + 1, y);
        inc(x + 1, y + 1);
    }
}

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
