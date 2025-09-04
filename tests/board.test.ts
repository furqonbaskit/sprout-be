import { PIECES } from '../types/index';
import { initializeBoard } from '../index';

describe('Chess Board Initialization', () => {
  let board: string[][];
  
  beforeEach(() => {
    board = initializeBoard();
  });

  test('board should be 8x8', () => {
    expect(board.length).toBe(8);
    board.forEach(row => {
      expect(row.length).toBe(8);
    });
  });

  test('pawns should be correctly positioned', () => {
    // Check black pawns (second row)
    for (let col = 0; col < 8; col++) {
      expect(board[1][col]).toBe(PIECES.pawn.black);
    }
    
    // Check white pawns (seventh row)
    for (let col = 0; col < 8; col++) {
      expect(board[6][col]).toBe(PIECES.pawn.white);
    }
  });

  test('black pieces should be correctly positioned', () => {
    expect(board[0][0]).toBe(PIECES.rook.black);
    expect(board[0][1]).toBe(PIECES.knight.black);
    expect(board[0][2]).toBe(PIECES.bishop.black);
    expect(board[0][3]).toBe(PIECES.queen.black);
    expect(board[0][4]).toBe(PIECES.king.black);
    expect(board[0][5]).toBe(PIECES.bishop.black);
    expect(board[0][6]).toBe(PIECES.knight.black);
    expect(board[0][7]).toBe(PIECES.rook.black);
  });

  test('white pieces should be correctly positioned', () => {
    expect(board[7][0]).toBe(PIECES.rook.white);
    expect(board[7][1]).toBe(PIECES.knight.white);
    expect(board[7][2]).toBe(PIECES.bishop.white);
    expect(board[7][3]).toBe(PIECES.queen.white);
    expect(board[7][4]).toBe(PIECES.king.white);
    expect(board[7][5]).toBe(PIECES.bishop.white);
    expect(board[7][6]).toBe(PIECES.knight.white);
    expect(board[7][7]).toBe(PIECES.rook.white);
  });

  test('middle of the board should be empty', () => {
    for (let row = 2; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        expect(board[row][col]).toBe(PIECES.empty);
      }
    }
  });
});
