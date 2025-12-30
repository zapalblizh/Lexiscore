import {GameContext} from "../GameContext.jsx";
import {useContext, useCallback} from "react";

export const Board = () => {
    const {board, SIZE_OF_GRID, gameStart, startPos, setStartPos, setCurrentWord} = useContext(GameContext);

    const UpdateSelectionStatus = useCallback((row, col) => {
        setStartPos(prev => {
            let next = prev;

            if (!prev.status)
                next = { status: true, row, col};
            else if (prev.status && (prev.row === row && prev.col === col))
                next = { status: false, row: null, col: null };
            else if (!(prev.row === row && prev.col === col)) {
                next = { status: true, row, col };
            }

            return next;
        });
    }, [setStartPos, setCurrentWord]);

    // Renders grid and rerenders grid on any useState update
    return (
        <div className="grid border border-skin-600  w-fit" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>
            {board.map((rowArr, row) =>
                rowArr.map((cell, col) => {
                    const isStart = startPos.row === row && startPos.col === col;

                    return (
                        <div onClick={() => UpdateSelectionStatus(row, col)} key={`${row}-${col}`} data-row={row} data-col={col}
                             className={`tile border-board-lines ${board[row][col].bonus || ""} ${isStart ? "select-start border-2 md:border-4 border-green-500" : ""}`}>
                            <button className="w-full h-full" disabled={!gameStart}>
                                <span className={'tile-text'}>{board[row][col].letter}</span>
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}
