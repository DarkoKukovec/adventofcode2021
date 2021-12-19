const { offsets } = require('./init');

const manhD = ([x1, y1, z1], [x2, y2, z2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);
const allD = offsets.flatMap((b1) => offsets.map((b2) => manhD(b1.offset, b2.offset)));
console.log(allD.reduce((acc, n) => (acc > n ? acc : n), -Infinity));
