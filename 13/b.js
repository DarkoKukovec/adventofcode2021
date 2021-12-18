const { points, folds } = require('./init');

for (let i = 0; i < folds.length; i++) {
    const dir = folds[i][0] === 'x' ? 0 : 1;
    const pos = Number(folds[i][1]);
    points.map((point) => {
        if (point[dir] > pos) {
            point[dir] = point[dir] - 2 * (point[dir] - pos);
        }
        return point;
    });
}

const maxx = Math.max(...points.map(([x]) => x));
const maxy = Math.max(...points.map(([_, y]) => y));
const list = points.map((p) => p.join(','));

for (let y = 0; y <= maxy; y++) {
    let line = '';
    for (let x = 0; x <= maxx; x++) {
        line += list.includes(`${x},${y}`) ? '#' : ' ';
    }
    console.log(line);
}
