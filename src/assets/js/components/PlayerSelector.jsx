import {useContext, useEffect} from "react";
import {GameContext} from "../GameContext.jsx";

export const PlayerSelector = () => {
    const {players, setPlayers} = useContext(GameContext);

    // On first render, sets first player as current player
    useEffect(() => {
        setPlayers(prevPlayers =>
            prevPlayers.map((player, index) => ({
                ...player,
                currentPlayer: index === 0
            }))
        );
    }, []);

    const handlePlayerSelect = (id) => {
        setPlayers(prevPlayers => {
            return prevPlayers.map(player => {
                return {...player, currentPlayer: (player.id === id) ? !player.currentPlayer : false};
            })
        })
    }

    return (
        <div className="flex flex-wrap justify-center gap-2 px-8">
            {players.map(player => (
                <button key={player.id}
                        onClick={() => handlePlayerSelect(player.id)}
                        disabled={player.currentPlayer}
                        aria-label={`Select ${player.name} as current player`}
                        className="btn btn--primary">
                    <span>{player.name}</span>
                </button>
            ))}
        </div>
    )
}