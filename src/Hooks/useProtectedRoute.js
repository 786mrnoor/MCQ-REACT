import { useNavigate } from "react-router-dom";
import { useGetUser } from "../ContextProvider/UserContextProvider";
import { useEffect } from "react";
import {useLoader} from '../ContextProvider/LoaderContextProvider.js';

export default function useProtectedRoute() {
    const user = useGetUser();
    const navigate = useNavigate();
    const showLoader = useLoader();
    useEffect(() => {
        if (!user) {
            showLoader(false);
            return navigate('/login');
        }
        if(!user?.uid){
            showLoader(true);
        }
        if(user?.uid){
            showLoader(false);
        }
    }, [user, navigate, showLoader]);
};
