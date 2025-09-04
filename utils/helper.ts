import { BLACK, PIECES, WHITE } from "../types";

export function getPieceColor(piece: string): string | null {
  if (piece === PIECES.empty) return null;
  const upperPiece = piece.toUpperCase();

  if (upperPiece && "KQRBNP".includes(upperPiece)) {
    return piece === upperPiece ? WHITE : BLACK;
  }

  return null;
}

export const checkBounds = (toRow: number, toCol: number): boolean => {
  return !(toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8);
};

export function getPieceType(piece: string): string | null {
  if (piece === PIECES.empty) return null;

  const upperPiece = piece.toUpperCase();
  if (upperPiece === "K") return "king";
  if (upperPiece === "Q") return "queen";
  if (upperPiece === "R") return "rook";
  if (upperPiece === "B") return "bishop";
  if (upperPiece === "N") return "knight";
  if (upperPiece === "P") return "pawn";

  return null;
}

export function isValidPosition(pos: string): boolean {
  if (pos.length !== 2) return false;

  const col = pos.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(pos[1]);

  return col >= 0 && col < 8 && row >= 0 && row < 8;
}

export function convertNotation(pos: string): [number, number] {
  const col = pos.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(pos[1]);
  return [row, col];
}
