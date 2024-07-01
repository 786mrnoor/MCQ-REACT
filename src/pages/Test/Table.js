import { useMemo, useState } from "react";
import { useQuestions } from "../../ContextProvider/QuestionContextProvider";
import { useFilter } from "../../ContextProvider/QuizContextProvider"
import getFilteredQuiz from "../../helpers/filterQuiz";
import timeAgo from "../../helpers/timeAgo";

export default function Table() {
    const questions = useQuestions();
    const filter = useFilter();

    const [currentSortColumn, setCurrentSortColumn] = useState('name');
    const [isAscending, setIsAscending] = useState(true);

    const filteredQuestions = useMemo(() => {
        let q = getFilteredQuiz(questions, filter);
        if (!q) return [];
        return q.sort((a, b) => {
            let valueA = a[currentSortColumn];
            let valueB = b[currentSortColumn];
            if (currentSortColumn === 'answer') {
                valueA = a.options[a.answer];
                valueB = b.options[a.answer];
            }
            if (typeof valueA === 'string') {
                valueA = valueA.toUpperCase();
                valueB = valueB.toUpperCase();
            }
            if (valueA < valueB) return isAscending ? -1 : 1;
            if (valueA > valueB) return isAscending ? 1 : -1;
            return 0;
        });
    }, [currentSortColumn, isAscending, questions, filter])

    function handleSortQuestions(e) {
        let column = e.target.id;
        if (currentSortColumn === column) {
            setIsAscending(!isAscending);
        } else {
            setCurrentSortColumn(column);
            setIsAscending(true);
        }
    }

    return (
        <div className="tableContainer scrollbar">
            <table border='1'>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="name">QUESTION</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="answer">ANSWER</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="attend">ATT</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="correct">CRT</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="created">CREATED</th>
                        <th onClick={handleSortQuestions} className="sortButton" id="modified">MODIFIED</th>
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
                            <td>{timeAgo(question.created)} ago</td>
                            <td>{timeAgo(question.modified)} ago</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};
