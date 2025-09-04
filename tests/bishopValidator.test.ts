import { PIECES } from '../types/index';
import { isValidBishopMove } from '../validators/bishopValidator';

describe('Bishop Validator', () => {
  let board: string[][];

  beforeEach(() => {
    // Initialize an empty board for each test
    board = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
  });

  test('valid diagonal moves', () => {
    // Diagonal moves are valid for bishop
    expect(isValidBishopMove(board, 4, 4, 2, 2)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 2, 6)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 6, 2)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 6, 6)).toBe(true);
  });
  
  test('invalid non-diagonal moves', () => {
    // Non-diagonal moves are invalid for bishop
    expect(isValidBishopMove(board, 4, 4, 4, 6)).toBe(false);
    expect(isValidBishopMove(board, 4, 4, 6, 4)).toBe(false);
  });
  
  test('blocked diagonal paths', () => {
    // Place a piece in the diagonal path
    board[3][3] = PIECES.pawn.white;
    expect(isValidBishopMove(board, 4, 4, 2, 2)).toBe(false);
  });

  test('invalid non-diagonal moves', () => {
    // Horizontal move
    expect(isValidBishopMove(board, 4, 4, 4, 7)).toBe(false);
    
    // Vertical move
    expect(isValidBishopMove(board, 4, 4, 7, 4)).toBe(false);
    
    // Same position (no movement)
    expect(isValidBishopMove(board, 4, 4, 4, 4)).toBe(false);
    
    // Non-diagonal, non-orthogonal move
    expect(isValidBishopMove(board, 4, 4, 6, 7)).toBe(false);
  });

  test('blocked diagonal paths', () => {
    // Place a piece in the northeast path
    board[3][5] = PIECES.pawn.white;
    expect(isValidBishopMove(board, 4, 4, 2, 6)).toBe(false);
    
    // Place a piece in the southeast path
    board[5][5] = PIECES.pawn.white;
    expect(isValidBishopMove(board, 4, 4, 6, 6)).toBe(false);
    
    // Place a piece in the southwest path
    board[5][3] = PIECES.pawn.white;
    expect(isValidBishopMove(board, 4, 4, 6, 2)).toBe(false);
    
    // Place a piece in the northwest path
    board[3][3] = PIECES.pawn.white;
    expect(isValidBishopMove(board, 4, 4, 2, 2)).toBe(false);
  });

  test('moving to a square with an opponent piece', () => {
    // Place opponent pieces on diagonal ends
    board[1][1] = PIECES.pawn.black;
    board[1][7] = PIECES.pawn.black;
    board[7][1] = PIECES.pawn.black;
    board[7][7] = PIECES.pawn.black;
    
    // Can move to these squares (but not beyond)
    expect(isValidBishopMove(board, 4, 4, 1, 1)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 1, 7)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 7, 1)).toBe(true);
    expect(isValidBishopMove(board, 4, 4, 7, 7)).toBe(true);
  });

  test('edge case - bishop at corner', () => {
    // Place bishop at a1
    const cornerBoard = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
    cornerBoard[7][0] = PIECES.bishop.white;
    
    // The only valid diagonal from a1 is to the northeast
    expect(isValidBishopMove(cornerBoard, 7, 0, 6, 1)).toBe(true);
    expect(isValidBishopMove(cornerBoard, 7, 0, 5, 2)).toBe(true);
    expect(isValidBishopMove(cornerBoard, 7, 0, 4, 3)).toBe(true);
    
    // Place an obstacle
    cornerBoard[6][1] = PIECES.pawn.white;
    expect(isValidBishopMove(cornerBoard, 7, 0, 5, 2)).toBe(false);
  });
});
