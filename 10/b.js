const input = require('./input').split(/\n/g).map((row) => row.trim());

const points = { ')': 1, ']': 2, '}': 3, '>': 4 };
let total = [];

input.forEach((line) => {
    const closing = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === closing[0]) closing.shift();
        else if (line[i] === '(') closing.unshift(')');
        else if (line[i] === '[') closing.unshift(']');
        else if (line[i] === '{') closing.unshift('}');
        else if (line[i] === '<') closing.unshift('>');
        else return;
    }
    let score = 0;
    closing.forEach((char) => {
        score *= 5;
        score += points[char];
    });
    total.push(score);
});

total.sort((a, b) => a - b);
console.log(total[Math.floor(total.length / 2)]);
