import { useGetUser } from "../ContextProvider/UserContextProvider";
import QuestionModel from "../models/Question";
import { useEffect, useReducer, useRef } from "react";
import {useLoader} from '../ContextProvider/LoaderContextProvider.js';
import { useParams } from "react-router-dom";

export default function useQuestionEffect(currentTopic) {
    let { topicId } = useParams();
    const [questions, dispatch] = useReducer(questionReducer, null, createInitialState);

    const user = useGetUser();
    const showLoader = useLoader();
    const Question = useRef(new QuestionModel(showLoader, user?.uid, topicId));

    useEffect(() => {
        let disconnect1 = null;
        let disconnect2 = null;
        let disconnect3 = null;

        function listener() {
            disconnect1 = Question.current.addChildListener('ADDED', (topic) => {
                dispatch({ type: 'ADD', payload: topic.val() });
            });
            disconnect2 = Question.current.addChildListener('CHANGED', (topic) => {
                dispatch({ type: 'UPDATE', payload: topic.val() });
            });
            disconnect3 = Question.current.addChildListener('REMOVED', (topic) => {
                dispatch({ type: 'DELETE', payload: topic.val().id });
            });
        }
        if (currentTopic?.id) {
            Question.current.userId = user?.uid;
            listener();
        }

        return () => {
            if (disconnect1) {
                disconnect1();
                disconnect2();
                disconnect3();
            }
        }
    }, [currentTopic?.id, user]);

    return [questions, Question.current];
};


function questionReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "ADD":
            return [...state, action.payload];
        case "UPDATE":
            let id = action.payload.id;
            return state.map(topic => {
                if (topic.id === id) return action.payload;
                return topic;
            })
        case "DELETE":
            let topicId = action.payload;
            return state.filter(topic => topic.id !== topicId);
        default:
            return state;
    }
}

function createInitialState() {
    return [];
}