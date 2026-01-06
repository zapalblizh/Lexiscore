import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
import {GameForm} from "./components/GameForm.jsx";
import {GameContext} from "./GameContext.jsx";
import {useContext} from "react";
import {Leaderboard} from "./components/Leaderboard.jsx";
import {TurnsHistory} from "./components/TurnsHistory.jsx";

function App() {
    const {gameStart} = useContext(GameContext);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-8 w-fit mx-auto lg:max-w-full lg:mx-0">
                <div className="w-fit mx-auto lg:mx-0">
                    <Board />
                </div>

                <div className="w-full max-w-[inherit] lg:w-fit flex flex-col justify-center items-center lg:justify-start gap-4">
                    {!gameStart ? <StartForm />  : <GameForm />}
                    <Leaderboard />
                </div>
            </div>

            <TurnsHistory />
        </div>
    )
}

export default App;