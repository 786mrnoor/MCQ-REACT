import QuestionsContextProvider from '../../ContextProvider/QuestionContextProvider.js';
import Topic from './Topic.js';
import TopicContextProvider from '../../ContextProvider/TopicContextProvider.js';
import useTitle from '../../Hooks/useTitle.js';

export default function Index() {
    useTitle('Topic');

    return (
        <TopicContextProvider>
            <QuestionsContextProvider>
                <Topic />
            </QuestionsContextProvider>
        </TopicContextProvider>
    )
};
