import React, { createContext, useState, useEffect } from "react";
import multipliers from "../_data/multipliers.js";

export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const INITIAL_PLAYER_COUNT = 2;
    const SIZE_OF_GRID = 15;

    // New States to modify current program
    // Change direction in the future ==> setDirection(prev => prev === "horizontal" ? "vertical" : "horizontal");
    const [direction, setDirection] = new useState("horizontal");
    const [startPos, setStartPos] = useState({
        status: false,
        row: null,
        col: null
    })

    const [turns, setTurn] = useState([]);
    const [wordDict, setWordDict] = useState(new Set());
    const [errorMessage, setErrorMessage] = useState(null);

    const [board, setBoard] = useState(() => {
        const initialBoard = Array.from({ length: SIZE_OF_GRID }, () =>
            Array.from({ length: SIZE_OF_GRID }, () => ({
                letter: '',
                bonus: null,
                blank: false
            }))
        );

        for (let i = 0; i < multipliers.length; i++) {
            initialBoard[multipliers[i][0]][multipliers[i][1]].bonus = multipliers[i][2];
            initialBoard[multipliers[i][0]][multipliers[i][1]].bonusAvailable = true;
        }

        return initialBoard;
    });

    // Creates array with two players and inserts it as initial state
    let  minPlayers = [];
    for (let i = 0; i < INITIAL_PLAYER_COUNT; i++) {
        const newPlayer = {
            name: `Player ${i + 1}`,
            id: i + 1,
            currentPlayer: false,
            score: 0,
            turns: []
        };

        minPlayers = [...minPlayers, newPlayer];
    }
    const [players, setPlayers] = useState(minPlayers);

    // Dictionary of Words
    useEffect(() => {
        fetch('../../../twl.txt')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((text) => {
                const words = text.replace(/\r/g, '').split('\n');
                setWordDict(new Set(words));
            })
            .catch(error => {
                console.error("Failed to load word list:", error);
            });
    }, []);


    const [currentWord, setCurrentWord] = useState("");
    const [gameStart, setGameStart] = useState(false);

    const contextValue = {
        turns, setTurn,
        players, setPlayers,
        wordDict, SIZE_OF_GRID,
        board, setBoard,
        errorMessage, setErrorMessage,
        currentWord, setCurrentWord,
        gameStart, setGameStart,
        direction, setDirection,
        startPos, setStartPos
    };

    return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}
