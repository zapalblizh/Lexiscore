import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
import {GameForm} from "./components/GameForm.jsx";
import {GameContext} from "./GameContext.jsx";
import {useContext} from "react";
import {Leaderboard} from "./components/Leaderboard.jsx";

function App() {
    const {gameStart} = useContext(GameContext);

    return (
        <div className="flex flex-col lg:flex-row gap-4 max-w-fit mx-auto lg:max-w-full lg:mx-0 w-full ">
            <div className="col-span-1 lg:col-span-4 max-w-fit">
                <Board />
            </div>

            <div className="w-full">
                <div className="mx-auto max-w-sm flex flex-col justify-center lg:justify-start gap-4">
                    {!gameStart ? <StartForm />  : <GameForm />}

                    <Leaderboard />
                </div>
            </div>
        </div>
    )
}

export default App;