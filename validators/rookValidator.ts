import { PIECES } from "../types";
import { checkBounds } from "../utils/helper";

export function isValidRookMove(
  board: string[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  checkBounds(toRow, toCol);

  if (fromRow === toRow && fromCol === toCol) {
    return false;
  }

  if (fromRow !== toRow && fromCol !== toCol) {
    return false;
  }

  if (fromRow === toRow) {
    const minCol = Math.min(fromCol, toCol);
    const maxCol = Math.max(fromCol, toCol);

    for (let col = minCol + 1; col < maxCol; col++) {
      if (board[fromRow][col] !== PIECES.empty) {
        return false;
      }
    }
  } else {
    const minRow = Math.min(fromRow, toRow);
    const maxRow = Math.max(fromRow, toRow);

    for (let row = minRow + 1; row < maxRow; row++) {
      if (board[row][fromCol] !== PIECES.empty) {
        return false;
      }
    }
  }
  return true;
}
