import {GameContext} from "../GameContext.jsx";
import {useCallback, useContext} from "react";

export const PlayerTile = ({Player}) => {
    const {players, setPlayers} = useContext(GameContext);

    const HandleNameChange = useCallback(({Player, name}) => {
        setPlayers(
            players.map(p => (
                p.id === Player.id ? { ...p, name: name } : p)
            )
        );
    }, [players, setPlayers]);

    const RemovePlayer = useCallback((Player) => {
        setPlayers(
            players.filter(player => player.id !== Player.id)
        )
    }, [players, setPlayers]);

    return (
        <div key={Player.id} className="flex w-full justify-center items-center gap-4">
            <input
                type="text"
                value={Player.name}
                onChange={(e) => HandleNameChange({ Player, name: e.target.value })}
                className="border bg-cursor rounded px-3 py-2"
                placeholder={`Your Player Name`}
            />

            <button
                type="button"
                disabled={players.length === 2}
                onClick={() => RemovePlayer(Player)}
                className="btn btn-delete btn--xs whitespace-nowrap flex-shrink-0">
                Delete
            </button>
        </div>
    )
}
