import { useMemo } from "react";
import { useQuestions } from "../../ContextProvider/QuestionContextProvider";
import { useFilter } from "../../ContextProvider/QuizContextProvider"
import getFilteredQuiz from "../../helpers/filterQuiz";

export default function Table() {
    const questions = useQuestions();
    const filter = useFilter();
    const filteredQuestions = useMemo(()=>{
        return getFilteredQuiz(questions, filter);
    }, [questions, filter]);
    
    return (
        <div className="tableContainer scrollbar">
                <table border='1'>
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th id="name">QUESTION</th>
                            <th id="answer">ANSWER</th>
                            <th id="attend">ATT</th>
                            <th id="correct">CRT</th>
                            <th id="created">CREATED</th>
                            <th id="modified">MODIFIED</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {filteredQuestions && filteredQuestions.map((question, i) =>
                            <tr key={question.id}>
                                <td>{i + 1}</td>
                                <td>{question.name}</td>
                                <td>{question.options[question.answer]}</td>
                                <td>{question.attend}</td>
                                <td>{question.correct}</td>
                                <td>{new Date(question.created).toLocaleString()}</td>
                                <td>{new Date(question.modified).toLocaleString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    )
};
