import {GameContext} from "../GameContext.jsx";
import {useState, useContext, useEffect} from "react";

export const ErrorComponent = () => {
    const {errorMessage, setErrorMessage} = useContext(GameContext);

    const [isVisible, setIsVisible] = useState(false);

    // Animation for error message to appear and disappear
    useEffect(() => {
        if (errorMessage) {
            setIsVisible(true);

            const fadeOutTimer = setTimeout(() => {
                setIsVisible(false);
            }, 6000);

            const clearErrorTimer = setTimeout(() => {
                setErrorMessage(null);
            }, 7000);

            // 4. Cleanup function: clear timers if a new error comes in
            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(clearErrorTimer);
            };
        }
    }, [errorMessage, setErrorMessage]);

    return (
        <div className={`transition-opacity duration-500 opacity-0 flex items-center justify-center p-2 text-red-400
            ${isVisible ? 'opacity-100' : 'opacity-0 hidden'}`
        }>
            <span>{errorMessage}</span>
        </div>
    )
}