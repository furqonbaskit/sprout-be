import { BLACK, PIECES, WHITE } from '../types/index';
import { isValidPawnMove } from '../validators/pawnValidator';

describe('Pawn Validator', () => {
  let board: string[][];

  beforeEach(() => {
    // Initialize an empty board for each test
    board = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
  });

  describe('White Pawn Movement', () => {
    beforeEach(() => {
      // Place a white pawn at e2 (row 6, col 4)
      board[6][4] = PIECES.pawn.white;
    });

    test('can move forward one square', () => {
      // e2 to e3
      expect(isValidPawnMove(board, 6, 4, 5, 4)).toBe(true);
    });

    test('can move forward two squares from starting position', () => {
      // e2 to e4
      expect(isValidPawnMove(board, 6, 4, 4, 4)).toBe(true);
    });

    test('cannot move forward two squares if not in starting position', () => {
      // Move pawn to e3 first
      board[5][4] = PIECES.pawn.white;
      board[6][4] = PIECES.empty;
      
      // e3 to e5 (two squares)
      expect(isValidPawnMove(board, 5, 4, 3, 4)).toBe(false);
    });

    test('cannot move forward if blocked', () => {
      // Place a piece in front of the pawn
      board[5][4] = PIECES.pawn.black;
      
      // e2 to e3
      expect(isValidPawnMove(board, 6, 4, 5, 4)).toBe(false);
    });

    test('cannot move forward two squares if path is blocked', () => {
      // Place a piece in between
      board[5][4] = PIECES.pawn.black;
      
      // e2 to e4
      expect(isValidPawnMove(board, 6, 4, 4, 4)).toBe(false);
    });

    test('can capture diagonally', () => {
      // Place enemy pieces diagonally
      board[5][3] = PIECES.pawn.black; // d3
      board[5][5] = PIECES.pawn.black; // f3
      
      // e2 to d3
      expect(isValidPawnMove(board, 6, 4, 5, 3)).toBe(true);
      
      // e2 to f3
      expect(isValidPawnMove(board, 6, 4, 5, 5)).toBe(true);
    });

    test('cannot capture diagonally if no enemy piece present', () => {
      // e2 to d3 (empty square)
      expect(isValidPawnMove(board, 6, 4, 5, 3)).toBe(false);
      
      // e2 to f3 (empty square)
      expect(isValidPawnMove(board, 6, 4, 5, 5)).toBe(false);
    });

    test('cannot capture own pieces diagonally', () => {
      // Place friendly pieces diagonally
      board[5][3] = PIECES.pawn.white; // d3
      board[5][5] = PIECES.pawn.white; // f3
      
      // e2 to d3
      expect(isValidPawnMove(board, 6, 4, 5, 3)).toBe(false);
      
      // e2 to f3
      expect(isValidPawnMove(board, 6, 4, 5, 5)).toBe(false);
    });
  });

  describe('Black Pawn Movement', () => {
    beforeEach(() => {
      // Place a black pawn at e7 (row 1, col 4)
      board[1][4] = PIECES.pawn.black;
    });

    test('can move forward one square', () => {
      // e7 to e6
      expect(isValidPawnMove(board, 1, 4, 2, 4)).toBe(true);
    });

    test('can move forward two squares from starting position', () => {
      // e7 to e5
      expect(isValidPawnMove(board, 1, 4, 3, 4)).toBe(true);
    });

    test('cannot move forward two squares if not in starting position', () => {
      // Move pawn to e6 first
      board[2][4] = PIECES.pawn.black;
      board[1][4] = PIECES.empty;
      
      // e6 to e4 (two squares)
      expect(isValidPawnMove(board, 2, 4, 4, 4)).toBe(false);
    });

    test('cannot move forward if blocked', () => {
      // Place a piece in front of the pawn
      board[2][4] = PIECES.pawn.white;
      
      // e7 to e6
      expect(isValidPawnMove(board, 1, 4, 2, 4)).toBe(false);
    });

    test('cannot move forward two squares if path is blocked', () => {
      // Place a piece in between
      board[2][4] = PIECES.pawn.white;
      
      // e7 to e5
      expect(isValidPawnMove(board, 1, 4, 3, 4)).toBe(false);
    });

    test('can capture diagonally', () => {
      // Place enemy pieces diagonally
      board[2][3] = PIECES.pawn.white; // d6
      board[2][5] = PIECES.pawn.white; // f6
      
      // e7 to d6
      expect(isValidPawnMove(board, 1, 4, 2, 3)).toBe(true);
      
      // e7 to f6
      expect(isValidPawnMove(board, 1, 4, 2, 5)).toBe(true);
    });

    test('cannot capture diagonally if no enemy piece present', () => {
      // e7 to d6 (empty square)
      expect(isValidPawnMove(board, 1, 4, 2, 3)).toBe(false);
      
      // e7 to f6 (empty square)
      expect(isValidPawnMove(board, 1, 4, 2, 5)).toBe(false);
    });

    test('cannot capture own pieces diagonally', () => {
      // Place friendly pieces diagonally
      board[2][3] = PIECES.pawn.black; // d6
      board[2][5] = PIECES.pawn.black; // f6
      
      // e7 to d6
      expect(isValidPawnMove(board, 1, 4, 2, 3)).toBe(false);
      
      // e7 to f6
      expect(isValidPawnMove(board, 1, 4, 2, 5)).toBe(false);
    });
  });
  
  describe('Edge Cases', () => {
    test('pawn cannot move backwards', () => {
      // White pawn moving backwards
      board[5][4] = PIECES.pawn.white; // e3
      expect(isValidPawnMove(board, 5, 4, 6, 4)).toBe(false); // e3 to e2
      
      // Black pawn moving backwards
      board[2][4] = PIECES.pawn.black; // e6
      expect(isValidPawnMove(board, 2, 4, 1, 4)).toBe(false); // e6 to e7
    });

    test('pawn cannot move horizontally', () => {
      // White pawn moving sideways
      board[6][4] = PIECES.pawn.white; // e2
      expect(isValidPawnMove(board, 6, 4, 6, 5)).toBe(false); // e2 to f2
      
      // Black pawn moving sideways
      board[1][4] = PIECES.pawn.black; // e7
      expect(isValidPawnMove(board, 1, 4, 1, 3)).toBe(false); // e7 to d7
    });

    test('pawn cannot move more than two squares', () => {
      // White pawn
      board[6][4] = PIECES.pawn.white; // e2
      expect(isValidPawnMove(board, 6, 4, 3, 4)).toBe(false); // e2 to e5
      
      // Black pawn
      board[1][4] = PIECES.pawn.black; // e7
      expect(isValidPawnMove(board, 1, 4, 4, 4)).toBe(false); // e7 to e4
    });
  });
});
