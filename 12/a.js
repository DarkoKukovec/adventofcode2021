const Cave = require('./init');

function search(current, visited = []) {
    if (current.name === 'end') return 1;
    if (visited.includes(current.name) && !current.isBig) return 0;
    return Object.values(current.paths).reduce((sum, curr) => sum + search(curr, [...visited, current.name]), 0);
}

const count = search(Cave.caves.start);

console.log(count);
