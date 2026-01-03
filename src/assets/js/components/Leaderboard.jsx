import { useContext } from "react";
import {GameContext} from "../GameContext.jsx";

const renderPlayers = (players) => {
    const elements = [];
    let sortedPlayers = [...players];
    sortedPlayers = sortedPlayers.sort((a, b) => b.score - a.score);

    for (let i = 0; i < players.length; i++) {
        elements.push(
            <div key={i} className="w-full flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 hover:-mx-3 px-3 hover:rounded-lg transition-all duration-200">
                <span className="font-bold text-gray-400 mr-3">{i + 1}</span>
                <span className="flex-1 font-medium text-gray-800">{sortedPlayers[i].name}</span>
                <span className="font-bold text-[#667EE9] text-lg">{sortedPlayers[i].score}</span>
            </div>
        )
    }

    return elements;
}
export const Leaderboard = () => {
    const {players} = useContext(GameContext);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Leaderboard</h2>

            <div className="w-full mx-auto flex flex-col items-center gap-4 bg-cursor border-2 rounded-2xl py-3 px-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                {renderPlayers(players)}
            </div>
        </div>
    );
}
