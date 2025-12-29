import {useCallback, useEffect, useState, useRef, useContext} from "react";
import { GameContext } from "../GameContext.jsx";
import { VerifyWord } from "../functions/VerifyWord.js"
import {UpdateGrid} from "../functions/UpdateGrid.js";
import {PlayerSelector} from "./PlayerSelector.jsx";
import {ErrorComponent} from "./ErrorComponent.jsx";
import {BlankFilter} from "../functions/BlankFilter.js";
import {CalculateWordScore} from "../functions/CalculateWordScore.js";

export const GameForm = () => {

    const {turns, setTurn, wordDict, setErrorMessage, players, setPlayers, startPos, setStartPos, direction, setDirection, currentWord, setCurrentWord, board, setBoard, SIZE_OF_GRID} = useContext(GameContext);

    // Handles Submission of a Word from Form
    const HandleSubmit = useCallback((e) => {
        e.preventDefault();

        let {processedWord, blankList} = BlankFilter(currentWord);
        // Returns alerts and true when passes through all checks
        const validWord = VerifyWord(board, startPos, direction, processedWord, players, SIZE_OF_GRID, wordDict);

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

            setBoard(prev => {
                return UpdateGrid(prev, turnData);
            })

            // Calculate total score for the turn for player
            let score = CalculateWordScore(board, turnData);

            // Update player in players array
            setPlayers(prev =>
                prev.map(player =>
                    player.id === turnData.playerId
                        ? { ...player, score: score, turns: [...player.turns, turnData] }
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
            console.log("I am inside else");
            setErrorMessage(validWord.message);

            // Reset startPos and currentWord
            setStartPos({
                status: false,
                row: null,
                col: null
            })
            setCurrentWord("");
        }
    }, [turns, setTurn, wordDict, setErrorMessage, players, setPlayers, startPos, setStartPos, direction, setDirection, currentWord, setCurrentWord, board, setBoard, SIZE_OF_GRID]);

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
