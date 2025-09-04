import { BLACK, PIECES, WHITE } from "./types";
import { convertNotation, getPieceColor, getPieceType, isValidPosition } from "./utils/helper";
import { isValidBishopMove } from "./validators/bishopValidator";
import { isValidKingMove } from "./validators/kingValidator";
import { isValidKnightMove } from "./validators/knightValidator";
import { isValidPawnMove } from "./validators/pawnValidator";
import { isValidQueenMove } from "./validators/queenValidator";
import { isValidRookMove } from "./validators/rookValidator";
import * as readline from 'readline';

export function initializeBoard() {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(PIECES.empty));

  for (let i = 0; i < 8; i++) {
    board[1][i] = PIECES.pawn.black;
    board[6][i] = PIECES.pawn.white;
  }

  board[0][0] = board[0][7] = PIECES.rook.black;
  board[0][1] = board[0][6] = PIECES.knight.black;
  board[0][2] = board[0][5] = PIECES.bishop.black;
  board[0][3] = PIECES.queen.black;
  board[0][4] = PIECES.king.black;

  board[7][0] = board[7][7] = PIECES.rook.white;
  board[7][1] = board[7][6] = PIECES.knight.white;
  board[7][2] = board[7][5] = PIECES.bishop.white;
  board[7][3] = PIECES.queen.white;
  board[7][4] = PIECES.king.white;

  return board;
}

function printBoard(board: string[][]) {
  console.log("  a b c d e f g h");
  console.log(" ┌─┬─┬─┬─┬─┬─┬─┬─┐");

  for (let i = 0; i < 8; i++) {
    let row = `${8 - i}│`;
    for (let j = 0; j < 8; j++) {
      row += `${board[i][j]}│`;
    }
    console.log(row);
    if (i < 7) {
      console.log(" ├─┼─┼─┼─┼─┼─┼─┼─┤");
    }
  }
  console.log(" └-┴─┴─┴─┴─┴─┴─┴─┘");
}

export function processMove(
  board: string[][],
  from: string,
  to: string,
  currentPlayer: string
): {
  success: boolean;
  kingCaptured?: boolean;
  capturedKingColor?: string | null;
} {
  if (!isValidPosition(from) || !isValidPosition(to)) {
    console.log("Invalid position");
    return { success: false };
  }

  const [fromRow, fromCol] = convertNotation(from);
  const [toRow, toCol] = convertNotation(to);

  const piece = board[fromRow][fromCol];

  if (piece === PIECES.empty) {
    console.log("There is no piece at the selected position.");
    return { success: false };
  }

  const pieceColor = getPieceColor(piece);

  if (
    (currentPlayer === WHITE && pieceColor !== WHITE) ||
    (currentPlayer === BLACK && pieceColor !== BLACK)
  ) {
    console.log(`You can only move your own (${currentPlayer}) pieces.`);
    return { success: false };
  }

  const targetPiece = board[toRow][toCol];
  const targetColor = getPieceColor(targetPiece);

  if (targetColor === pieceColor) {
    console.log("Cannot capture your own piece.");
    return { success: false };
  }

  const pieceType = getPieceType(piece);
  let isValidMove = false;

  switch (pieceType) {
    case "pawn":
      isValidMove = isValidPawnMove(board, fromRow, fromCol, toRow, toCol);
      break;
    case "knight":
      isValidMove = isValidKnightMove(fromRow, fromCol, toRow, toCol);
      break;
    case "bishop":
      isValidMove = isValidBishopMove(board, fromRow, fromCol, toRow, toCol);
      break;
    case "rook":
      isValidMove = isValidRookMove(board, fromRow, fromCol, toRow, toCol);
      break;
    case "queen":
      isValidMove = isValidQueenMove(board, fromRow, fromCol, toRow, toCol);
      break;
    case "king":
      isValidMove = isValidKingMove(fromRow, fromCol, toRow, toCol);
      break;
  }

  if (!isValidMove) {
    console.log(`Invalid move for ${pieceType}.`);
    return { success: false };
  }

  const isCapturingKing =
    targetPiece === PIECES.king.white || targetPiece === PIECES.king.black;
  const capturedKingColor =
    targetPiece === PIECES.king.white ? WHITE : BLACK;

  board[toRow][toCol] = board[fromRow][fromCol];
  board[fromRow][fromCol] = PIECES.empty;

  return {
    success: true,
    kingCaptured: isCapturingKing,
    capturedKingColor: isCapturingKing ? capturedKingColor : null,
  };
}

async function getUserInput(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(prompt, (answer: string) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function playChess() {
  const board = initializeBoard();
  let currentPlayer = WHITE;
  let gameRunning = true;

  printBoard(board);

  while (gameRunning) {
    const playerColor =
      currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    const input = await getUserInput(`${playerColor}'s move: `);

    if (input.toLowerCase() === "exit") {
      console.log("Thanks for playing!");
      gameRunning = false;
      continue;
    }

    const [from, to] = input.split(",").map(s => s.trim());
    if (!from || !to) {
      console.log("Please enter your move in the format 'e2,e4'");
      continue;
    }

    const moveResult = processMove(board, from, to, currentPlayer);
    if (moveResult.success) {
      printBoard(board);

      if (moveResult.kingCaptured) {
        console.log(
          `Game over! ${currentPlayer} wins by capturing the ${moveResult.capturedKingColor} king.`
        );
        gameRunning = false;
        continue;
      }

      currentPlayer = currentPlayer === WHITE ? BLACK : WHITE;
    }
  }
}

if (require.main === module) {
  playChess().catch(console.error);
}
