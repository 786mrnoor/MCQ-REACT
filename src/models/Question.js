import Realtime from '../serverConfig/Realtime.js';
import uniqueId  from '../helpers/uniqueId.js';


class QuestionModel{
    static dbName = 'questions';
    static topicDbName = 'topics';
    constructor(loader, userId='', topicId=''){
        this.loader = loader;
        this.userId = userId;
        this.topicId = topicId;
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
    updateMany(updates){
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.updateMany(updates);
                resolve(true);
            } catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        });
    }
    post(question) {
        let date = Date.now();
        question.id = uniqueId();
        question.attend = 0;
        question.correct = 0;
        question.created = date;
        question.modified = date;
        
        let updates = {};
        updates[`${this.constructor.dbName}/${this.userId}/${this.topicId}/${question.id}`] = question;
        updates[`${this.constructor.topicDbName}/${this.userId}/${this.topicId}/questions`] = Realtime.incrementBy(1);
        updates[`${this.constructor.topicDbName}/${this.userId}/${this.topicId}/modified`] = date;

        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.updateMany(updates);
                resolve(true);
            } catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        })
    }
    update(questionId, obj) {
        let date = Date.now();
        let updates = {}
        let path = `${this.constructor.dbName}/${this.userId}/${this.topicId}/${questionId}/`;
        for(let key in obj){
            updates[path + key] = obj[key];
        }
        updates[path + 'modified'] = date;
        updates[`${this.constructor.topicDbName}/${this.userId}/${this.topicId}/modified`] = date;

        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.updateMany(updates);
                resolve(true);
            } catch (error) {
                reject(error);
            }
            finally{
                this.loader(false);
            }
        });
    }
    updateResult(result){
        let date = Date.now();
        let updates = {}
        let path = `${this.constructor.dbName}/${this.userId}/${this.topicId}`;
        let topicPath = `${this.constructor.topicDbName}/${this.userId}/${this.topicId}/`;
        let numberOfCorrect = 0;
        result.forEach(q=>{
            updates[`${path}/${q.id}/attend`] = Realtime.incrementBy(1);
            if(q.correct){
                updates[`${path}/${q.id}/correct`] = Realtime.incrementBy(1);
                numberOfCorrect += 1;
            }
            updates[`${path}/${q.id}/modified`] = date;
        });
        
        updates[topicPath + '/attend'] = Realtime.incrementBy(result.length);
        updates[topicPath + '/correct'] = Realtime.incrementBy(numberOfCorrect);
        updates[topicPath + '/modified'] = date;
        return this.updateMany(updates);
        
    }
    delete(question) {
        let updates = {}
        updates[`${this.constructor.dbName}/${this.userId}/${this.topicId}/${question.id}`] = null;
        let path = `${this.constructor.topicDbName}/${this.userId}/${this.topicId}/`
        updates[path + 'modified'] = Date.now();
        updates[path + 'attend'] = Realtime.incrementBy(question.attend * -1);
        updates[path + 'correct'] = Realtime.incrementBy(question.correct * -1);
        updates[path + 'questions'] = Realtime.incrementBy(-1);

        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.updateMany(updates);
                resolve(true);
            } catch (error) {
                reject(error);
            } finally{
                this.loader(false);
            }
        });
    }
    addChildListener(type, listener) {
        // type: ADDED, CHANGED, REMOVED;
        return Realtime.addChildListener(type, `${this.constructor.dbName}/${this.userId}/${this.topicId}`, listener);
    }
    
}

export default QuestionModel;