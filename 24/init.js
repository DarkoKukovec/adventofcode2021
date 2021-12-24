const input = require('./input').split(/\n/g).map((row) => row.split(' '));

const params = new Array(14).fill(null).map((_, i) => ({
    div: parseInt(input[4 + i * 18][2], 10),
    mod: parseInt(input[5 + i * 18][2], 10),
    add: parseInt(input[15 + i * 18][2], 10),
}));

const deps = [0];
const constraints = new Array(14).fill(null);
for (let i = 0; i < params.length; i++) {
    if (params[i].div == 1) {
        deps.push(i);
    } else {
        constraints[i] = deps.pop();
    }
}

module.exports = {
    constraints,
    params,
};
