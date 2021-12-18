const input = require('./input')
    .split('')
    .map((d) => parseInt(d, 16)
        .toString(2).padStart(4, '0')
    )
    .join('');

function parsePackage(data) {
    const packageLengthStart = data.length;
    const version = parseInt(data.splice(0, 3).join(''), 2);
    const typeID = parseInt(data.splice(0, 3).join(''), 2);
    let result;
    let versionSum = version;
    if (typeID === 4) {
        let bin = '';
        do {
            const chunk = data.splice(0, 5);
            bin += chunk.slice(1).join('');
            if (chunk[0] === '0') break;
        } while(true);
        result = parseInt(bin, 2);
    } else {
        result = 0;
        const length = data.splice(0, 1).join('');
        const packages = [];
        if (length === '0') {
            let len = parseInt(data.splice(0, 15).join(''), 2);
            do {
                const [pd, pl, vs] = parsePackage(data);
                packages.push(pd);
                len -= pl;
                versionSum += vs;
            } while (len > 0);
        } else {
            const count = parseInt(data.splice(0, 11).join(''), 2);
            for (let i = 0; i < count; i++) {
                const [pd, pl, vs] = parsePackage(data);
                packages.push(pd);
                versionSum += vs;
            }
        }
        if (typeID === 0) result = packages.reduce((sum, c) => sum + c);
        if (typeID === 1) result = packages.reduce((sum, c) => sum * c);
        if (typeID === 2) result = Math.min(...packages);
        if (typeID === 3) result = Math.max(...packages);
        if (typeID === 5) result = packages[0] > packages[1] ? 1 : 0;
        if (typeID === 6) result = packages[0] < packages[1] ? 1 : 0;
        if (typeID === 7) result = packages[0] === packages[1] ? 1 : 0;
    }
    const packageLengthEnd = data.length;
    return [result, packageLengthStart - packageLengthEnd, versionSum];
}

module.exports = {
    input,
    parsePackage,
};
