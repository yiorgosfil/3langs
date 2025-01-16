class Board:
    def __init__(self, board):
        self.board = board

    def __str__(self):
        board_str = ''
        for row in self.board:
            row_str = [str(i) if i else '*' for i in row]
            board_str += ' '.join(row_str)
            board_str += '\n'
        return board_str

    # Find the first empty cell on the board && its indices
    def find_empty_cell(self):
        # row -> row index && contents -> list of values in that row
        for row, contents in enumerate(self.board):
            try:
                col = contents.index(0) # Find the index of the 1st empty cell in this row 
                return row, col 
            except ValueError:
                pass
        return None

    # Check if a given number can be inserted into the row
    def valid_in_row(self, row, num):
        return num not in self.board[row]

    # Check if a given number can be inserted into the column
    def valid_in_col(self, col, num):
        return all(self.board[row][col] != num for row in range(9))

    # Check if a given number can be inserted in a 3x3 square on the board 
    def valid_in_square(self, row, col, num):
        row_start = (row // 3) * 3
        col_start = (col // 3) * 3
        for row_no in range(row_start, row_start + 3):
            for col_no in range(col_start, col_start + 3):
                if self.board[row_no][col_no] == num:
                    return False
        return True

    # Check if a given number is valid for an empty cell
    def is_valid(self, empty, num):
        row, col = empty 
        valid_in_row = self.valid_in_row(row, num)
        valid_in_col = self.valid_in_col(col, num)
        valid_in_square = self.valid_in_square(row, col, num)
        return all([valid_in_row, valid_in_col, valid_in_square])
        

    def solver(self):
        # Find the next empty cell
        if (next_empty := self.find_empty_cell()) is None:
            return True 
        # Try to fill the empty cell with the guess one at a time
        for guess in range(1, 10):
            if self.is_valid(next_empty, guess):
                row, col = next_empty
                self.board[row][col] = guess 
                # Check if the board can be solved
                if self.solver():
                    return True 
                # If no solution is found, reset the cell and try the next possibility
                self.board[row][col] = 0
        return False

def solve_sudoku(board):
    gameboard = Board(board)

    print(f'Puzzle to solve:\n{gameboard}')

    if gameboard.solver():
        print(f'Solved puzzle:\n{gameboard}')
    else:
        print('The provided puzzle is unsolvable.')
    return gameboard

board_to_solve = [
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

solve_sudoku(board_to_solve)

