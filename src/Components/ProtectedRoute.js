import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import useProtectedRoute from "../Hooks/useProtectedRoute";

export default function ProtectedRoute() {
    useProtectedRoute();
    return (
        <>
            <Nav />
            <Outlet />
        </>

    )
};
