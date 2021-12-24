const { constraints, params } = require('./init');

const val = [];
for (const [dep, constr] of constraints.entries()) {
    if (constr === null) continue;
    val[constr] = Math.min(9, 9 - params[constr].add - params[dep].mod);
    val[dep] = val[constr] + params[constr].add + params[dep].mod;
}

console.log(val.join(''));
