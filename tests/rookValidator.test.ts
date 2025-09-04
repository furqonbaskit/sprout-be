import { PIECES } from '../types/index';
import { isValidRookMove } from '../validators/rookValidator';

describe('Rook Validator', () => {
  let board: string[][];

  beforeEach(() => {
    // Initialize an empty board for each test
    board = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
  });

  test('valid orthogonal moves', () => {
    // Horizontal and vertical moves
    expect(isValidRookMove(board, 4, 4, 4, 7)).toBe(true); // Horizontal
    expect(isValidRookMove(board, 4, 4, 7, 4)).toBe(true); // Vertical
  });
  
  test('invalid diagonal moves', () => {
    // Diagonal moves are invalid for rook
    expect(isValidRookMove(board, 4, 4, 6, 6)).toBe(false);
    expect(isValidRookMove(board, 4, 4, 2, 2)).toBe(false);
  });
  
  test('blocked paths', () => {
    // Place a blocking piece
    board[4][6] = PIECES.pawn.white;
    expect(isValidRookMove(board, 4, 4, 4, 7)).toBe(false);
  });

  test('valid vertical moves', () => {
    // Vertical moves (from e4)
    expect(isValidRookMove(board, 4, 4, 0, 4)).toBe(true); // Up to e8
    expect(isValidRookMove(board, 4, 4, 7, 4)).toBe(true); // Down to e1
    expect(isValidRookMove(board, 4, 4, 2, 4)).toBe(true); // Up to e6
    expect(isValidRookMove(board, 4, 4, 6, 4)).toBe(true); // Down to e2
  });

  test('invalid diagonal and non-orthogonal moves', () => {
    // Diagonal move
    expect(isValidRookMove(board, 4, 4, 2, 2)).toBe(false);
    expect(isValidRookMove(board, 4, 4, 6, 6)).toBe(false);
    expect(isValidRookMove(board, 4, 4, 2, 6)).toBe(false);
    expect(isValidRookMove(board, 4, 4, 6, 2)).toBe(false);
    
    // Same position (no movement)
    expect(isValidRookMove(board, 4, 4, 4, 4)).toBe(false);
    
    // Non-orthogonal move
    expect(isValidRookMove(board, 4, 4, 6, 7)).toBe(false);
  });

  test('horizontal blocked paths', () => {
    // Place pieces horizontally to block the rook
    board[4][2] = PIECES.pawn.white; // Left blocker
    board[4][6] = PIECES.pawn.white; // Right blocker
    
    // Blocked moves
    expect(isValidRookMove(board, 4, 4, 4, 0)).toBe(false); // Can't go to a4
    expect(isValidRookMove(board, 4, 4, 4, 1)).toBe(false); // Can't go to b4
    expect(isValidRookMove(board, 4, 4, 4, 7)).toBe(false); // Can't go to h4
    
    // Unblocked moves
    expect(isValidRookMove(board, 4, 4, 4, 3)).toBe(true); // Can go to d4
    expect(isValidRookMove(board, 4, 4, 4, 5)).toBe(true); // Can go to f4
  });

  test('vertical blocked paths', () => {
    // Place pieces vertically to block the rook
    board[2][4] = PIECES.pawn.white; // Upward blocker
    board[6][4] = PIECES.pawn.white; // Downward blocker
    
    // Blocked moves
    expect(isValidRookMove(board, 4, 4, 0, 4)).toBe(false); // Can't go to e8
    expect(isValidRookMove(board, 4, 4, 1, 4)).toBe(false); // Can't go to e7
    expect(isValidRookMove(board, 4, 4, 7, 4)).toBe(false); // Can't go to e1
    
    // Unblocked moves
    expect(isValidRookMove(board, 4, 4, 3, 4)).toBe(true); // Can go to e5
    expect(isValidRookMove(board, 4, 4, 5, 4)).toBe(true); // Can go to e3
  });

  test('moving to a square with an opponent piece', () => {
    // Place opponent pieces at the ends of files and ranks
    board[4][0] = PIECES.pawn.black; // Left end (a4)
    board[4][7] = PIECES.pawn.black; // Right end (h4)
    board[0][4] = PIECES.pawn.black; // Top end (e8)
    board[7][4] = PIECES.pawn.black; // Bottom end (e1)
    
    // Can move to capture these pieces
    expect(isValidRookMove(board, 4, 4, 4, 0)).toBe(true);
    expect(isValidRookMove(board, 4, 4, 4, 7)).toBe(true);
    expect(isValidRookMove(board, 4, 4, 0, 4)).toBe(true);
    expect(isValidRookMove(board, 4, 4, 7, 4)).toBe(true);
  });

  test('edge case - rook in corner', () => {
    // Place rook at a1
    const cornerBoard = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
    cornerBoard[7][0] = PIECES.rook.white;
    
    // Can move along file and rank
    expect(isValidRookMove(cornerBoard, 7, 0, 7, 7)).toBe(true); // a1 to h1
    expect(isValidRookMove(cornerBoard, 7, 0, 0, 0)).toBe(true); // a1 to a8
    
    // Place obstacles
    cornerBoard[7][3] = PIECES.pawn.white; // Horizontal blocker
    cornerBoard[3][0] = PIECES.pawn.white; // Vertical blocker
    
    // Test blocked paths
    expect(isValidRookMove(cornerBoard, 7, 0, 7, 4)).toBe(false); // Can't go past d1
    expect(isValidRookMove(cornerBoard, 7, 0, 2, 0)).toBe(false); // Can't go past a5
  });
});
