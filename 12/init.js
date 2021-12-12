class Cave {
    static caves = {};

    constructor(name, pathTo) {
        this.name = name;
        this.paths = {};
        Cave.caves[name] = this;
        if (Cave.caves[pathTo]) {
            this.paths[pathTo] = Cave.caves[pathTo];
            Cave.caves[pathTo].paths[name] = this;
        }
    }

    get isBig() {
        return this.name === this.name.toUpperCase();
    }

    get isSingle() {
        return this.name === 'start' || this.name === 'end';
    }
}

require('./input').split(/\n/g).forEach((row) => {
    const [a, b] = row.split('-');
    let ca = Cave.caves[a];
    let cb = Cave.caves[b];
    if (!ca) {
        ca = new Cave(a, b);
    }
    if (!cb) cb = new Cave(b, a);
    ca.paths[b] = cb;
    cb.paths[a] = ca;
});

module.exports = Cave;
