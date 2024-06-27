import { getDatabase, ref, set, get as getData, child, update as updateData, remove, onChildAdded, onChildChanged, onChildRemoved, onValue , increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

import app from './firebaseApp.js';
const db = getDatabase(app);

class Realtime{
    static get(path) {
        return getData(child(ref(db), path));
    }

    static post(path, obj) {
        return set(ref(db, path), obj);
    }

    static update(path, obj) {
        return updateData(ref(db, path), obj);
    }
    static updateMany(obj) {
        return updateData(ref(db), obj);
    }

    static delete(path) {
        return remove(ref(db, path));
    }

    static addChildListener(type, path, listener) {
        if (type === 'ADDED') {
            return onChildAdded(ref(db, path), listener);
        }
        if (type === 'CHANGED') {
            return onChildChanged(ref(db, path), listener);
        }
        if (type === 'REMOVED') {
            return onChildRemoved(ref(db, path), listener);
        }
    }

    static addValueListener(path, listener){
        return onValue(ref(db, path), listener);
    }

    static incrementBy(value){
        return increment(value);
    }
}

export default Realtime;