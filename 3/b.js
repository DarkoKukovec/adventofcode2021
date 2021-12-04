const input = require('./input').split(/\n/g);

let oxygenList = input.slice();
let co2List = input.slice();

let digit = 0;
do {
    let zeros = oxygenList.reduce((acc, curr) => acc + (curr[digit] === '0' ? 1 : 0), 0);
    const mostCommon = zeros > oxygenList.length / 2 ? '0' : '1';
    oxygenList = oxygenList.filter((item) => item[digit] === mostCommon);
    digit++;
} while(oxygenList.length > 1);

digit = 0;
do {
    let zeros = co2List.reduce((acc, curr) => acc + (curr[digit] === '0' ? 1 : 0), 0);
    const leastCommon = zeros <= co2List.length / 2 ? '0' : '1';
    co2List = co2List.filter((item) => item[digit] === leastCommon);
    digit++;
} while(co2List.length > 1);

console.log(parseInt(oxygenList[0], 2) * parseInt(co2List[0], 2));
