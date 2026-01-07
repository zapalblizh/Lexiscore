import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";
import multipliers from "../../_data/multipliers.js";

const getTurnData = (turns, players) => {
    let minRequired = 5;

    const latestTurns = turns.slice(-minRequired);

    let items = [];

    for (let i = 0; i < minRequired; i++) {
        if (latestTurns[i] !== undefined) {
            const playerName = players.find(player => player.id === latestTurns[i].playerId)?.name;

            items.push(
                <div key={latestTurns[i].turnId} className={`flex items-center justify-between gap-4 p-3 
                ${latestTurns[i].turnId % 2 !== 0 ? 'bg-gray-100' : 'bg-cursor'}`}>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center size-8 bg-blue-900 text-cursor font-bold text-sm rounded-full">{latestTurns[i].turnId}</span>
                        <span className="font-medium text-gray-800 w-24">{playerName}</span>
                        <span className="font-bold text-blue-900 text-lg tracking-wide">{latestTurns[i].word}</span>
                    </div>

                    <span className="text-lg font-bold text-green-700">{latestTurns[i].wordScore}</span>
                </div>
            )
        }
        else {
            items.push(
                <div key={`placeholder-${i}`} className={`flex items-center justify-between min-h-14 gap-4 p-3 
                    ${i % 2 === 0 ? 'bg-gray-100' : 'bg-cursor'}`}>
                </div>
            )
        }
    }

    return items;
}

const RemoveLastTurn = (turns, players, board, setBoard, addTurn, setPlayers) => {
    if (turns.length === 0) return;

    const lastTurn = turns[turns.length - 1];

    addTurn(prev => prev.slice(0, -1));

    setPlayers(prev =>
        prev.map(player => player.id === lastTurn.playerId
            ? { ...player, score: player.score - lastTurn.wordScore }
            : player
        )
    );

    let next = board.map(row => row.map(cell => ({...cell})));

    for (let i = 0; i < lastTurn.word.length; i++) {
        if (lastTurn.direction === "horizontal" && lastTurn.emptyList[i]) {
            let bonus = multipliers.find(multiplier =>
                multiplier[0] === lastTurn.startPos.row &&
                multiplier[1] === lastTurn.startPos.col + i
            )?.[2];


            next[lastTurn.startPos.row][lastTurn.startPos.col + i] = {
                ...next[lastTurn.startPos.row][lastTurn.startPos.col + i],
                letter: '',
                blank: false,
                bonusAvailable: true,
                bonus: bonus || null
            };
        }
        else if (lastTurn.direction === "vertical" && lastTurn.emptyList[i]) {
            let bonus = multipliers.find(multiplier =>
                multiplier[0] === lastTurn.startPos.row + i &&
                multiplier[1] === lastTurn.startPos.col
            )?.[2];


            next[lastTurn.startPos.row + i][lastTurn.startPos.col] = {
                ...next[lastTurn.startPos.row + i][lastTurn.startPos.col],
                letter: '',
                blank: false,
                bonusAvailable: true,
                bonus: bonus || null
            };
        }
    }

    setBoard(next);
}

export const TurnsHistory = () => {
    const {turns, board, setBoard, addTurn, players, setPlayers} = useContext(GameContext);

    return (
        <div className="flex flex-col max-w-xl w-full mx-auto gap-4">
            <div className="flex justify-between items-center gap-2">
                <h2 className="text-2xl font-bold">Turn History</h2>
                <button onClick={() => RemoveLastTurn(turns, players, board, setBoard, addTurn, setPlayers)} className="btn btn-delete btn--xs whitespace-nowrap flex-shrink-0">Undo Last</button>
            </div>

            <div className="min-h-64 border-2 rounded-xl overflow-hidden">
                {getTurnData(turns, players)}
            </div>
        </div>
    );
}