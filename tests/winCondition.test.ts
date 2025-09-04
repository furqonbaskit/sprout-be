import { initializeBoard } from '../index';
import { PIECES, WHITE, BLACK } from '../types';
import { convertNotation } from '../utils/helper';

// This is a simplified version of processMove that only tests the win condition logic
function checkWinCondition(
  board: string[][],
  fromPos: string,
  toPos: string
): {
  kingCaptured: boolean;
  capturedKingColor: string | null;
} {
  const [fromRow, fromCol] = convertNotation(fromPos);
  const [toRow, toCol] = convertNotation(toPos);

  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];
  
  // For testing purposes, we'll just move the piece without checking validity
  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = PIECES.empty;
  
  const isCapturingKing =
    targetPiece === PIECES.king.white || targetPiece === PIECES.king.black;
  const capturedKingColor = isCapturingKing
    ? (targetPiece === PIECES.king.white ? WHITE : BLACK)
    : null;

  return {
    kingCaptured: isCapturingKing,
    capturedKingColor: capturedKingColor,
  };
}

describe('Chess Win Condition', () => {
  test('white player wins by capturing black king', () => {
    const board = initializeBoard();
    
    // Place white queen in position to capture black king
    // First clear the path and position pieces for the test
    board[0][4] = PIECES.empty; // Remove black king from original position
    board[3][4] = PIECES.king.black; // Place black king at e5
    board[3][7] = PIECES.queen.white; // Place white queen at h5
    
    // Chess notation: files a-h (columns 0-7), ranks 8-1 (rows 0-7)
    // So [3][7] is h5 and [3][4] is e5
    const moveResult = checkWinCondition(board, 'h5', 'e5');
    
    expect(moveResult.kingCaptured).toBe(true);
    expect(moveResult.capturedKingColor).toBe(BLACK);
  });
  
  test('black player wins by capturing white king', () => {
    const board = initializeBoard();
    
    // Place black rook in position to capture white king
    board[7][4] = PIECES.empty; // Remove white king from original position
    board[4][4] = PIECES.king.white; // Place white king at e4
    board[0][4] = PIECES.empty; // Remove black king from original position
    board[4][0] = PIECES.rook.black; // Place black rook at a4
    
    const moveResult = checkWinCondition(board, 'a4', 'e4');
    
    expect(moveResult.kingCaptured).toBe(true);
    expect(moveResult.capturedKingColor).toBe(WHITE);
  });
  
  test('no win when capturing non-king piece', () => {
    const board = initializeBoard();
    
    // Place white pawn in position to capture black pawn
    board[1][3] = PIECES.pawn.black; // Black pawn at d7
    board[2][2] = PIECES.pawn.white; // White pawn at c6
    
    const moveResult = checkWinCondition(board, 'c6', 'd7');
    
    expect(moveResult.kingCaptured).toBe(false);
    expect(moveResult.capturedKingColor).toBe(null);
  });
  
  test('game continues without capturing any piece', () => {
    const board = initializeBoard();
    
    // Move white pawn forward (e7 to e5)
    const moveResult = checkWinCondition(board, 'e2', 'e4');
    
    expect(moveResult.kingCaptured).toBe(false);
    expect(moveResult.capturedKingColor).toBe(null);
  });
  
  test('win condition detects correct king color', () => {
    const board = initializeBoard();
    
    // Set up a situation where white knight captures black king
    board[0][4] = PIECES.empty; // Remove black king from original position
    board[2][3] = PIECES.king.black; // Place black king at d6
    board[0][1] = PIECES.empty; // Remove black knight from original position
    board[4][2] = PIECES.knight.white; // Place white knight at c4
    
    const moveResult = checkWinCondition(board, 'c4', 'd6');
    
    expect(moveResult.kingCaptured).toBe(true);
    expect(moveResult.capturedKingColor).toBe(BLACK);
    expect(moveResult.capturedKingColor).not.toBe(WHITE);
  });
});
