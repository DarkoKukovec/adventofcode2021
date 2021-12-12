const Cave = require('./init');

function search(current, visited = [], doubleSmall = false) {
    if (current.name === 'end') return 1;
    if (visited.includes(current.name) && current.isSingle) return 0; // start, end
    if (visited.includes(current.name) && !current.isBig && doubleSmall) return 0; // second small cave
    const isDoubleSmall = doubleSmall || (visited.includes(current.name) && !current.isBig); // first small cave
    return Object.values(current.paths).reduce((sum, curr) => sum + search(curr, [...visited, current.name], isDoubleSmall), 0);
}

const count = search(Cave.caves.start);

console.log(count);
