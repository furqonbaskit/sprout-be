import { PIECES, WHITE } from "../types";
import { checkBounds, getPieceColor } from "../utils/helper";

export function isValidPawnMove(
  board: string[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  checkBounds(toRow, toCol);

  const piece = board[fromRow][fromCol];
  const color = getPieceColor(piece);
  const direction = color === WHITE ? -1 : 1;

  const targetPiece = board[toRow][toCol];
  const targetColor = getPieceColor(targetPiece);

  if (fromCol === toCol) {
    if (toRow === fromRow + direction && targetPiece === PIECES.empty) {
      return true;
    }

    const startingRow = color === WHITE ? 6 : 1;
    if (
      fromRow === startingRow &&
      toRow === fromRow + 2 * direction &&
      targetPiece === PIECES.empty &&
      board[fromRow + direction][fromCol] === PIECES.empty
    ) {
      return true;
    }

    return false;
  }

  if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction) {
    if (targetPiece !== PIECES.empty && targetColor !== color) {
      return true;
    }
    return false;
  }

  return false;
}
