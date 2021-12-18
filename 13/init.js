const [part1, part2] = require('./input').split(/\n\n/).map((part) => part.split(/\n/g));

const points = part1.map((row) => row.split(',').map(Number));
const folds = part2.map((row) => row.split(' ').pop().split('='));

module.exports = { points, folds };