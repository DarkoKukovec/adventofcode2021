const { input, parsePackage } = require('./init');

const dataArr = input.split('');

console.log(parsePackage(dataArr)[2]);