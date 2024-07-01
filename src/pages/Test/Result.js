import { useQuizFunctions, useResetQuiz } from "../../ContextProvider/QuizContextProvider";

export default function Result({ result, resultBoxAction }) {
    const resetQuiz = useQuizFunctions();
    let score = 0;
    let list = result.map((question, i) => {
        score += question.correct ? 1 : 0;
        return (<li onClick={() => resultBoxAction('SHOW', i)} key={i} className={question.correct ? 'correct' : 'incorrect'}>{i + 1}</li>)
    }
    )
    return (
        <div className="result-box">
            <header>
                <h3>Your Score is : {score}  out of {result.length}</h3>
            </header>
            <main>
                <ul>
                    {list}
                </ul>
            </main>
            <footer>
                <button onClick={resetQuiz.reset}>Play Again</button>
            </footer>
        </div>
    )
};
