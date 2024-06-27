import './SignUp.css';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import User from '../../models/User';
import {useLoader} from '../../ContextProvider/LoaderContextProvider.js';
import useTitle from '../../Hooks/useTitle.js';

export default function SignUp() {
    const [obj, setObj] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const showLoader = useLoader();

    function handleChange(e) {
        setObj({ ...obj, [e.target.name]: e.target.value });
    }

    async function handleSignUp() {
        if (!isValidData(obj)) return;
        try {
            showLoader(true);
            await User.signup(obj);
            navigate('/');
        }
        catch (err) {
            window.alert(err.code);
            console.log(err);
        }
        finally{
            showLoader(false);
        }
    }
    useTitle('Signup')
    return (
        <div className="signupContainer">
            <h1>SignUp</h1>
            <main>
                <div className="inputField">
                    <input type="text" name="name" value={obj.name} onChange={handleChange} spellCheck="false" autoComplete="off" required />
                    <span>Name</span>
                </div>
                <div className="inputField">
                    <input type="text" name="email" value={obj.email} onChange={handleChange} spellCheck="false" autoComplete="off" required />
                    <span>Email</span>
                </div>
                <div className="inputField">
                    <input type="password" name="password" value={obj.password} onChange={handleChange} spellCheck="false" autoComplete="off" required />
                    <span>Password</span>
                </div>
                <div className="passwordChecker">
                    <p className={obj.password.search(/[A-Z]/) !== -1 ? 'validate' : ''}>One uppercase character</p>
                    <p className={obj.password.search(/[a-z]/) !== -1 ? 'validate' : ''}>One lowercase character</p>
                    <p className={obj.password.search(/[0-9]/) !== -1 ? 'validate' : ''}>One number(0-9)</p>
                    <p className={obj.password.search(/[`~!@#$%^&*)(?.><]/) !== -1 ? 'validate' : ''}>One special character</p>
                    <p className={obj.password.length >= 8 ? 'validate' : ''}>8 characters minimum</p></div>
            </main>
            <footer>
                <button type="button" onClick={handleSignUp}>Signup</button>
                <p>Already have an account?<NavLink to="/login">Login</NavLink></p>
            </footer>
        </div>
    )
};

function isValidData(obj) {
    let valid = true;
    let { password: pass } = obj;
    if (obj.name.length < 3) {
        window.alert('Enter Your Name Correctly');
        valid = false;
    }
    if (obj.email.length < 6 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email))) {
        window.alert('Please Enter email correctly');
        valid = false;
    }
    if (
        pass.search(/[A-Z]/) === -1 ||
        pass.search(/[a-z]/) === -1 ||
        pass.search(/[0-9]/) === -1 ||
        pass.search(/[`~!@#$%^&*)(?.><]/) === -1 ||
        pass.length < 8
    ) {
        window.alert('Invalid Password');
        valid = false;
    }
    return valid;
}