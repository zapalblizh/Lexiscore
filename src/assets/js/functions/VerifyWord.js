export const VerifyWord = (board, startPos, direction, currentWord, players, gridSize, wordDict) => {

    const distanceFromStartToBoardEdge = direction === "horizontal"
        ? gridSize - startPos.col - 1
        : gridSize - startPos.row - 1;

    const includesCenter = direction === "horizontal"
        ? startPos.row === Math.floor(gridSize / 2)
        : startPos.col === Math.floor(gridSize / 2);

    if (currentWord.length === 0)
        return { valid: false, message: 'Enter a word to submit.'};
    else if (!startPos.status)
        return {valid: false, message: 'Select a start position for your word.'}
    else if (!(/^[a-zA-Z]+$/.test(currentWord)))
        return { valid: false, message: 'Word must contain only letters.'};
    else if (currentWord.length > distanceFromStartToBoardEdge + 1)
        return { valid: false, message: 'Word must fit within the direction chosen for the word placement.'};
    else if (players.every(player => player.score === 0) && !includesCenter)
        return { valid: false, message: 'Include the center tile in your word placement for the first turn.'};
    else if (!wordDict.has(currentWord.toUpperCase()))
        return { valid: false, message: 'Please enter a word that is included in the English dictionary.'};

    let tileChanged = false;

    for (let i = 0; i < currentWord.length; i++) {
        let letter = direction === "horizontal"
            ? board[startPos.row][startPos.col + i].letter
            : board[startPos.row + i][startPos.col].letter;

        // console.log(`Entry ${i}: board letter = '${letter}', word letter = '${currentWord[i]}'`);

        if (letter === '')
            tileChanged = true;
        else if (letter !== currentWord[i])
            return { valid: false, message: 'Select a word that fits in the direction after starting tile and does not replace existing letters.'};
    }

    if (!tileChanged)
        return { valid: false, message: 'Your word needs to add at least one new letter to the board.'};

    const conflictStart = direction === "horizontal"
        ? board[startPos.row][startPos.col - 1].letter !== ''
        : board[startPos.row - 1][startPos.col].letter !== '';
    const conflictEnd = direction === "horizontal" ?
        board[startPos.row][startPos.col + currentWord.length].letter !== ''
        : board[startPos.row + currentWord.length][startPos.col].letter !== '';

    const key = direction === "horizontal" ? startPos.col : startPos.row;

    // A = conflictStart B = conflictEnd C = key === 0 D = key === gridSize - 1
    // AB(C' + D') + BC + AC ==> AB + BC + AD
    if (conflictEnd && (conflictStart || key === 0) || conflictStart && key === gridSize - 1) {
        return { valid: false, message: 'Your word touches another letter in the grid that is outside your selection. If this letter is part of your word, extend your selection. Otherwise, choose a different position where to place your word.'};
    }

    return {valid: true, message: ''};
}