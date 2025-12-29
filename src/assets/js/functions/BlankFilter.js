export const BlankFilter = (currentWord) => {
    // Filter out blank tiles from word + insert into board
    const blankLetterPattern = /\[([a-zA-Z])\]/g;
    const blankPositions = [];
    const blankList = [];

    let processedWord = currentWord;
    let match;

    // Finds all blank tiles
    while ((match = blankLetterPattern.exec(currentWord)) !== null) {
        processedWord = processedWord.replace(match[0], match[1]);
        blankPositions.push(`${match.index - 2}`);
    }

    for (let i = 0; i < processedWord.length; i++) {
        blankList[i] = blankPositions.includes(i);
    }

    return {processedWord, blankList};
}