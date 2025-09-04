import { isValidKingMove } from '../validators/kingValidator';

describe('King Validator', () => {
  test('valid one square moves', () => {
    // King can move one square in any direction
    const centerRow = 4;
    const centerCol = 4;
    
    // Horizontal moves
    expect(isValidKingMove(centerRow, centerCol, centerRow, centerCol+1)).toBe(true); // Right
    expect(isValidKingMove(centerRow, centerCol, centerRow, centerCol-1)).toBe(true); // Left
    
    // Vertical moves
    expect(isValidKingMove(centerRow, centerCol, centerRow+1, centerCol)).toBe(true); // Down
    expect(isValidKingMove(centerRow, centerCol, centerRow-1, centerCol)).toBe(true); // Up
    
    // Diagonal moves
    expect(isValidKingMove(centerRow, centerCol, centerRow-1, centerCol-1)).toBe(true); // Up-Left
    expect(isValidKingMove(centerRow, centerCol, centerRow+1, centerCol+1)).toBe(true); // Down-Right
  });

  test('invalid moves - more than one square', () => {
    const centerRow = 4;
    const centerCol = 4;
    
    // Horizontal
    expect(isValidKingMove(centerRow, centerCol, centerRow, centerCol+2)).toBe(false); // Two right
    expect(isValidKingMove(centerRow, centerCol, centerRow, centerCol-2)).toBe(false); // Two left
    
    // Vertical
    expect(isValidKingMove(centerRow, centerCol, centerRow+2, centerCol)).toBe(false); // Two down
    expect(isValidKingMove(centerRow, centerCol, centerRow-2, centerCol)).toBe(false); // Two up
    
    // Diagonal
    expect(isValidKingMove(centerRow, centerCol, centerRow-2, centerCol-2)).toBe(false); // Two Up-Left
    expect(isValidKingMove(centerRow, centerCol, centerRow-2, centerCol+2)).toBe(false); // Two Up-Right
    expect(isValidKingMove(centerRow, centerCol, centerRow+2, centerCol-2)).toBe(false); // Two Down-Left
    expect(isValidKingMove(centerRow, centerCol, centerRow+2, centerCol+2)).toBe(false); // Two Down-Right
    
    // Knight-like moves
    expect(isValidKingMove(centerRow, centerCol, centerRow-2, centerCol+1)).toBe(false);
    expect(isValidKingMove(centerRow, centerCol, centerRow+1, centerCol-2)).toBe(false);
  });

  test('invalid moves - no movement', () => {
    const centerRow = 4;
    const centerCol = 4;
    // Same position
    expect(isValidKingMove(centerRow, centerCol, centerRow, centerCol)).toBe(false);
  });

  test('edge case - king in corner', () => {
    // King at a1
    const cornerRow = 7;
    const cornerCol = 0;
    
    // Valid moves from corner
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow-1, cornerCol)).toBe(true);   // Up
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow, cornerCol+1)).toBe(true);   // Right
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow-1, cornerCol+1)).toBe(true); // Diagonal
    
    // Invalid moves from corner
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow+1, cornerCol)).toBe(false);   // Down (off board)
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow, cornerCol-1)).toBe(false);   // Left (off board)
    expect(isValidKingMove(cornerRow, cornerCol, cornerRow+1, cornerCol-1)).toBe(false); // Diagonal (off board)
  });

  test('edge case - king on edge', () => {
    // King at a4
    const edgeRow = 4;
    const edgeCol = 0;
    
    // Valid moves from edge
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow-1, edgeCol)).toBe(true);   // Up
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow+1, edgeCol)).toBe(true);   // Down
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow, edgeCol+1)).toBe(true);   // Right
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow-1, edgeCol+1)).toBe(true); // Up-Right
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow+1, edgeCol+1)).toBe(true); // Down-Right
    
    // Invalid move off board
    expect(isValidKingMove(edgeRow, edgeCol, edgeRow, edgeCol-1)).toBe(false); // Left (off board)
  });
});
