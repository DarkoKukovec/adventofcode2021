const [alg, input] = require('./input').split(/\n\n/);
const image = input.split(/\n/g).map((row) => row.split('').map((pixel) => pixel === '#' ? 1 : 0));

function expand(img, def) {
    return [
        ''.padStart(img.length + 2, def).split('').map(Number),
        ...img.map((row) => [def, ...row, def]),
        ''.padStart(img.length + 2, def).split('').map(Number),
    ];
}

function getPixel(image, x, y, def = '0') {
    let pos = ''
        + (image[x - 1]?.[y - 1] ?? def)
        + (image[x - 1]?.[y] ?? def)
        + (image[x - 1]?.[y + 1] ?? def)
        + (image[x]?.[y - 1] ?? def)
        + (image[x]?.[y] ?? def)
        + (image[x]?.[y + 1] ?? def)
        + (image[x + 1]?.[y - 1] ?? def)
        + (image[x + 1]?.[y] ?? def)
        + (image[x + 1]?.[y + 1] ?? def);

    return alg[parseInt(pos, 2)] === '#' ? 1 : 0;
}

function getImage(img, def) {
    return img.map((row, x) => row.map((_, y) => getPixel(img, x, y, def)));
}

function getLight(image) {
    return image.reduce((sum, curr) => sum + curr.reduce((s, c) => s + c), 0)
}

function getFinalImage(count) {
    let img = image;
    for (let c = 0; c < count; c++) {
        const def = alg[0] === '.' ? 0 : (c % 2);
        img = getImage(expand(img, def), def);
    }
    return getLight(img);
}

module.exports = {
    getFinalImage,
};
