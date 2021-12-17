const input = require('./input').split(/\s/g).slice(2).reduce((target, curr, index) => {
  if (index) {
    target.y = curr.slice(2).split('..').map(Number).sort((a, b) => b - a);
  } else {
    target.x = curr.slice(2, -1).split('..').map(Number).sort((a, b) => a - b);
  }
  return target;
}, {});

const validY = [];
let y = input.y[1];
while(y < 200) {
  let steps = 0;
  let posY = 0;
  let maxPosY = -Infinity;
  let yVelocity = y;
  while (posY >= input.y[1]) {
    steps++;
    posY += yVelocity;
    if (posY > maxPosY) {
      maxPosY = posY;
    }
    yVelocity--;
    if (posY <= input.y[0] && posY >= input.y[1]) {
      validY.push({ y, maxPosY, steps });
    }
  }
  y++;
}

const validX = [];
let x = input.x[1];
do {
  let steps = 0;
  let posX = 0;
  let xVelocity = x;
  while (posX <= input.x[1]) {
    if (xVelocity === 0) {
      break;
    }
    steps++;
    posX += xVelocity;
    xVelocity--;
    if (posX >= input.x[0] && posX <= input.x[1]) {
      validX.push({ x, steps, xVelocity });
    }
  }
  x--;
} while(x >= 0);

module.exports = {
  input,
  validY,
  validX,
};