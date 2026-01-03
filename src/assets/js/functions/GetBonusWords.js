import points from "../../_data/game.js";

const GetIndividualLetterScore = (letter, index) => {
    const pointValue = Object.entries(points).find(([key, value]) =>
        value.includes(letter[index].letter)
    )[0];

    return parseInt(pointValue) ?? 0;
}

const GetVerticalWord = (board, row, col) => {
    let word = "";
    let score = 0;


    if (col > 0 && col < 14) {
        let colSelected = board.map((row, index) => board[index][col]);

        for (let i = row; i >= 0; i--) {
            if (colSelected[i].letter !== '') {
                word += colSelected[i].letter;

                score += GetIndividualLetterScore(colSelected, i);
            }

            else break;
        }
        word = word.split('').reverse().join('');

        for (let j = row + 1; j < 14; j++) {
            if (colSelected[j].letter !== '') {
                word += colSelected[j].letter;

                score += GetIndividualLetterScore(colSelected, j);
            }
            else break;
        }
    }

    return {
        word,
        score
    };
}

const GetHorizontalWord = (board, row, col) => {
    let word = "";
    let score = 0;

    if (row > 0 && row < 14) {
        let rowSelected = board[row];

        // Get top part
        for (let i = col; i >= 0; i--) {
            if (rowSelected[i].letter !== '') {
                word += rowSelected[i].letter;

                score += GetIndividualLetterScore(rowSelected, i);
            }
            else break;
        }
        word = word.split('').reverse().join('');

        // +1 to account for prior top part's inclusion of current letter
        for (let j = col + 1; j <= 14; j++) {
            if (rowSelected[j].letter !== '') {
                word += rowSelected[j].letter;

                score += GetIndividualLetterScore(rowSelected, j);
            }
            else break;
        }
    }

    return {
        word,
        score
    };
}

export const GetBonusWords = (direction, processedWord, startPos, board, emptyList, blankList, wordDict) => {

    const bonusWords = [];

    console.log("GetBonusWords called:", {
        direction,
        processedWord,
        startPos,
        emptyList,
        blankList
    });

    for (let i = 0; i < processedWord.length; i++) {
        const currentRow = direction === "horizontal" ? startPos.row : startPos.row + i;
        const currentCol = direction === "horizontal" ? startPos.col + i : startPos.col;

        // Only check if this is a NEW tile being placed
        if (emptyList[i]) {
            const currentWord = direction === "horizontal"
                ? GetVerticalWord(board, currentRow, currentCol)
                : GetHorizontalWord(board, currentRow, currentCol);

            if (currentWord.word) {

                if (currentWord.word.length > 1 && wordDict.has(currentWord.word.toUpperCase())) {
                    if (blankList[i]) {
                        const pointValue = Object.entries(points).find(([key, value]) =>
                            value.includes(processedWord[i].toUpperCase())
                        )?.[0];

                        if (pointValue) {
                            currentWord.score -= parseInt(pointValue);
                        }
                    }

                    bonusWords.push(currentWord);
                }
            }
        }

    }

    return bonusWords;
}