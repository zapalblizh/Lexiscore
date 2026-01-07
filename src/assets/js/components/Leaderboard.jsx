import { useContext } from "react";
import {GameContext} from "../GameContext.jsx";

const renderPlayers = (players) => {
    const elements = [];
    let sortedPlayers = [...players];
    sortedPlayers = sortedPlayers.sort((a, b) => b.score - a.score);

    let colors = ['bg-yellow-600', 'bg-gray-600', 'bg-amber-700', 'bg-blue-900']
    for (let i = 0; i < players.length; i++) {
        elements.push(
            <div key={i} className={`w-full flex items-center justify-between gap-4 p-3 ${i % 2 !== 0 ? 'bg-gray-100' : 'bg-cursor'}`}>
                <span className={`size-8 flex items-center justify-center font-bold rounded-full ${colors[i]} text-cursor mr-3`}>{i + 1}</span>
                <span className="flex-1 font-medium text-gray-800">{sortedPlayers[i].name}</span>
                <span className="text-lg font-bold text-green-700">{sortedPlayers[i].score}</span>
            </div>
        )
    }

    return elements;
}

export const Leaderboard = () => {
    const {players} = useContext(GameContext);

    return (
        <div className="w-full flex flex-col gap-2 max-w-sm">
            <h2 className="text-2xl font-bold">Leaderboard</h2>

            <div className="w-full mx-auto flex flex-col items-center border-2 rounded-2xl overflow-hidden">
                {renderPlayers(players)}
            </div>
        </div>
    );
}
