import { createContext, useContext, useEffect, useState } from "react"

const OnlineContext = createContext(true);

export function useOnline() {
    return useContext(OnlineContext);
}

export default function OnlineContextProvider({ children }) {
    const [online, setOnline] = useState(()=>navigator.onLine);
    useEffect(() => {
        function onLine() {
            setOnline(true);
        }
        function offLine() {
            setOnline(false);
        }
        window.addEventListener('online', onLine);
        window.addEventListener('offline', offLine);
        return () => {
            window.removeEventListener('online', onLine);
            window.removeEventListener('offline', offLine);
        }
    }, []);

    return (
        <OnlineContext.Provider value={online}>
            {children}
        </OnlineContext.Provider>
    )
};
