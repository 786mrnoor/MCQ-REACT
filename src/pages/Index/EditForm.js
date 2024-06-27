import { useTopics, useTopicsModal } from "../../ContextProvider/TopicsContextProvider";
import Form from "./Form";

export default function EditForm({ topic, showForm }) {
    const topics = useTopics();
    const TopicModal = useTopicsModal();

    async function handleSubmit(topicName) {
        const value = topicName.trim().toUpperCase();
        if (value.length === 0) return window.alert('Please Enter Topic Name!');
        if (!checkValid(value, topics)) return window.alert('The Topic is already there.');
        try {
            await TopicModal.update(topic.id, {name: topicName});
            showForm(false);
            window.alert('Topic Updated Successfully');
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    }
    return (
        <>
            <Form handleClose={showForm} handleSubmit={handleSubmit} name='Update' defaultValue={topic.name} />
        </>
    )
};

function checkValid(name, topics) {
    return topics.every(n => n.name !== name);
}