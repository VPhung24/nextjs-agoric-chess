import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

const buttonStyle = {
  cursor: "pointer",
  padding: "10px 20px",
  margin: "10px 10px 0px 0px",
  borderRadius: "6px",
  backgroundColor: "#f0d9b5",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const inputStyle = {
  padding: "10px 20px",
  margin: "10px 0 10px 0",
  borderRadius: "6px",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
  width: "100%",
};

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());

  function isDraggablePiece(currentPiece: {
    piece: Piece;
    sourceSquare: Square;
  }) {
    const canMove =
      game.moves({
        square: currentPiece.sourceSquare,
      }).length > 0;
    return (
      canMove && currentPiece.piece.startsWith(game.turn() === "w" ? "w" : "b")
    );
  }

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((prevState: Chess) => {
      const update = new Chess(prevState.fen());
      modify(update);
      return update;
    });
  }

  function onDrop(
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ): boolean {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy
      .moves({
        square: sourceSquare,
        piece: piece,
      })
      .find((move) => move === targetSquare);

    if (move === undefined) {
      return false;
    }

    gameCopy.move(move);
    setGame(gameCopy);
    return true;
  }

  return (
    <div style={boardWrapper}>
      <Chessboard
        id="PlayVsRandom"
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        isDraggablePiece={isDraggablePiece}
      />
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game: Chess) => {
            game.reset();
          });
        }}
      >
        reset
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          safeGameMutate((game: Chess) => {
            game.undo();
          });
        }}
      >
        undo
      </button>
    </div>
  );
};

export default ChessBoard;
