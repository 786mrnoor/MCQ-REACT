import QuestionContextProvider from '../../ContextProvider/QuestionContextProvider.js';
import QuizContextProvider from '../../ContextProvider/QuizContextProvider.js';
import TopicContextProvider from '../../ContextProvider/TopicContextProvider.js';
import Test from './Test.js';
import useTitle from '../../Hooks/useTitle.js';

export default function Index() {
    useTitle('Test');
    return (
        <TopicContextProvider>
            <QuestionContextProvider>
                <QuizContextProvider>
                    <Test />
                </QuizContextProvider>
            </QuestionContextProvider>
        </TopicContextProvider>
    )
};
