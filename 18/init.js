const types = { '[': 'open', ']': 'close', ',': 'separator'};
const input = require('./input').split(/\n/g).map((row) => row.match(/(\[|\]|,|\d)/g).map((item) => ({ type: types[item] || 'number', value: types[item] ? item : parseInt(item, 10) })));//.map((row) => JSON.parse(row));

function checkExplode(input) {
    let depth = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i].type === 'open') depth++;
        if (input[i].type === 'close') depth--;
        if (input[i].type === 'number' && depth > 4 && input[i + 2].type === 'number') {
            const left = input[i].value;
            const right = input[i + 2].value;
            const newInput = input.slice();
            newInput.splice(i - 1, 5, { type: 'number', value: 0 });
            for (let j = i - 2; j >= 0; j--) {
                if(newInput[j]?.type === 'number') {
                    newInput[j] = { type: 'number', value: left + newInput[j].value };
                    break;
                }
            }
            for (let j = i; j <= newInput.length; j++) {
                if(newInput[j]?.type === 'number') {
                    newInput[j] = { type: 'number', value: right + newInput[j].value };
                    break;
                }
            }
            return newInput;
        }
    }
    return false;
}

function checkSplit(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].type === 'number' && input[i].value > 9) {
            const value = input[i].value;
            const newInput = input.slice();
            newInput.splice(i, 1, 
                { type: 'open', value: '[' },
                { type: 'number', value: Math.floor(value / 2) },
                { type: 'separator', value: ',' },
                { type: 'number', value: Math.ceil(value / 2) },
                { type: 'close', value: ']' },
            );
            return newInput;
        }
    }
    return false;
}

function checkOperations(input) {
        let newInput = input;
        do {
            const explode = checkExplode(newInput);
            if (explode) {
                // console.log('explode', prettyPrint(newInput), '|', prettyPrint(explode));
                newInput = explode;
                continue;
            }

            const split = checkSplit(newInput);
            if (split) {
                // console.log('split', prettyPrint(newInput), '|', prettyPrint(split));
                newInput = split;
                continue;
            }
    
            break;
        } while(true);

        return newInput;

}

function plainAdd(a, b) {
    return [
        { type: 'open', value: '[' },
        ...a,
        { type: 'separator', value: ',' },
        ...b,
        { type: 'close', value: ']' },
    ];
}

function add(a, b) {
    return checkOperations(plainAdd(a, b));
}

function toJSON(input) {
    return input.map((item) => item.value).join('');
}

function getValue(data) {
    if (typeof data === 'number') return data;
    return 3 * getValue(data[0]) + 2 * getValue(data[1]);
}

function getMagnitude(input) {
    const data = JSON.parse(toJSON(input));
    return getValue(data);
}

module.exports = {
    input,
    checkOperations,
    add,
    toJSON,
    getMagnitude,
};
