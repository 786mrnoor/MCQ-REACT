import Realtime from '../serverConfig/Realtime.js';
import uniqueId  from '../helpers/uniqueId.js';
import QuestionModel from './Question.js';


class TopicModal{
    static dbName = 'topics';
    constructor(loader, userId=''){
        this.loader = loader;
        this.userId = userId;
    }
    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                const res = await Realtime.get(`${this.constructor.dbName}/${this.userId}`);
                let topics = [];
                if(!res) resolve(null);
                res.forEach(topic=>{topics.push(topic.val())});
                resolve(topics);
            }
            catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        });
    }
    get(topicId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                const res = await Realtime.get(`${this.constructor.dbName}/${this.userId}/${topicId}`);
                if(res.exists()){
                    resolve(res.val());
                }
                resolve(null);
            }
            catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        });
    }
    post(name) {
        let date = Date.now();
        let topic = {
            name,
            id: uniqueId(),
            questions: 0,
            attend: 0,
            correct: 0,
            created: date,
            modified: date
        }
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.post(`${this.constructor.dbName}/${this.userId}/${topic.id}`, topic);
                resolve(topic);
            } catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        })
    }
    update(topicId, topic) {
        topic.modified = Date.now();
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.update(`${this.constructor.dbName}/${this.userId}/${topicId}`, topic);
                resolve(topic);
            } catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        });
    }
    delete(topicId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.delete(`${this.constructor.dbName}/${this.userId}/${topicId}`);
                await Realtime.delete(`${QuestionModel.dbName}/${this.userId}/${topicId}`);
                resolve(true);
            } catch (error) {
                reject(error);
            } 
            finally{
                this.loader(false);
            }
        });
    }
    addChildListener(type, listener) {
        // type: ADDED, CHANGED, REMOVED;
        return Realtime.addChildListener(type, `${TopicModal.dbName}/${this.userId}`, listener);
    }
    addValueListener(path='',  listener){
        return Realtime.addValueListener(`${TopicModal.dbName}/${this.userId}/${path}`, listener);
    }
    
}

export default TopicModal;
