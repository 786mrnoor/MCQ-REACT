import { useState } from "react";
import { useQuizState } from "../../ContextProvider/QuizContextProvider";
import Result from "./Result.js";
import { useQuestionModel } from "../../ContextProvider/QuestionContextProvider.js";

export default function QuizBox() {
    const [index, setIndex] = useState(0);
    const [result, setResult] = useState([]);
    const { questions } = useQuizState();
    const [showResult, setShowResult] = useState(false);
    const [submit, setSubmit] = useState(false);

    const QuestionModel = useQuestionModel();


    function handleClick(i) {
        if (index < result.length) return;
        setResult([...result, {
            id: questions[index].id,
            choose: i,
            correct: questions[index].answer === i
        }]);
    }

    function nextQuestion(n) {
        let nextIndex = index + n;
        if (nextIndex >= questions.length) {
            if (!submit) {
                // handleResult(result);
                QuestionModel.updateResult(result);
                setSubmit(true);
            }
            setShowResult(true);
            return;
        }
        setIndex(nextIndex);
    }
    function handleAction(type, payload) {
        if (type === 'SHOW') {
            setShowResult(false);
            setIndex(payload);
        }
        if (type === 'playAgain') {
            // stopTest(false);
        }
    }
    return (
        <div className="quiz-box">
            {!showResult && questions &&
                <section>
                    <header>
                        <h3>Question: {index + 1} out of {questions.length}</h3>
                    </header>
                    <main>
                        <h3>{questions[index].name}</h3>
                        <ul>
                            {
                                questions[index].options.map((option, i) => {
                                    // first time when the option is not selected
                                    if (index === result.length) {
                                        return <li key={i} onClick={() => handleClick(i)}>{option}</li>
                                    }
                                    // if the chosen option is correct / incorrect
                                    else if (result[index]?.choose === i) {
                                        return <li key={i} className={result[index].correct ? 'correct' : 'incorrect'}>{option}</li>
                                    }
                                    else {
                                        return <li key={i} className={questions[index].answer === i ? 'correct' : ''}>{option}</li>
                                    }
                                })
                            }
                        </ul>
                        <div className="example-container">
                            <div className="example">
                                <h4>Example:</h4>
                                <p></p>
                            </div>
                        </div>
                    </main>
                    <footer>
                        <button disabled={index <= 0} onClick={() => nextQuestion(-1)}>Previous</button>
                        {submit && <button onClick={() => setShowResult(true)}>Show My Score</button>}
                        <button disabled={index >= result.length} onClick={() => nextQuestion(1)}>Next</button>
                    </footer>
                </section>
            }
            {showResult && <Result result={result} resultBoxAction={handleAction} />}
        </div>
    )

};