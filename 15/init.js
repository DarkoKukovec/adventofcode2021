const input = require('./input')
    .split(/\n/g)
    .map((row) => row
        .split('')
        .map(Number)
        .map((dmg) => [dmg, Infinity]),
    );

module.exports = {
    input,
};
