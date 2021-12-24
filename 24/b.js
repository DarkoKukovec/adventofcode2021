const { constraints, params } = require('./init');

const val = [];
for (const [dep, constr] of constraints.entries()) {
    if (constr === null) continue;
    const sum = params[constr].add + params[dep].mod;
    val[constr] = Math.max(1 - sum, 1);
    val[dep] = val[constr] + params[constr].add + params[dep].mod;
}

console.log(val.join(''));
