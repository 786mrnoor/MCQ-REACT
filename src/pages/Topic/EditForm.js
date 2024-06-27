import { useQuestionModel } from "../../ContextProvider/QuestionContextProvider";
import Form from "./Form";

export default function EditForm({ question, showForm }) {
    // const questions = useQuestions();
    const QuestionModel = useQuestionModel();

    async function handleSubmit(obj) {
        // if (!checkValid(questions, obj)) return window.alert('The Question is already there.');
        try {
            await QuestionModel.update(question.id, obj);
            showForm(false);
            window.alert('Question Updated Successfully');
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    }
    return (
        <Form handleClose={showForm} handleSubmit={handleSubmit} name='Update' defaultValue={question} />
    )
};

// function checkValid(questions, question) {
//     let name = question.name.toUpperCase();
//     return questions.every(q => q.name.toUpperCase() !== name);
// }