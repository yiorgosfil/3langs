// tsc scriptII.ts --lib es2016,dom --target es2015 --strict

class BoardII {
  private board: number[][]

  // Create a deep copy
  constructor(board: number[][]) {
    this.board = board.map(row => [...row])
  }

  arrToString(): string {
    return this.board
      .map(row => row.map(cell => cell === 0 ? '*' : cell).join(' '))
      .join('\n')
  }

  toString(): string {
    return this.arrToString()
  }

  findEmptyCell(): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          return [row, col]
        }
      }
    }
    return null
  }

  validInRow(rowIndex: number, num: number): boolean {
    return !this.board[rowIndex].includes(num)
  }

  validInCol(colIndex: number, num: number): boolean {
    for (let row = 0; row < 9; row++) {
      if (this.board[row][colIndex] === num) {
        return false
      }
    }
    return true
  }

  validInSquare(rowIndex: number, colIndex: number, num: number): boolean {
    const rowStart = Math.floor(rowIndex / 3) * 3
    const colStart = Math.floor(colIndex / 3) * 3

    for (let row = rowStart; row < rowStart + 3; row++) {
      for (let col = colStart; col < colStart + 3; col++) {
        if (this.board[row][col] === num) {
          return false
        }
      }
    }
    return true
  }

  isValid(position: [number, number], num: number): boolean {
    const [row, col] = position
    return this.validInRow(row, num) &&
      this.validInCol(col, num) &&
      this.validInSquare(row, col, num)
  }

  solver(): boolean {
    const emptyCell = this.findEmptyCell()

    if (!emptyCell) {
      return true
    }

    const [row, col] = emptyCell

    for (let num = 1; num <= 9; num++) {
      if (this.isValid(emptyCell, num)) {
        this.board[row][col] = num

        if (this.solver()) {
          return true
        }

        this.board[row][col] = 0
      }
    }
    return false
  }
}

function sudokuSolverII(board: number[][]): number[][] | null | undefined {
  const gameboard = new BoardII(board)

  console.log('Puzzle to solve:\n' + gameboard)

  if (gameboard.solver()) {
    console.log('Solved puzzle:\n' + gameboard)
  } else {
    console.log('The provided puzzle is unsolvable')
    return null
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
]

sudokuSolverII(boardToSolveII)
