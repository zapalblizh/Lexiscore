import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import { VerifyWord } from "../functions/VerifyWord.js"
import {UpdateGrid} from "../functions/UpdateGrid.js";
import {PlayerSelector} from "./PlayerSelector.jsx";
import {CreateTurn} from "../functions/TurnCreator.js";
import {ErrorComponent} from "./ErrorComponent.jsx";

export const GameForm = () => {

    const {turns, setTurn, wordDict, setErrorMessage, players, setPlayers, startPos, setStartPos, direction, setDirection, gameState, setGameState, currentWord, setCurrentWord, board, setBoard, SIZE_OF_GRID} = useContext(GameContext);

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        // Returns alerts and true when passes through all checks
        const validWord = VerifyWord(board, gameState, currentWord, players, SIZE_OF_GRID, wordDict);

        if (validWord.valid) {
            let turnsIntroduced = [];

            if (!validWord.blankPositions.length > 0) {
                setBoard(prev => {
                    const next = prev.map(row => row.map(cell => ({...cell})));

                    for (let pos of validWord.blankPositions) {
                        let coordsArr = pos.position.split("-");
                        next[coordsArr[0]][coordsArr[1]].blank = true;
                    }

                    return next;
                })
            }

            let currentTurn = CreateTurn(board, turns, players, gameState, validWord.processedWord, validWord.blankPositions);
            turnsIntroduced.push(currentTurn);

            // TODO: Check for bonus words created

            // Calculate total score for the turn for player
            let totalTurnScore = 0;
            for (const turn of turnsIntroduced) {
                totalTurnScore += turn.wordScore;
            }

            // Update player in players array
            setPlayers(prev =>
                prev.map(player =>
                    player.id === currentTurn.playerId
                        ? { ...player, score: totalTurnScore, turns: [...player.turns, ...turnsIntroduced] }
                        : player
                )
            );

            // Add turn to turns array
            setTurn(prev => {
                return [...prev, ...turnsIntroduced];
            });

            setBoard(prev => {
                return UpdateGrid(prev, currentTurn, gameState, validWord.processedWord);
            })

            // Reset gameState and currentWord
            setGameState({
                start: {
                    status: false,
                    row: null,
                    col: null
                },
                end: {
                    status: false,
                    row: null,
                    col: null
                }
            })
            setCurrentWord("");
        }
        else {
            setErrorMessage(validWord.message);

            // Reset gameState and currentWord
            setGameState({
                start: {
                    status: false,
                    row: null,
                    col: null
                },
                end: {
                    status: false,
                    row: null,
                    col: null
                }
            })
            setCurrentWord("");
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">Play a Word</span>
            <span className="text-lg">If your word uses a blank letter, put your letter in square brackets [A]</span>

            <form onSubmit={HandleSubmit} className="w-full mx-auto flex flex-col justify-center items-center gap-4 p-4 bg-cursor border-2 rounded-xl">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <PlayerSelector />
                </div>
                <input
                    type="text"
                    value={currentWord}
                    onChange={word => setCurrentWord(word.target.value)}
                    placeholder="Insert your word here"
                    className="border rounded px-3 py-2"
                />
                <ErrorComponent />

                <button type="submit"
                        className="btn-submit">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}
