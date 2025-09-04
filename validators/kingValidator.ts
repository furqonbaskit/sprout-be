import { checkBounds } from "../utils/helper";

export function isValidKingMove(
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  if (!checkBounds(toRow, toCol)) {
    return false;
  }

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
}
