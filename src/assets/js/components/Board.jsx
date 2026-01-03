import {GameContext} from "../GameContext.jsx";
import {useContext, useCallback, memo} from "react";

const Tile = memo(({row, col, item, isStart, gameStart, onSelect}) => {
    let classes = 'tile border-board-lines ';
    classes += item.letter ? 'bg-skin-300 ' : '';
    classes += item.bonus ? `${item.bonus} ` : '';
    classes += isStart ? 'select-start border-2 md:border-4 border-green-500' : '';

    return (
        <div onClick={() => onSelect(row, col)} data-row={row} data-col={col}
             className={classes}>
            <button
                className="flex justify-center items-center w-full h-full"
                aria-label={item.letter ? `Tile ${row + 1}, ${col + 1}: ${item.letter}` : `Empty tile ${row + 1}, ${col + 1}`}
                disabled={!gameStart}>
                <span className={'tile-text'}>{item.letter}</span>
            </button>
        </div>
    );
});

export const Board = memo(() => {
    const {board, SIZE_OF_GRID, gameStart, startPos, setStartPos, setCurrentWord} = useContext(GameContext);

    const UpdateSelectionStatus = useCallback((row, col) => {
        setStartPos(prev => {
            let next = {...prev};

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
                        <Tile
                            key={`${row}-${col}`}
                            row={row}
                            col={col}
                            item={cell}
                            isStart={isStart}
                            gameStart={gameStart}
                            onSelect={UpdateSelectionStatus}
                        />
                    )
                })
            )}
        </div>
    );
});
