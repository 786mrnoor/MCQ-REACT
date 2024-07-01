import { useReducer } from "react";
import getFilteredQuiz from "../helpers/filterQuiz";
import { useMemo } from "react";

const QUIZ_STATE = {
    questions: null,
    result: null,
    isStarted: false,
    isOver: false,
}

export default function useQuizState() {
    const [quizState, dispatch] = useReducer(reducer, null, createInitialState);

    const quizFunctions = useMemo(() => {
        return ({
            start(questions, filter) {
                return dispatch({ type: 'START', payload: { questions, filter } });
            },
            over() {
                return dispatch({ type: 'OVER' });
            },
            reset() {
                dispatch({ type: 'RESET' });
            }
        });
    }, []);
    return [quizState, quizFunctions];
};

function reducer(state, action) {
    switch (action.type) {
        case 'START': {
            let quizQuestions = getFilteredQuiz(action.payload.questions, action.payload.filter);
            if (!quizQuestions) {
                window.alert('There Is No Questions To Start Test');
                return state;
            }
            return ({
                questions: quizQuestions,
                result: [],
                isStarted: true,
                isOver: false,
            });
        }

        case 'OVER': {
            return ({
                ...state,
                isStarted: false,
                isOver: true,
            })
        }

        case 'RESET': {
            return QUIZ_STATE;
        }
    }
}

function createInitialState() {
    return QUIZ_STATE;
}