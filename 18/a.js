const { input, add, toJSON, getMagnitude } = require('./init');

const res = input.reduce((res, curr) => add(res, curr));

console.log(toJSON(res), getMagnitude(res));
