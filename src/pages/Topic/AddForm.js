import Form from './Form.js';
import { useQuestions, useQuestionModel } from '../../ContextProvider/QuestionContextProvider.js';

export default function AddForm({ showForm }) {
    const questions = useQuestions();
    const QuestionModel = useQuestionModel();

    async function handleSubmit(question) {
        if (!checkValid(questions, question)) return window.alert('The Question is already there.');
        try {
            await QuestionModel.post(question);
            showForm(false);
            window.alert('Question Added Successfully');
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    }

    return (
        <>
            <Form handleClose={showForm} handleSubmit={handleSubmit} name='Add' defaultValue={{ name: '', options: ['', ''], answer: 0 }} />
        </>
    )
};


function checkValid(questions, question) {
    let name = question.name.toUpperCase();
    return questions.every(q => q.name.toUpperCase() !== name);
}