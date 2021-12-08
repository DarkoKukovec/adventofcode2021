const input = require('./input').split(/\n/g).map((row) => row.split(' | ')[1].split(' '));

const count = input.reduce((sum, curr) => sum + curr.reduce((s, c) => s + ([2, 3, 4, 7].includes(c.length) ? 1 : 0) , 0), 0);

console.log(count);