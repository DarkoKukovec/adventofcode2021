const input = require('./input').split(/\n/g).map((row) => row.split(' | ').map((s) => s.split(' ').map((num) => num.split('').sort().join(''))));

const numbers = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    abcdefg: 8,
    abcdfg: 9,
};

const all = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const results = input.slice(0, 1).map(([combos, nums]) => {
    const c = Array.from(new Set([...combos, ...nums]));
    const fiveDigits = c.slice(3, 3);
    const sixDigits = c.slice(6, 3);
    const segments = {
        8: all.slice(),
    };
    const map = {
        a: all.slice(),
        b: all.slice(),
        c: all.slice(),
        d: all.slice(),
        e: all.slice(),
        f: all.slice(),
        g: all.slice(),
    };
    c.sort((a, b) => a.length - b.length).forEach((num) => {
        console.log(num);
        const seg = num.split('');
        let keys = [];
        if (num.length === 2) { // 1
            keys = ['c', 'f'];
            segments[1] = seg;
        } else if (num.length === 3) { // 7
            keys = ['a', 'c', 'f'];
            segments[7] = seg;
        } else if (num.length === 4) { // 4
            keys = ['b', 'c', 'd', 'f'];
            segments[4] = seg;
        } else if (num.length === 5 && num.split('').filter((n) => c[0].includes(n)).length === 2) { // 3
            keys = ['a', 'c', 'd', 'f', 'g'];
            segments[3] = seg;
        } else if (num.length === 6 && num.split('').filter((n) => c[2].includes(n)).length === 4) { // 9
            keys = ['a', 'b', 'c', 'd', 'f', 'g'];
            segments[9] = seg;
        } else if (num.length === 6 && num.split('').filter((n) => c[0].includes(n)).length !== 2) { // 6
            keys = ['a', 'b', 'd', 'e', 'f', 'g'];
            segments[6] = seg;
        }

        if(keys.length) {
            seg.forEach((s) => map[s] = map[s].filter((l) => keys.includes(l)));
            all
                .filter((l) => !seg.includes(l))
                .forEach((s) => map[s] = map[s].filter((l) => !keys.includes(l)));
        }
    });

    const mapping = {};
    Object.entries(map).forEach(([key, [value]]) => {
        mapping[value] = key;
    });

    const digits = nums.map((num) => num.split('').map((n) => mapping[n]).sort().join(''));

    console.log(nums, digits, digits.map((n) => numbers[n]));
    return [JSON.stringify(mapping), JSON.stringify(map), nums, JSON.stringify(segments)];
});

console.log(results);
// a -> c (cf)
// b -> f (cf)
// c -> g (eg)
// d -> a (a)
// e -> b (bd)
// f -> d (bd)
// g -> e (eg)

// acdfg -> d(ab)(ef)(ab)(cg)