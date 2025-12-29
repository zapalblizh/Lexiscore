export const UpdateGrid = (board, currentTurn) => {
    const letters = currentTurn.word.toUpperCase().split("");

    const next = board.map(row => row.slice());

    const iteratorStart = currentTurn.direction === "horizontal" ? currentTurn.startPos.col : currentTurn.startPos.row;
    for (let i = iteratorStart; i < iteratorStart + currentTurn.word.length; i++) {
        if (currentTurn.direction === "horizontal")
            next[currentTurn.startPos.row][i] = {
                ...next[currentTurn.startPos.row][i],
                letter: letters[i - iteratorStart],
                blank: currentTurn.blankList[i - iteratorStart]
            };
        else if (currentTurn.direction === "vertical")
            next[i][currentTurn.startPos.col] = {
                ...next[i][currentTurn.startPos.col],
                letter: letters[i - iteratorStart],
                blank: currentTurn.blankList[i - iteratorStart]
            };
    }

    return next;
}
