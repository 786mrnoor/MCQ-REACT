import Auth from "../serverConfig/Authentication"
import Storage from '../serverConfig/Storage.js';
import reduceImage from "../helpers/reduceImage.js";

class User {
    static onAuthChange(resolve) {
        return Auth.onAuthChange((user) => {
            resolve(user);
        });
    }
    static signup(obj) {
        return new Promise(async (resolve, reject) => {
            try {
                await Auth.sign(obj.email, obj.password);
                await Auth.update({ displayName: obj.name });
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        })
    }
    static login(obj) {
        return new Promise(async (resolve, reject) => {
            try {
                await Auth.login(obj.email, obj.password);
                resolve(true);
            } catch (error) {
                reject(error);
            } 
        })
    }
    static update(obj) {
        return new Promise(async (resolve, reject) => {
            if (obj?.photoURL) {
                try {
                    let reducedFileURL = await reduceImage(obj.photoURL);
                    await Storage.post(`usersPic/${obj.uid}`, reducedFileURL, 'data_url');
                    let url = await Storage.getURL(`usersPic/${obj.uid}`);
                    await Auth.update({ photoURL: url });
                    resolve(url);
                }
                catch(err){
                    reject(err);
                }
            }
        })
    }
    static logout() {
        return new Promise(async (resolve, reject) => {
            try {
                await Auth.logout();
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        })
    }
}

export default User;