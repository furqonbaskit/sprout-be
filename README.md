# Command Line Chess Game

This is a simple command line chess game implemented in TypeScript. The game supports all standard chess piece movements and follows the basic rules of chess.

## Table of Contents

- [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Commands](#commands)
- [Piece Notation](#piece-notation)
- [Board Representation](#board-representation)
- [Development](#development)
- [Testing](#testing)

## Installation

To install and run the chess game, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Clone this repository:
   ```
   git clone <repository-url>
   cd sprout-be
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Build and run the game:
   ```
   npm start
   ```

## How to Play

1. The game starts with a standard chess board setup.
2. White player moves first, followed by Black.
3. To make a move, enter the starting position and destination position in algebraic notation, separated by a comma.
   For example: `e2,e4` moves the piece at e2 to e4.
4. The game continues until one player captures the opponent's king.
5. Type `exit` at any time to quit the game.

## Game Rules

- This implementation follows standard chess piece movement rules.
- The game uses a simplified win condition: capturing the opponent's king ends the game (rather than checkmate).
- All standard piece movements are supported:
  - Pawns move forward one square (or two from starting position) and capture diagonally.
  - Rooks move horizontally or vertically any number of squares.
  - Knights move in an L-shape (two squares in one direction, then one square perpendicular).
  - Bishops move diagonally any number of squares.
  - Queens move horizontally, vertically, or diagonally any number of squares.
  - Kings move one square in any direction.
- Pieces cannot jump over other pieces (except knights).

## Commands

- Move a piece: `<from>,<to>` (e.g., `e2,e4`)
- Exit the game: `exit`

## Piece Notation

The game uses the following notation for pieces:

- White pieces are represented by uppercase letters: `K` (King), `Q` (Queen), `R` (Rook), `B` (Bishop), `N` (Knight), `P` (Pawn).
- Black pieces are represented by lowercase letters: `k` (King), `q` (Queen), `r` (Rook), `b` (Bishop), `n` (Knight), `p` (Pawn).
- Empty squares are represented by spaces.

## Board Representation

The chess board is displayed in the console as follows:

```
  a b c d e f g h
 ┌─┬─┬─┬─┬─┬─┬─┬─┐
8│r│n│b│q│k│b│n│r│
 ├─┼─┼─┼─┼─┼─┼─┼─┤
7│p│p│p│p│p│p│p│p│
 ├─┼─┼─┼─┼─┼─┼─┼─┤
6│ │ │ │ │ │ │ │ │
 ├─┼─┼─┼─┼─┼─┼─┼─┤
5│ │ │ │ │ │ │ │ │
 ├─┼─┼─┼─┼─┼─┼─┼─┤
4│ │ │ │ │ │ │ │ │
 ├─┼─┼─┼─┼─┼─┼─┼─┤
3│ │ │ │ │ │ │ │ │
 ├─┼─┼─┼─┼─┼─┼─┼─┤
2│P│P│P│P│P│P│P│P│
 ├─┼─┼─┼─┼─┼─┼─┼─┤
1│R│N│B│Q│K│B│N│R│
 └-┴─┴─┴─┴─┴─┴─┴─┘
```

- Columns are labeled a-h (left to right).
- Rows are labeled 8-1 (top to bottom).
- The algebraic notation combines these: the square in the bottom-right corner is h1.

## Development

This project is built with TypeScript and uses the following structure:

- `index.ts` - Main game logic and CLI interface
- `types/` - Type definitions
- `validators/` - Piece movement validators
- `utils/` - Helper functions

To build the project:
```
npm run build
```

## Testing

The project includes comprehensive unit tests for all chess piece validators and the win condition.

Run all tests:
```
npm test
```

Run specific tests:
```
npm test -- tests/kingValidator.test.ts
```

The test suite covers:
- Board initialization
- Movement validation for all piece types
- Win condition logic
- Edge cases for piece movements
