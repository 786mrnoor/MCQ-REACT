import { createContext, useContext, useRef } from 'react';
import Loader from '../Components/Loader.js';

const LoaderContext = createContext(null);

export function useLoader(){
    return useContext(LoaderContext).showLoader;
}

export default function LoaderContextProvider({ children }) {
    const loaderRef = useRef(null);
    function showLoader(bool) {
        if (bool) {
            loaderRef.current.style.display = 'flex';
            window.addEventListener('keydown', stopTabKey);
        }
        else {
            loaderRef.current.style.display = 'none';
            window.removeEventListener('keydown', stopTabKey);
        }
    }

    return (
        <LoaderContext.Provider value={{showLoader}}>
            {children}
            <Loader ref={loaderRef}/>
        </LoaderContext.Provider>
    )
};

function stopTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
}
