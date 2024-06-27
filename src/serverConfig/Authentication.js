import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import app from './firebaseApp.js';

const auth = getAuth(app);

class Auth {
    static onAuthChange(resolve) {
        return onAuthStateChanged(auth, resolve);
    }
    static sign(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    static update(obj){
        return updateProfile(auth.currentUser, obj);
    }
    static login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    static logout() {
           return signOut(auth);
    }
}

export default Auth;