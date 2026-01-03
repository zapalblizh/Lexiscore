export const VerifyWord = (board, startPos, direction, currentWord, players, wordDict) => {

    const distanceFromStartToBoardEdge = direction === "horizontal"
        ? 14 - startPos.col
        : 14 - startPos.row;

    const includesCenter = direction === "horizontal"
        ? startPos.row === 7
        : startPos.col === 7;

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
    let hasExisting = false;

    for (let i = 0; i < currentWord.length; i++) {
        let letter = direction === "horizontal"
            ? board[startPos.row][startPos.col + i].letter
            : board[startPos.row + i][startPos.col].letter;

        // console.log(`Entry ${i}: board letter = '${letter}', word letter = '${currentWord[i]}'`);

        if (letter === '')
            tileChanged = true;
        else if (letter !== currentWord[i])
            return { valid: false, message: 'Select a word that fits in the direction after starting tile and does not replace existing letters.'};
        else hasExisting = true;
    }

    if (!tileChanged)
        return { valid: false, message: 'Your word needs to add at least one new letter to the board.'};

    if (!hasExisting && !players.every(player => player.score === 0)) {
        return { valid: false, message: 'Your word requires at least one letter to be already on the board.'};
    }

    let conflictStart;
    let conflictEnd;

    if (direction === "horizontal") {
        conflictStart = startPos.col !== 0 ? board[startPos.row][startPos.col - 1].letter !== '' : false;
        conflictEnd = (startPos.col + currentWord.length) !== 14 ? board[startPos.row][startPos.col + currentWord.length - 1].letter !== '' : false;
    }
    else {
        conflictStart = startPos.row !== 0 ? board[startPos.row - 1][startPos.col].letter !== '' : false;
        conflictEnd = (startPos.row + currentWord.length) !== 14 ? board[startPos.row + currentWord.length - 1][startPos.col].letter !== '' : false;
    }

    const key = direction === "horizontal" ? startPos.col : startPos.row;

    // A = conflictStart B = conflictEnd C = key === 0 D = key === 14
    // AB(C' + D') + BC + AC ==> AB + BC + AD
    if (conflictEnd && (conflictStart || key === 0) || conflictStart && key === 14) {
        return { valid: false, message: 'Your word touches another letter in the grid that is outside your selection. If this letter is part of your word, extend your selection. Otherwise, choose a different position where to place your word.'};
    }

    return {valid: true, message: ''};
}