const input = require('./input').split(/\n/g).map((row) => row.trim());

const points = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
let total = 0;

input.forEach((line) => {
    const closing = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === closing[0]) closing.shift();
        else if (line[i] === '(') closing.unshift(')');
        else if (line[i] === '[') closing.unshift(']');
        else if (line[i] === '{') closing.unshift('}');
        else if (line[i] === '<') closing.unshift('>');
        else {
            total += points[line[i]];
            break;
        }
    }
});

console.log(total);
