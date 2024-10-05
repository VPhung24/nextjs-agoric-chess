import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { convertPiece } from "@/utils/convert";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  function isDraggablePiece({
    piece,
    sourceSquare,
  }: {
    piece: Piece;
    sourceSquare: Square;
  }) {
    if (
      game.inCheck() ||
      game.isDraw() ||
      (typeof piece === "string" && piece.startsWith(game.turn()))
    ) {
      return false;
    }
    return true;
  }

  // needs work
  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    return true;
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
      isDraggablePiece={isDraggablePiece}
    />
  );
}
