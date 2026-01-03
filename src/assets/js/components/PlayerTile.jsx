import {GameContext} from "../GameContext.jsx";
import {useCallback, useContext} from "react";

export const PlayerTile = ({player}) => {
    const {players, setPlayers} = useContext(GameContext);

    const HandleNameChange = useCallback(({player, name}) => {
        setPlayers(
            players.map(p => (
                p.id === player.id ? { ...p, name: name } : p)
            )
        );
    }, [players, setPlayers]);

    const RemovePlayer = useCallback((selectedPlayer) => {
        setPlayers(
            players.filter(player => player.id !== selectedPlayer.id)
        )
    }, [players, setPlayers]);

    return (
        <div key={player.id} className="flex w-full justify-center items-center gap-4">
            <label className="sr-only" htmlFor={`player-${player.id}`}>Player {player.id} Name</label>
            <input
                type="text"
                id={`player-${player.id}`}
                value={player.name}
                onChange={(e) => HandleNameChange({ player, name: e.target.value })}
                className="border bg-cursor rounded px-3 py-2"
                placeholder={`Your Player Name`}
            />

            <button
                type="button"
                disabled={players.length === 2}
                onClick={() => RemovePlayer(player)}
                className="btn btn-delete btn--xs whitespace-nowrap flex-shrink-0">
                Delete
            </button>
        </div>
    )
}
