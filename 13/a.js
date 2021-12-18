const { points, folds } = require('./init');

const dir = folds[0][0] === 'x' ? 0 : 1;
const pos = Number(folds[0][1]);
const newPoints = points.map((point) => {
    if (point[dir] > pos) {
        point[dir] = point[dir] - 2 * (point[dir] - pos);
    }
    return point.join(',');
});

console.log((new Set(newPoints)).size)