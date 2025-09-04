import { isValidBishopMove } from "./bishopValidator";
import { isValidRookMove } from "./rookValidator";

export function isValidQueenMove(
  board: string[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  return (
    isValidRookMove(board, fromRow, fromCol, toRow, toCol) ||
    isValidBishopMove(board, fromRow, fromCol, toRow, toCol)
  );
}
