
import { Piece } from "chess.js";
import { Piece as ReactPiece } from "react-chessboard/dist/chessboard/types";

export function convertPiece(piece: ReactPiece): Piece {
    if (piece.startsWith("w")) {
        return {
            color: "w",
            type: piece.slice(1) as Piece["type"],
        }
    }
    return {
        color: "b",
        type: piece.slice(1) as Piece["type"],
    }
}