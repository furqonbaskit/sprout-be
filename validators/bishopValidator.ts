import { PIECES } from "../types";
import { checkBounds } from "../utils/helper";

export function isValidBishopMove(
  board: string[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  checkBounds(toRow, toCol);

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff !== colDiff || rowDiff === 0) {
    return false;
  }

  const rowDirection = fromRow < toRow ? 1 : -1;
  const colDirection = fromCol < toCol ? 1 : -1;

  for (let i = 1; i < rowDiff; i++) {
    const checkRow = fromRow + i * rowDirection;
    const checkCol = fromCol + i * colDirection;
    if (board[checkRow][checkCol] !== PIECES.empty) {
      return false;
    }
  }

  return true;
}
