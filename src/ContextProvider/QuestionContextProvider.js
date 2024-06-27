import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTopic } from "./TopicContextProvider.js";
import useQuestionEffect from '../ModalEffects/Question.js';

const QuestionContext = createContext([]);
const QuestionModelContext = createContext(null);

export function useQuestions() {
    return useContext(QuestionContext);
}

export function useQuestionModel() {
    return useContext(QuestionModelContext);
}

export default function QuestionContextProvider({ children }) {
    const navigate = useNavigate();
    const currentTopic = useTopic();
    const [questions, Question] = useQuestionEffect(currentTopic);

    //if the topic is not exists
    useEffect(() => {
        if (currentTopic === 404) {
            navigate('/');
        }
    }, [currentTopic, navigate]);
    return (
        <QuestionContext.Provider value={questions}>
            <QuestionModelContext.Provider value={Question}>
                {children}
            </QuestionModelContext.Provider>
        </QuestionContext.Provider>
    )
};
