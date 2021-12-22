const { input } = require('./init');

const state = new Set();

input.forEach(({ status, x1, x2, y1, y2, z1, z2 }) => {
    for (let a = -50; a <= 50; a++) {
        if (a >= x1 && a <= x2) {
            for (let b = -50; b <= 50; b++) {
                if (b >= y1 && b <= y2) {
                    for (let c = -50; c <= 50; c++) {
                        if (c >= z1 && c <= z2) {
                            const key = [a, b, c].join(',');
                            state[status ? 'add' : 'delete'](key);
                        }
                    }
                }
            }
        }
    }
});

console.log(state.size)
