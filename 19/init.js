const input = require('./input').split(/\n\n/g).map((group) => {
    const beacons = group.split(/\n/g).slice(1).map((row) => row.split(',').map(Number));
    return {
        beacons,
        distances: beacons.map((b1) => beacons.map((b2) => Math.sqrt((b1[0] - b2[0]) ** 2 + (b1[1] - b2[1]) ** 2 + (b1[2] - b2[2]) ** 2))),
    };
});

const signs = [0, 1, 2, 3, 4, 5, 6, 7].map((num) => num.toString(2).padStart(3, '0').split('').map(Number).map((num) => num || -1));
const axis = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const allTransforms = axis.map((a) => signs.map((s) => a.map((axis, i) => ({ axis, sign: s[i] })))).flat(1);

const offsets = new Array(input.length).fill(undefined);
offsets[0] = { axes: allTransforms[0], offset: [0, 0, 0] };

const overlaps = ({ distances: d1 }, { distances: d2 }) => {
    const found = [];
    d1.forEach((a1, i1) => {
        d2.forEach((a2, i2) => {
            if (a1.filter((item) => a2.includes(item)).length >= 12) {
                found.push([i1, i2]);
            }
        });
    });
    return found;
};

const allOverlaps = input.map((s1) => input.map((s2) => (s1 === s2 ? [] : overlaps(s1, s2))));
const neighbors = allOverlaps.map((c) => c.map((os, idx) => (os.length >= 12 ? idx : undefined)).filter((n) => typeof n === 'number'));
const transform = (t, p) => t.map(({ sign, axis }) => p[axis] * sign);

const toVisit = neighbors[0].map((n) => [0, n]);
while (toVisit.length > 0) {
    const [friend, target] = toVisit.shift();
    if (offsets[target] !== undefined) continue;
    const friendTransform = offsets[friend].axes;
    const laps = allOverlaps[friend][target];
    const candidates = allTransforms.map((t) => {
        const ds = laps.map(([friendL, targetL]) => {
            const b1 = transform(friendTransform, input[friend].beacons[friendL]);
            const b2 = transform(t, input[target].beacons[targetL]);
            return b1.map((n, i) => n - b2[i]);
        });
        return [
            ds.filter((elt) => elt[0] === ds[0][0] && elt[1] === ds[0][1] && elt[2] === ds[0][2]).length,
            ds[0],
        ];
    });
    const candidate = candidates.findIndex(([b]) => b === laps.length);
    offsets[target] = {
        axes: allTransforms[candidate],
        offset: candidates[candidate][1].map((n, idx) => n + offsets[friend].offset[idx]),
    };
    toVisit.push(...neighbors[target].map((n) => [target, n]));
}

const allBeacons = new Set();
input.forEach(({ beacons }, i) => {
    const { offset, axes } = offsets[i];
    beacons.forEach((b) => {
        allBeacons.add(transform(axes, b).map((x, i) => x + offset[i]).join(','));
    });
});

module.exports = {
    input,
    allBeacons,
    offsets,
};