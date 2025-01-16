"use strict";
class BoardII {
    // Create a deep copy
    constructor(board) {
        this.board = board.map(row => [...row]);
    }
    arrToString() {
        return this.board
            .map(row => row.map(cell => cell === 0 ? '*' : cell).join(' '))
            .join('\n');
    }
    toString() {
        return this.arrToString();
    }
    findEmptyCell() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }
    validInRow(rowIndex, num) {
        return !this.board[rowIndex].includes(num);
    }
    validInCol(colIndex, num) {
        for (let row = 0; row < 9; row++) {
            if (this.board[row][colIndex] === num) {
                return false;
            }
        }
        return true;
    }
    validInSquare(rowIndex, colIndex, num) {
        const rowStart = Math.floor(rowIndex / 3) * 3;
        const colStart = Math.floor(colIndex / 3) * 3;
        for (let row = rowStart; row < rowStart + 3; row++) {
            for (let col = colStart; col < colStart + 3; col++) {
                if (this.board[row][col] === num) {
                    return false;
                }
            }
        }
        return true;
    }
    isValid(position, num) {
        const [row, col] = position;
        return this.validInRow(row, num) &&
            this.validInCol(col, num) &&
            this.validInSquare(row, col, num);
    }
    solver() {
        const emptyCell = this.findEmptyCell();
        if (!emptyCell) {
            return true;
        }
        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(emptyCell, num)) {
                this.board[row][col] = num;
                if (this.solver()) {
                    return true;
                }
                this.board[row][col] = 0;
            }
        }
        return false;
    }
}
function sudokuSolverII(board) {
    const gameboard = new BoardII(board);
    console.log('Puzzle to solve:\n' + gameboard);
    if (gameboard.solver()) {
        console.log('Solved puzzle:\n' + gameboard);
    }
    else {
        console.log('The provided puzzle is unsolvable');
        return null;
    }
}
const boardToSolveII = [
    [0, 0, 2, 0, 0, 8, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 7, 6, 2],
    [4, 3, 0, 0, 0, 0, 8, 0, 0],
    [0, 5, 0, 0, 3, 0, 0, 9, 0],
    [0, 4, 0, 0, 0, 0, 0, 2, 6],
    [0, 0, 0, 4, 6, 7, 0, 0, 0],
    [0, 8, 6, 7, 0, 4, 0, 0, 0],
    [0, 0, 0, 5, 1, 9, 0, 0, 8],
    [1, 7, 0, 0, 0, 6, 0, 0, 5]
];
sudokuSolverII(boardToSolveII);
