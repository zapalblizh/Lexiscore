

// Filter out blank tiles from word + insert into board
const blankLetterPattern = /\[([a-zA-Z])\]/g;
const blankPositions = [];

let processedWord = currentWord;
let match;

// Finds all blank tiles
while ((match = blankLetterPattern.exec(currentWord)) !== null) {
    processedWord = processedWord.replace(match[0], match[1]);

    blankPositions.push({
        position: direction === "horizontal"
            ? `${gameState.start.row}-${match.index - 2}`
            : `${match.index - 2}-${gameState.start.col}`,
    });
}
