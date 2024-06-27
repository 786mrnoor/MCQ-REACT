import { useTopics, useTopicsModal } from '../../ContextProvider/TopicsContextProvider.js';
import Form from './Form.js';

export default function AddForm({ showForm }) {
    const topics = useTopics();
    const TopicModal = useTopicsModal();

    async function handleSubmit(topicName) {
        const value = topicName.trim().toUpperCase();
        if (value.length === 0) return window.alert('Please Enter Topic Name!');
        if (!checkValid(value, topics)) return window.alert('The Topic is already there.');
        try {
            await TopicModal.post(value);
            showForm(false);
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    }

    return (
        <>
            <Form handleClose={showForm} handleSubmit={handleSubmit} name='Add' defaultValue='' />
        </>
    )
};


function checkValid(name, topics) {
    return topics.every(n => n.name !== name);
}