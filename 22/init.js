const input = require('./input').split(/\n/g).map((row) => {
    const status = row.split(' ')[0] === 'on';
    const coords = row.match(/(\-?\d+\.\.\-?\d+)/g).map((c) => c.split('..').map(Number));
    return {
        status,
        x1: Math.min(...coords[0]),
        x2: Math.max(...coords[0]) + 1,
        y1: Math.min(...coords[1]),
        y2: Math.max(...coords[1]) + 1,
        z1: Math.min(...coords[2]),
        z2: Math.max(...coords[2]) + 1,
    };
});

function vol(c) {
	return BigInt(c.x2 - c.x1) * BigInt(c.y2 - c.y1) * BigInt(c.z2 - c.z1);
}

function sub(a, b) {
	if (contains(b, a)) {
		return [];
	}

	if (!intersects(a, b)) {
		return [a];
	}

	const xSplits = [b.x1, b.x2].filter((x) => a.x1 < x && x < a.x2);
	const ySplits = [b.y1, b.y2].filter((y) => a.y1 < y && y < a.y2);
	const zSplits = [b.z1, b.z2].filter((z) => a.z1 < z && z < a.z2);

	const xv = [a.x1, ...xSplits, a.x2];
	const yv = [a.y1, ...ySplits, a.y2];
	const zv = [a.z1, ...zSplits, a.z2];

	const res = [];

	for (let i = 0; i < xv.length - 1; i++) {
		for (let j = 0; j < yv.length - 1; j++) {
			for (let k = 0; k < zv.length - 1; k++) {
				res.push({
					x1: xv[i],
					y1: yv[j],
					z1: zv[k],
					x2: xv[i+1],
					y2: yv[j+1],
					z2: zv[k+1],
				});
			}
		}
	}

	return res.filter((c) => !contains(b, c));
}

function contains(a, b) {
	return a.x1 <= b.x1 && a.x2 >= b.x2 && a.y1 <= b.y1 && a.y2 >= b.y2 && a.z1 <= b.z1 && a.z2 >= b.z2;
}

function intersects(a, b) {
	return a.x1 <= b.x2 && a.x2 >= b.x1 && a.y1 <= b.y2 && a.y2 >= b.y1 && a.z1 <= b.z2 && a.z2 >= b.z1;
}

module.exports = {
    input,
    vol,
    sub,
};
