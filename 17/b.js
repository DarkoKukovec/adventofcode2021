const { validX, validY } = require('./init');

const points = new Set();

validX.forEach(({ x, steps: stepsX, xVelocity }) => {
  validY.forEach(({ y, steps: stepsY }) => {
    if (stepsX === stepsY) points.add(`${x},${y}`);
    else if (stepsX < stepsY && xVelocity === 0) points.add(`${x},${y}`);
  });
});


console.log(points.size);
