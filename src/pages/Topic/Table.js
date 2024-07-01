import { useMemo, useState } from "react";
import { useQuestions, useQuestionModel } from "../../ContextProvider/QuestionContextProvider";
import { NavLink } from "react-router-dom";
import { useTopic } from "../../ContextProvider/TopicContextProvider";
import timeAgo from "../../helpers/timeAgo";

export default function Table({ tableAction }) {
    const topic = useTopic();
    let questions = useQuestions();
    const QuestionModel = useQuestionModel();

    //sort and filter
    const [currentSortColumn, setCurrentSortColumn] = useState('name');
    const [isAscending, setIsAscending] = useState(true);
    const [search, setSearch] = useState('');
    questions = useMemo(() => {
        let value = search.toUpperCase();
        return questions.filter(question => {
            if (question.name.toUpperCase().includes(value) || question.options[question.answer].toUpperCase().includes(value)) {
                return true;
            }
            return false;
        }).sort((a, b) => {
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
    }, [currentSortColumn, isAscending, questions, search])

    function handleSortQuestions(e) {
        let column = e.target.id;
        if (currentSortColumn === column) {
            setIsAscending(!isAscending);
        } else {
            setCurrentSortColumn(column);
            setIsAscending(true);
        }
    }

    async function handleDelete(question) {
        if (window.confirm('Are You Sure You Want To Delete This Topic!')) {
            try {
                await QuestionModel.delete(question);
                window.alert('Deleted Successfully')
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }
        }
    }

    return (
        <main className="table-main">
            <div className="row">
                <h2>TOPIC: {topic?.name}</h2>
                <p>QUESTIONS: <span>{topic?.questions}</span> </p>
                <p>ATT: <span>{topic?.attend}</span></p>
                <p>CRT: <span>{topic?.correct}</span></p>
                <p>MODIFIED: <span>{topic?.modified ? timeAgo(topic?.modified) + ' ago' : ''}</span></p>
            </div>
            <header>
                <button><NavLink to={`/test/${topic?.id}`}>Start Test</NavLink></button>
                <button type="button" onClick={() => tableAction('ADD')}>+ Add Question</button>
                <div className="inputField">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} autoComplete="off" spellCheck="false" required />
                    <span>Search</span>
                </div>
            </header>
            <div className="tableContainer scrollbar">
                <table>
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="name">QUESTION</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="answer">ANSWER</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="attend">ATT</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="correct">CRT</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="created">CREATED</th>
                            <th onClick={handleSortQuestions} className="sortButton" id="modified">MODIFIED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {questions.map((question, i) =>
                            <tr key={question.id}>
                                <td>{i + 1}</td>
                                <td>{question.name}</td>
                                <td>{question.options[question.answer]}</td>
                                <td>{question.attend}</td>
                                <td>{question.correct}</td>
                                <td>{timeAgo(question.created)} ago</td>
                                <td>{timeAgo(question.modified)} ago</td>
                                <td>
                                    <button type="button" onClick={() => tableAction('EDIT', question)}>Edit</button>
                                    <button type="button" onClick={() => handleDelete(question)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
};