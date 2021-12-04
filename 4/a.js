const input = require('./input').split(/\n/g);

const numbers = input.splice(0, 2)[0].split(',').map(Number);

class Board {
    state = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ].flat();

    board = [];

    static wins = [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    ];

    constructor(boardData) {
        this.board = boardData.map((row) => row.trim().split(/\s+/g).map(Number)).flat();
    }

    play(num) {
        const index = this.board.indexOf(num);
        this.state[index] = 1;
    }

    get won() {
        return Board.wins.some((win) => win.reduce((count, w, i) => w ? this.state[i] + count : count, 0) === 5)
    }

    get score() {
        if (this.won) {
            return this.state.reduce((count, s, i) => s ? count : count + this.board[i], 0);
        }
    }
}

const boards = [];

while (input.length) {
    boards.push(new Board(input.splice(0, 6).splice(0, 5)));
}

let num;
do {
    num = numbers.shift();
    boards.map((board) => board.play(num));
} while(boards.every((board) => !board.won) && numbers.length);

console.log(num, boards.find((b) => b.won).score * num);
