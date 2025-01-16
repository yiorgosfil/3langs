class Board {
  private board: (number | null)[][]

  constructor(board: (number | null)[][]) {
    this.board = board
  }

  arrToString(): string {
    let boardStr = ''
    for (const row of this.board) {
      const rowStr = row.map(cell => cell != null ? cell.toString() : '*')
      boardStr += rowStr.join(' ')
      boardStr += '\n'
    }
    return boardStr
  }

  // Find the first empty cell on the board and return its indices 
  findEmptyCell(): number[] | null {
    for (const [rowIndex, rowValues] of this.board.entries()) {
      try {
        const colIndex = rowValues.indexOf(0)
        return [rowIndex, colIndex]
      } catch (error) {
        continue
      }
    }
    return null
  }

  // Check if a given number can be inserted into the row 
  validInRow(rowIndex: number, num: number): boolean {
    return this.board[rowIndex].includes(num)
  }

  // Check if a given number can be inserted into the column
  validInCol(colIndex: number, num: number): boolean {
    return Array
      .from({ length: 9 })
      .every((_, rowIndex) => this.board[rowIndex][colIndex] !== num)
  }

  // Check if a given number can be inserted in a 3x3 square on the board 
  validInSquare(
    rowIndex: number,
    colIndex: number,
    num: number): boolean {
    const rowStart = Math.floor(rowIndex / 3) * 3
    const colStart = Math.floor(colIndex / 3) * 3
    for (let rowNo = rowStart; rowNo < (rowStart + 3); rowNo++) {
      for (let colNo = colStart; colNo < (colStart + 3); colNo++) {
        if (this.board[rowNo][colNo] == num) {
          return false
        }
      }
    }
    return true
  }

  // Check if given number is valid ofr an empty cell 
  isValid(emptyCell: number[], num: number): boolean {
    const [rowIndex, colIndex] = emptyCell
    const isValidInRow = this.validInRow(rowIndex, num)
    const isValidInCol = this.validInCol(colIndex, num)
    const isValidInSquare = this.validInSquare(rowIndex, colIndex, num)
    return [isValidInRow, isValidInCol, isValidInSquare].every(Boolean)
  }

  solver() {
    // Find the next empty cell 
    let nextEmpty = this.findEmptyCell()
    if (nextEmpty == null) {
      return true
    }
    for (let guess = 1; guess < 10; guess++) {
      if (this.isValid(nextEmpty, guess)) {
        const [rowIndex, colIndex] = nextEmpty
        this.board[rowIndex][colIndex] = guess
        // Check if the board can be solved 
        if (this.solver()) {
          return true
        }
        // If no solution is found, resetthe cell and try the next possibility
        this.board[rowIndex][colIndex] = 0
      }
    }
    return false
  }
}

function sudokuSolver(board: number[][]) {
  const gameboard = new Board(board)

  console.log(`Puzzle to solve:\n ${gameboard}`)

  if (gameboard.solver()) {
    console.log(`Solved puzzle:\n ${gameboard}`)
  } else {
    console.log('The provided puzzle is unsolvable.')
  }
  return gameboard
}

const boardToSolve = [
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

sudokuSolver(boardToSolve)
