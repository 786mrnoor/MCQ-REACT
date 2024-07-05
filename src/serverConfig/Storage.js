import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

const storage = getStorage();

class Storage {
    static post(path, image, option, metaData) {
        return uploadString(ref(storage, path), image, option, metaData);
    }

    static getURL(path){
        return getDownloadURL(ref(storage, path));
    }
}

export default Storage;