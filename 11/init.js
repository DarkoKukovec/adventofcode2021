const input = require('./input').split(/\n/g).map((row) => row.split('').map(Number));

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

module.exports = { input, inc };