import {useCallback, useContext} from "react";
import { GameContext } from "../GameContext.jsx";
import { VerifyWord } from "../functions/VerifyWord.js"
import {UpdateGrid} from "../functions/UpdateGrid.js";
import {PlayerSelector} from "./PlayerSelector.jsx";
import {ErrorComponent} from "./ErrorComponent.jsx";
import {BlankFilter} from "../functions/BlankFilter.js";
import {CalculateWordScore} from "../functions/CalculateWordScore.js";
import {GetBonusWords} from "../functions/GetBonusWords.js";

export const GameForm = () => {

    const {turns, setTurn, wordDict, errorMessage, setErrorMessage, players, setPlayers, startPos, setStartPos, direction, setDirection, currentWord, setCurrentWord, board, setBoard} = useContext(GameContext);

    // Handles Submission of a Word from Form
    const HandleSubmit = useCallback((e) => {
        e.preventDefault();
        setErrorMessage("");

        let {processedWord, blankList} = BlankFilter(currentWord);

        // Returns alerts and true when passes through all checks
        const validWord = VerifyWord(board, startPos, direction, processedWord.toUpperCase(), players, wordDict);

        if (validWord.valid) {
            let emptyList = [];
            let bonusList = [];

            // Get list of bool for empty tiles
            const iteratorStart = direction === "horizontal" ? startPos.col : startPos.row;
            for (let i = iteratorStart; i < iteratorStart + processedWord.length; i++) {
                let selected = direction === "horizontal" ? board[startPos.row][i] : board[i][startPos.col];
                emptyList.push(selected.letter === '');
                bonusList.push(selected.bonus || "nada");
            }

            let turnData = {
                turnId: turns.length + 1,
                playerId: players.find(player => player.currentPlayer)?.id,
                direction,
                startPos,
                blankList,
                emptyList,
                bonusList,
                word: processedWord,
                wordScore: 0,
            };

            const updatedBoard = UpdateGrid(board, turnData);

            turnData.bonusWords = GetBonusWords(direction, processedWord, startPos, updatedBoard, emptyList, turnData.blankList, wordDict);

            setBoard(updatedBoard);

            // Calculate total score for the turn for player
            let score = CalculateWordScore(board, turnData);

            // Update player in players array
            setPlayers(prev =>
                prev.map(player =>
                    player.id === turnData.playerId
                        ? { ...player, score: player.score + score, turns: [...player.turns, turnData] }
                        : player
                )
            );

            // Add turn to turns array
            setTurn(prev => {
                return [...prev, turnData];
            });

            // Reset startPos and currentWord
            setStartPos({
                status: false,
                row: null,
                col: null
            })
            setCurrentWord("");
        }
        else {
            setErrorMessage(validWord.message);

            // Reset startPos and currentWord
            setStartPos({
                status: false,
                row: null,
                col: null
            })
            setCurrentWord("");
        }
    }, [turns, setTurn, wordDict, setErrorMessage, players, setPlayers, startPos, setStartPos, direction, setDirection, currentWord, setCurrentWord, board, setBoard]);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Play a Word</h2>
            <span className="text-lg">If your word uses a blank letter, put your letter in square brackets [A]</span>

            <form onSubmit={HandleSubmit} className="w-full mx-auto flex flex-col justify-center items-center gap-4 p-4 bg-cursor border-2 rounded-xl">
                <button
                    type="button"
                    className="btn-submit whitespace-nowrap"
                    aria-label="Change direction for word placement"
                    onClick={() => setDirection(prev => prev === "horizontal" ? "vertical" : "horizontal")}>
                    {direction === "horizontal" ? "Horizontal →" : "Vertical ↓" }
                </button>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <PlayerSelector />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold" htmlFor="word">Your Word</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            id="word"
                            name="word"
                            value={currentWord}
                            onChange={word => setCurrentWord(word.target.value)}
                            placeholder="Insert your word here"
                            className="border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div className={errorMessage ? "block w-full" : "hidden"}>
                    <ErrorComponent />
                </div>

                <button
                    type="submit"
                    aria-label={`Submit word: ${currentWord}`}
                    className="btn-submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
