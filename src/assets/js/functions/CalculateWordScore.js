import points from "../../_data/game.js";

// Calculates word score based on bonuses and letter points
export const CalculateWordScore = (board, currentTurn) => {
    let score = 0;
    // console.log(currentTurn);

    const letters = currentTurn.word.toUpperCase().split("");

    // Counts word score
    for (let i = 0; i < currentTurn.word.length; i++) {
        if (!currentTurn.blankList[i]) {
            for (const [key, value] of Object.entries(points) ) {

                if (currentTurn.emptyList[i] && value.includes(letters[i]) && currentTurn.bonusList[i].includes('lx'))
                    score += (parseInt(key) * currentTurn.bonusList[i].slice(2));
                else if (value.includes(letters[i]))
                    score += parseInt(key);
            }
        }
    }

    currentTurn.bonusList.forEach((bonus, index) => {
        if (currentTurn.emptyList[index] && bonus.startsWith("wx"))
            score *= bonus.slice(2);
    });

    if (currentTurn.emptyList.filter(item => item === true).length === 7)
        score += 50;

    return score;
}
