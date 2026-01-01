import {PlayerTile} from "./PlayerTile.jsx";
import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";
import {ErrorComponent} from "./ErrorComponent.jsx";

export const StartForm = () => {
    const {players, setGameStart, errorMessage, setErrorMessage, setPlayers} = useContext(GameContext);

    const AddPlayer = () => {
        if (players.length === 4) {
            setErrorMessage('Maximum of 4 players allowed only');
        }
        else {
            const newPlayer = {
                name: `Player ${players.length + 1}`,
                id: `${players.length + 1}`,
                currentPlayer: false,
                score: 0,
                turns: []
            };

            setPlayers(prev => {
                return [...prev, newPlayer];
            });
        }
    }

    return (
        <div className="flex flex-col justify-center gap-2">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Players</span>
                <button type="button" onClick={() => AddPlayer()} className="btn btn-add">Add Player</button>
            </div>

            <form className="flex flex-col items-center gap-4 p-2 sm:px-6 sm:py-3 justify-center bg-cursor border-2 border-ink rounded-xl" onSubmit={(event) => {
                event.preventDefault();
                setGameStart(true);
            }}>
                <div className="grid gap-4">
                    {players.map((player) => (
                        <PlayerTile key={player.id} Player={player} />
                    ))}
                </div>

                <div className={errorMessage ? "block" : "hidden"}>
                    <ErrorComponent />
                </div>

                <button type="submit" className="btn-submit">
                    Start Game
                </button>
            </form>
        </div>
    )
}
