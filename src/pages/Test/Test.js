import './test.css';
import './QuizBox.css';
import FilterForm from './FilterForm';
import Table from './Table';
import QuizBox from './QuizBox';
import { useQuizState } from '../../ContextProvider/QuizContextProvider';

export default function Test() {
    const { isStarted } = useQuizState();

    return (
        <div className="test-page">
            <FilterForm />
            <Table />
            {isStarted && <QuizBox />}
        </div>
    )
};
