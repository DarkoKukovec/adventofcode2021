const input = require('./input').split(/\n/g);

const pairs = input.slice(2).map((row) => {
    const [start, add] = row.split(' -> ');
    return { start, end: `${start[0]}${add}${start[1]}` };
}).reduce((map, curr) => {
    map[curr.start] = curr.end;
    return map;
}, {});

function split(template) {
    return template.slice(1).split('').map((_, i) => `${template[i]}${template[i + 1]}`).reduce((map, curr) => {
        map[curr] = (map[curr] || 0) + 1;
        return map;
    }, {});
}

function count(template) {
    const map = Object.keys(template).reduce((map, curr) => {
        map[curr[1]] = (map[curr[1]] || 0) + template[curr];
        return map;
    }, { [input[0][0]]: 1 });

    const min = Math.min(...Object.values(map));
    const max = Math.max(...Object.values(map));
    
    return max - min;
}

const reducer = (tmp) => (map, curr) => {
    if (pairs[curr]) {
        const a = pairs[curr].slice(0, 2);
        const b = pairs[curr].slice(1);
        map[a] = (map[a] || 0) + tmp[curr];
        map[b] = (map[b] || 0) + tmp[curr];
    } else {
        map[curr] = (map[curr] || 0) + tmp[curr]; 
    }
    return map;
};

module.exports = {
    template: split(input[0]),
    count,
    reducer,
};
