export const BlankFilter = (currentWord) => {
    // Filter out blank tiles from word + insert into board
    const blankLetterPattern = /\[([a-zA-Z])]/g;
    const blankList = [];

    let processedWord = currentWord.replace(blankLetterPattern, "$1").toUpperCase();

    let match;
    let offset = 0; // Track how many brackets we've seen

    // Find all blank positions in original word
    while ((match = blankLetterPattern.exec(currentWord)) !== null) {
        const positionInProcessedWord = match.index - offset * 3;
        blankList[positionInProcessedWord] = true;
        offset++;
    }

    // Fill remaining positions with false
    for (let i = 0; i < processedWord.length; i++) {
        if (blankList[i] === undefined) {
            blankList[i] = false;
        }
    }

    return {processedWord, blankList};
}
