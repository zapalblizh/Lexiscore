import React, {createContext, useState, useEffect, useMemo, useRef} from "react";
import multipliers from "../_data/multipliers.js";

export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const INITIAL_PLAYER_COUNT = 2;
    const wordDict = useRef(null);

    // Gets dictionary only once on page load
    useEffect(() => {
        const saved = sessionStorage.getItem('wordDict');
        if (saved) {
            wordDict.current = new Set(JSON.parse(saved));
        } else {
            fetch('../../../twl.txt')
                .then(response => response.text())
                .then(text => {
                    const words = text.replace(/\r/g, '').split('\n');
                    const dict = new Set(words);
                    sessionStorage.setItem('wordDict', JSON.stringify(Array.from(dict)));
                });
        }
    });

    const [direction, setDirection] = useState("horizontal");
    const [startPos, setStartPos] = useState({
        status: false,
        row: null,
        col: null
    })

    const [turns, setTurn] = useState([]);
    const [turnsHistory, setTurnsHistory] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);

    const [board, setBoard] = useState(() => {
        const saved = sessionStorage.getItem('board');

        const initialBoard = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => ({
                letter: '',
                bonus: null,
                blank: false
            }))
        );

        for (let i = 0; i < multipliers.length; i++) {
            initialBoard[multipliers[i][0]][multipliers[i][1]].bonus = multipliers[i][2];
            initialBoard[multipliers[i][0]][multipliers[i][1]].bonusAvailable = true;
        }

        return saved ? JSON.parse(saved) : initialBoard;
    });

    // Creates array with two players and inserts it as initial state
    const minPlayers = useMemo(() => {
        const players = [];

        for (let i = 0; i < INITIAL_PLAYER_COUNT; i++) {
            const newPlayer = {
                name: `Player ${i + 1}`,
                id: i + 1,
                currentPlayer: false,
                score: 0,
                turns: []
            };
            players.push(newPlayer);
        }

        return players;
    }, [INITIAL_PLAYER_COUNT]);

    const [players, setPlayers] = useState(() => {
        const saved = sessionStorage.getItem('players');

        return saved ? JSON.parse(saved) : minPlayers;
    });


    const [currentWord, setCurrentWord] = useState("");
    const [gameStart, setGameStart] = useState(() => {
        return sessionStorage.getItem('gameStart') === 'true';
    });

    useEffect(() => {
        sessionStorage.setItem('board', JSON.stringify(board));
        sessionStorage.setItem('players', JSON.stringify(players));
        sessionStorage.setItem('turnsHistory', JSON.stringify(turnsHistory));
        sessionStorage.setItem('gameStart', JSON.stringify(gameStart));
    }, [board, players, turnsHistory, gameStart]);

    const contextValue = {
        turns, setTurn,
        players, setPlayers,
        wordDict: wordDict.current,
        board, setBoard,
        errorMessage, setErrorMessage,
        currentWord, setCurrentWord,
        gameStart, setGameStart,
        direction, setDirection,
        startPos, setStartPos,
        turnsHistory, setTurnsHistory
    };

    return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}
