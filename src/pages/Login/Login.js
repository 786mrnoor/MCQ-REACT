import './Login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import User from '../../models/User.js';
import { useLoader } from '../../ContextProvider/LoaderContextProvider.js';
import useTitle from '../../Hooks/useTitle.js';

export default function Login() {
    const [obj, setObj] = useState({ email: '@gmail.com', password: '' });
    const navigate = useNavigate();
    const showLoader = useLoader();

    function handleChange(e) {
        setObj({ ...obj, [e.target.name]: e.target.value });
    }

    async function handleLogin() {
        if (!isValidData(obj)) return;
        try {
            showLoader(true);
            await User.login(obj);
            navigate('/');
        }
        catch (err) {
            if (err.code === 'auth/invalid-credential') {
                window.alert("email or password is incorrect");
            }
            else {
                window.alert(err.code);
            }
            console.log(err);
        }
        finally{
            showLoader(false);
        }
    }
    useTitle('Login');
    return (
        <div className="loginContainer">
            <h1>Login</h1>
            <main>
                <div className="inputField">
                    <input type="text" name="email" value={obj.email} onChange={handleChange} spellCheck="false" autoComplete="off" required />
                    <span>Email</span>
                </div>
                <div className="inputField">
                    <input type="password" name="password" value={obj.password} onChange={handleChange} spellCheck="false" autoComplete="off" required />
                    <span>Password</span>
                </div>
            </main>
            <footer>
                <button type="button" onClick={handleLogin}>Login</button>
                <p>Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
            </footer>
        </div>
    )
};

function isValidData(obj) {
    let valid = true;
    if (obj.email.length < 6 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email))) {
        window.alert('Please Enter email correctly');
        valid = false;
    }
    if (obj.password.length < 6) {
        window.alert('Please Enter a valid password');
        valid = false;
    }
    return valid;
}