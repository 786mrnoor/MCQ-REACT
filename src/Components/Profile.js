import { useGetUser } from "../ContextProvider/UserContextProvider";
import logo from '../images/profile.png';
import { NavLink } from "react-router-dom";
import User from "../models/User";
import { useLoader } from "../ContextProvider/LoaderContextProvider";

export default function Profile({onCloseProfile}) {
    const showLoader = useLoader();
    const user = useGetUser();
    async function handleSignOut() {
        try {
            await User.logout();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleChangePic(e){
        try{
            showLoader(true);
            await User.update({uid: user.uid, photoURL: e.target.files[0]})
            onCloseProfile();
            showLoader(false);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className="profile">
            <p>{user?.email}</p>
            <div className="imgContainer">
                <img src={user?.photoURL || logo} alt="Profile Pic" className="btn" />
                <input type="file" id="profileInput" accept="image/*" onChange={handleChangePic} style={{ display: 'none' }} />
                <label htmlFor="profileInput">edit</label>
                <h2>Hi, {user?.displayName}!</h2>
                <NavLink to="/manage-account">Mange your account</NavLink>
                <footer>
                    <button type="button" onClick={handleSignOut}>Sign out</button>
                </footer>
            </div>
        </div>
    )
};
