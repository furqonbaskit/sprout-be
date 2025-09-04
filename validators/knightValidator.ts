import { checkBounds } from "../utils/helper";

export function isValidKnightMove(
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): boolean {
  checkBounds(toRow, toCol);

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}
