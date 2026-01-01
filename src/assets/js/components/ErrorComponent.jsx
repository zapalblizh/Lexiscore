import {GameContext} from "../GameContext.jsx";
import {useContext} from "react";

export const ErrorComponent = () => {
    const {errorMessage} = useContext(GameContext);

    return (
        // border-red-error p-2 bg-error-bg text-red-error
        <div className={`w-full flex items-center gap-2 border-l-2 border-error-highlight bg-error-bg text-red-error p-2 rounded-md`}>
            <span className="text-error-highlight"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"></path></svg></span>
            <span>{errorMessage}</span>
        </div>
    )
}