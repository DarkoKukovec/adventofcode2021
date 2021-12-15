const { input } = require('./init');

const map = [];

const xSize = input.length;

for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
        for (let x = 0; x < input.length; x++) {
            map[xSize * a + x] = map[xSize * a + x] || [];
            for (let y = 0; y < input[x].length; y++) {
                map[xSize * a + x].push([(input[x][y][0] + a + b - 1) % 9 + 1, Infinity]);
            }
        }
    }
}

map[0][0][0] = 0;

function getDanger(x, y, prevDmg) {
    if (x >= map.length || y >= map[0].length) return;
    
    const currDmg = prevDmg + map[x][y][0];
    if (map[x][y][1] > currDmg) {
        map[x][y][1] = currDmg;
        if (x === map.length - 1 && y === map[0].length - 1) {
            return;
        }
        getDanger(x + 1, y, currDmg);
        getDanger(x, y + 1, currDmg);
    }
}

getDanger(0, 0, 0);
console.log(map.pop().pop()[1] - 3);