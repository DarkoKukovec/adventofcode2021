const { input } = require('./init');

input[0][0][0] = 0;

function getDanger(x, y, prevDmg) {
    if (x >= input.length || y >= input[0].length) return;
    
    const currDmg = prevDmg + input[x][y][0];
    if (input[x][y][1] > currDmg) {
        input[x][y][1] = currDmg;
        if (x === input.length - 1 && y === input[0].length - 1) {
            return;
        }
        getDanger(x + 1, y, currDmg);
        getDanger(x, y + 1, currDmg);
    }
}

getDanger(0, 0, 0);
console.log(input.pop().pop()[1]);