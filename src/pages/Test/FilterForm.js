import { useState } from "react"
import { useSetFilter, useStartQuiz } from "../../ContextProvider/QuizContextProvider";

export default function FilterForm() {
    const [filter, setFilter] = useState({ created: '', attend: '', correct: '', questions: '' });
    const startTest = useStartQuiz();

    const filterQuiz = useSetFilter();
    function handleChange(e) {
        let { id, value } = e.target;
        if (id === 'created') {
            let date = new Date();
            date.setHours(0, 0, 0);
            switch (value) {
                case 'All':
                    setFilter({ ...filter, created: '' });
                    break;
                case 'today':
                    setFilter({ ...filter, created: date });
                    break;
                case 'week':
                    setFilter({ ...filter, created: new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000) });
                    break;
                case 'month':
                    date.setMonth(date.getMonth() - 1)
                    setFilter({ ...filter, created: date });
                    break;
                case 'year':
                    date.setFullYear(date.getFullYear() - 1)
                    setFilter({ ...filter, created: date });
                    break;
                default:
                    setFilter({ ...filter, created: '' });
            }
        }
        else {
            setFilter({ ...filter, [id]: value })
        }
    }

    return (
        <div id="filterForm">
            <main>
                <div className="inputField">
                    <label htmlFor="createDate">Create Date</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select id="created" onChange={handleChange}>
                            <option value="All">Any time</option>
                            <option value="today">Today</option>
                            <option value="week">Last week</option>
                            <option value="month">Last month</option>
                            <option value="year">Last year</option>
                        </select>
                    </div>
                </div>

                <div className="inputField">
                    <label htmlFor="attend">Attend</label>
                    <input type="number" id="attend" onChange={handleChange} />
                </div>
                <div className="inputField">
                    <label htmlFor="correct">Correct</label>
                    <input type="number" id="correct" onChange={handleChange} />
                </div>
                <div className="inputField">
                    <label htmlFor="questions">Number of Questions</label>
                    <input type="number" id="questions" onChange={handleChange} />
                </div>
            </main>
            <hr />
            <footer>
                <button type="button" onClick={startTest}>Start Quiz</button>
                <button type="button" onClick={() => filterQuiz(filter)}>Apply Filter</button>
            </footer>
        </div>
    )
};
