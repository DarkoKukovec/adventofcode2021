const input = require('./input').split(/\n/g).map((row) => parseInt(row.split(': ')[1], 10));

function mod(num, modulo = 1000) {
    return (num - 1) % modulo + 1;
}

module.exports = {
    input,
    mod,
};
