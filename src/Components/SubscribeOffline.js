import { Outlet } from "react-router-dom";
import { useOnline } from "../ContextProvider/OnlineContextProvider";
import Offline from "./Offline.js";

export default function SubscribeOffline() {
    const online = useOnline();
    if (online) {
        return (
            <>
                <Outlet />
            </>
        );
    }
    else {
        return (
            <Offline />
        )
    }
};
