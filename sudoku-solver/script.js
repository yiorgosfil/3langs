var Board = /** @class */ (function () {
    function Board(board) {
        this.board = board;
    }
    Board.prototype.arrToString = function () {
        var boardStr = '';
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var row = _a[_i];
            var rowStr = row.map(function (cell) { return cell != null ? cell.toString() : '*'; });
            boardStr += rowStr.join(' ');
            boardStr += '\n';
        }
        return boardStr;
    };
    // Find the first empty cell on the board and return its indices 
    Board.prototype.findEmptyCell = function () {
        for (var _i = 0, _a = this.board.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], rowIndex = _b[0], rowValues = _b[1];
            try {
                var colIndex = rowValues.indexOf(0);
                return [rowIndex, colIndex];
            }
            catch (error) {
                continue;
            }
        }
        return null;
    };
    // Check if a given number can be inserted into the row 
    Board.prototype.validInRow = function (rowIndex, num) {
        return this.board[rowIndex].includes(num);
    };
    // Check if a given number can be inserted into the column
    Board.prototype.validInCol = function (colIndex, num) {
        var _this = this;
        return Array
            .from({ length: 9 })
            .every(function (_, rowIndex) { return _this.board[rowIndex][colIndex] !== num; });
    };
    // Check if a given number can be inserted in a 3x3 square on the board 
    Board.prototype.validInSquare = function (rowIndex, colIndex, num) {
        var rowStart = Math.floor(rowIndex / 3) * 3;
        var colStart = Math.floor(colIndex / 3) * 3;
        for (var rowNo = rowStart; rowNo < (rowStart + 3); rowNo++) {
            for (var colNo = colStart; colNo < (colStart + 3); colNo++) {
                if (this.board[rowNo][colNo] == num) {
                    return false;
                }
            }
        }
        return true;
    };
    // Check if given number is valid ofr an empty cell 
    Board.prototype.isValid = function (emptyCell, num) {
        var rowIndex = emptyCell[0], colIndex = emptyCell[1];
        var isValidInRow = this.validInRow(rowIndex, num);
        var isValidInCol = this.validInCol(colIndex, num);
        var isValidInSquare = this.validInSquare(rowIndex, colIndex, num);
        return [isValidInRow, isValidInCol, isValidInSquare].every(Boolean);
    };
    Board.prototype.solver = function () {
        // Find the next empty cell 
        var nextEmpty = this.findEmptyCell();
        if (nextEmpty == null) {
            return true;
        }
        for (var guess = 1; guess < 10; guess++) {
            if (this.isValid(nextEmpty, guess)) {
                var rowIndex = nextEmpty[0], colIndex = nextEmpty[1];
                this.board[rowIndex][colIndex] = guess;
                // Check if the board can be solved 
                if (this.solver()) {
                    return true;
                }
                // If no solution is found, resetthe cell and try the next possibility
                this.board[rowIndex][colIndex] = 0;
            }
        }
        return false;
    };
    return Board;
}());
function sudokuSolver(board) {
    var gameboard = new Board(board);
    console.log("Puzzle to solve:\n ".concat(gameboard));
    if (gameboard.solver()) {
        console.log("Solved puzzle:\n ".concat(gameboard));
    }
    else {
        console.log('The provided puzzle is unsolvable.');
    }
    return gameboard;
}
var boardToSolve = [
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
sudokuSolver(boardToSolve);
