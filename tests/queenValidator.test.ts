import { PIECES } from '../types/index';
import { isValidQueenMove } from '../validators/queenValidator';

describe('Queen Validator', () => {
  let board: string[][];

  beforeEach(() => {
    // Initialize an empty board for each test
    board = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
  });

  test('valid moves like a rook and bishop', () => {
    // Queen combines rook and bishop movement
    expect(isValidQueenMove(board, 4, 4, 4, 7)).toBe(true); // Horizontal (rook)
    expect(isValidQueenMove(board, 4, 4, 7, 4)).toBe(true); // Vertical (rook)
    expect(isValidQueenMove(board, 4, 4, 6, 6)).toBe(true); // Diagonal (bishop)
    expect(isValidQueenMove(board, 4, 4, 2, 2)).toBe(true); // Diagonal (bishop)
  });
  
  test('invalid non-orthogonal, non-diagonal moves', () => {
    // Knight-like move is invalid for queen
    expect(isValidQueenMove(board, 4, 4, 2, 5)).toBe(false);
    expect(isValidQueenMove(board, 4, 4, 6, 3)).toBe(false);
  });
  
  test('blocked paths', () => {
    // Place a blocking piece
    board[4][6] = PIECES.pawn.white;
    expect(isValidQueenMove(board, 4, 4, 4, 7)).toBe(false);
    
    // Place a diagonal blocking piece
    board[5][5] = PIECES.pawn.white;
    expect(isValidQueenMove(board, 4, 4, 6, 6)).toBe(false);
  });

  test('valid vertical moves like a rook', () => {
    // Vertical moves
    expect(isValidQueenMove(board, 4, 4, 0, 4)).toBe(true); // Up to e8
    expect(isValidQueenMove(board, 4, 4, 7, 4)).toBe(true); // Down to e1
  });

  test('valid diagonal moves like a bishop', () => {
    // Diagonal moves
    expect(isValidQueenMove(board, 4, 4, 1, 1)).toBe(true); // Northwest to a7
    expect(isValidQueenMove(board, 4, 4, 1, 7)).toBe(true); // Northeast to h7
    expect(isValidQueenMove(board, 4, 4, 7, 1)).toBe(true); // Southwest to a1
    expect(isValidQueenMove(board, 4, 4, 7, 7)).toBe(true); // Southeast to h1
  });

  test('invalid non-orthogonal, non-diagonal moves', () => {
    // Knight-like move
    expect(isValidQueenMove(board, 4, 4, 2, 5)).toBe(false);
    
    // Same position (no movement)
    expect(isValidQueenMove(board, 4, 4, 4, 4)).toBe(false);
    
    // Random non-valid move
    expect(isValidQueenMove(board, 4, 4, 6, 7)).toBe(false);
  });

  test('horizontal blocked paths', () => {
    // Place pieces horizontally to block the queen
    board[4][2] = PIECES.pawn.white; // Left blocker
    board[4][6] = PIECES.pawn.white; // Right blocker
    
    // Blocked horizontal moves
    expect(isValidQueenMove(board, 4, 4, 4, 0)).toBe(false); // Can't go to a4
    expect(isValidQueenMove(board, 4, 4, 4, 7)).toBe(false); // Can't go to h4
    
    // Unblocked moves
    expect(isValidQueenMove(board, 4, 4, 4, 3)).toBe(true); // Can go to d4
    expect(isValidQueenMove(board, 4, 4, 4, 5)).toBe(true); // Can go to f4
  });

  test('vertical blocked paths', () => {
    // Place pieces vertically to block the queen
    board[2][4] = PIECES.pawn.white; // Upward blocker
    board[6][4] = PIECES.pawn.white; // Downward blocker
    
    // Blocked vertical moves
    expect(isValidQueenMove(board, 4, 4, 0, 4)).toBe(false); // Can't go to e8
    expect(isValidQueenMove(board, 4, 4, 7, 4)).toBe(false); // Can't go to e1
    
    // Unblocked moves
    expect(isValidQueenMove(board, 4, 4, 3, 4)).toBe(true); // Can go to e5
    expect(isValidQueenMove(board, 4, 4, 5, 4)).toBe(true); // Can go to e3
  });

  test('diagonal blocked paths', () => {
    // Place pieces diagonally to block the queen
    board[3][3] = PIECES.pawn.white; // Northwest blocker
    board[3][5] = PIECES.pawn.white; // Northeast blocker
    board[5][3] = PIECES.pawn.white; // Southwest blocker
    board[5][5] = PIECES.pawn.white; // Southeast blocker
    
    // Blocked diagonal moves
    expect(isValidQueenMove(board, 4, 4, 1, 1)).toBe(false); // Can't go to a7
    expect(isValidQueenMove(board, 4, 4, 1, 7)).toBe(false); // Can't go to h7
    expect(isValidQueenMove(board, 4, 4, 7, 1)).toBe(false); // Can't go to a1
    expect(isValidQueenMove(board, 4, 4, 7, 7)).toBe(false); // Can't go to h1
    
    // But can still move horizontally and vertically
    expect(isValidQueenMove(board, 4, 4, 4, 0)).toBe(true); // Can go to a4
    expect(isValidQueenMove(board, 4, 4, 0, 4)).toBe(true); // Can go to e8
  });

  test('moving to a square with an opponent piece', () => {
    // Place opponent pieces in all directions
    board[4][0] = PIECES.pawn.black; // Left (a4)
    board[0][4] = PIECES.pawn.black; // Up (e8)
    board[1][1] = PIECES.pawn.black; // Northwest (a7)
    board[1][7] = PIECES.pawn.black; // Northeast (h7)
    
    // Can capture these pieces
    expect(isValidQueenMove(board, 4, 4, 4, 0)).toBe(true); // Left to a4
    expect(isValidQueenMove(board, 4, 4, 0, 4)).toBe(true); // Up to e8
    expect(isValidQueenMove(board, 4, 4, 1, 1)).toBe(true); // Northwest to a7
    expect(isValidQueenMove(board, 4, 4, 1, 7)).toBe(true); // Northeast to h7
  });

  test('edge case - queen in corner', () => {
    // Place queen at a1
    const cornerBoard = Array(8).fill(null).map(() => Array(8).fill(PIECES.empty));
    cornerBoard[7][0] = PIECES.queen.white;
    
    // Can move along file, rank, and diagonal
    expect(isValidQueenMove(cornerBoard, 7, 0, 7, 7)).toBe(true); // a1 to h1 (horizontal)
    expect(isValidQueenMove(cornerBoard, 7, 0, 0, 0)).toBe(true); // a1 to a8 (vertical)
    expect(isValidQueenMove(cornerBoard, 7, 0, 0, 7)).toBe(true); // a1 to h8 (diagonal)
    
    // Place obstacles
    cornerBoard[7][3] = PIECES.pawn.white; // Horizontal blocker
    cornerBoard[3][0] = PIECES.pawn.white; // Vertical blocker
    cornerBoard[5][2] = PIECES.pawn.white; // Diagonal blocker
    
    // Test blocked paths
    expect(isValidQueenMove(cornerBoard, 7, 0, 7, 4)).toBe(false); // Can't go past d1
    expect(isValidQueenMove(cornerBoard, 7, 0, 2, 0)).toBe(false); // Can't go past a5
    expect(isValidQueenMove(cornerBoard, 7, 0, 3, 4)).toBe(false); // Can't go past c5 diagonally
  });
});
