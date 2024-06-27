import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTopics, useTopicsModal, useSortTopics } from "../../ContextProvider/TopicsContextProvider"

export default function Table({ tableAction }) {
    let topics = useTopics();
    const sortTopics = useSortTopics();
    const TopicModal = useTopicsModal();

    const [search, setSearch] = useState('');
    topics = topics.filter(topic => {
        if (topic?.name?.toUpperCase().includes(search.toUpperCase())) {
            return true;
        }
        return false;
    })

    async function handleDelete(topicId) {
        if (window.confirm('Are You Sure You Want To Delete This Topic!')) {
            try {
                await TopicModal.delete(topicId);
                window.alert('Deleted Successfully')
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }
        }
    }
    return (
        <main className="table-main">
            <header>
                <button type="button" onClick={() => tableAction('ADD')}>+ Add Topic</button>
                <div className="inputField">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} spellCheck="false" autoComplete="off" required />
                    <span>Search</span>
                </div>
            </header>
            <div className="tableContainer scrollbar">
                <table border="1">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th onClick={sortTopics} className="sortButton" id="name">TOPICS</th>
                            <th onClick={sortTopics} className="sortButton" id="questions">QUESTIONS</th>
                            <th onClick={sortTopics} className="sortButton" id="attend">ATT</th>
                            <th onClick={sortTopics} className="sortButton" id="correct">CRT</th>
                            <th onClick={sortTopics} className="sortButton" id="created">CREATED</th>
                            <th onClick={sortTopics} className="sortButton" id="modified">MODIFIED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {topics.map((topic, i) =>
                            <tr key={topic.id}>
                                <td>{i + 1}</td>
                                <td><NavLink to={`/topic/${topic.id}`}>{topic.name}</NavLink></td>
                                <td>{topic.questions}</td>
                                <td>{topic.attend}</td>
                                <td>{topic.correct}</td>
                                <td>{new Date(topic.created).toLocaleString()}</td>
                                <td>{new Date(topic.modified).toLocaleString()}</td>
                                <td>
                                    <button type="button" onClick={() => tableAction('EDIT', topic)}>Edit</button>
                                    <button type="button" onClick={() => handleDelete(topic.id)}>Delete</button>
                                    <button type="button"><NavLink to={`/test/${topic.id}`}>Start Test</NavLink></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
};