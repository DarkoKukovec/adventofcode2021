const { validY } = require('./init');


console.log(Math.max(...validY.map(({ maxPosY }) => maxPosY)));
