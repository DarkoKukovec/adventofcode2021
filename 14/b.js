const { template, reducer, count } = require('./init');

let tmp = template;
for (let i = 0; i < 40; i++) {
    tmp = Object.keys(tmp).reduce(reducer(tmp), {});
}

console.log(count(tmp));
