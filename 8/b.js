const input = require('./input').split(/\n/g).map((row) => row.split(' | ').map((s) => s.split(' ').map((num) => num.split('').sort().join(''))));

const results = input.map(([combos, nums]) => {
    const segments = {
        abcdefg: 8,
    };
    combos.sort((a, b) => a.length - b.length).forEach((num, i, c) => {
        const seg = num.split('').sort();
        if (num.length === 2) { // 1
            segments[seg.join('')] = 1;
        } else if (num.length === 3) { // 7
            segments[seg.join('')] = 7;
        } else if (num.length === 4) { // 4
            segments[seg.join('')] = 4;
        } else if (num.length === 5 && seg.filter((n) => c[0].includes(n)).length === 2) { // 3 -> length 5, includes 1
            segments[seg.join('')] = 3;
        } else if (num.length === 5 && seg.filter((n) => c[2].includes(n)).length === 2) { // 2 -> length 5, includes 2 segments from 4
            segments[seg.join('')] = 2;
        } else if (num.length === 5) { // 5
            segments[seg.join('')] = 5;
        } else if (num.length === 6 && seg.filter((n) => c[2].includes(n)).length === 4) { // 9 -> length 6, includes 4
            segments[seg.join('')] = 9;
        } else if (num.length === 6 && seg.filter((n) => c[0].includes(n)).length !== 2) { // 6 -> length 6, does not include 1
            segments[seg.join('')] = 6;
        } else if (num.length === 6) { // 0
            segments[seg.join('')] = 0;
        }
    });

    const digits = nums.map((num) => segments[num]);

    return Number(digits.join(''));
});

console.log(results.reduce((s, c) => s + c));
