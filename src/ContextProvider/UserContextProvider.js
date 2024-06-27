import { createContext, useContext, useEffect, useState } from "react"
import User from '../models/User.js';

const UserContext = createContext(null);

export function useGetUser() {
    return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        User.onAuthChange((u) => {
            setUser(u);
        })
    }, []);

    return (
        <UserContext.Provider value={user}>
                {children}
        </UserContext.Provider>
    )
};
