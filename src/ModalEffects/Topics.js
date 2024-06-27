import { useEffect, useReducer, useRef } from "react";
import {useLoader} from '../ContextProvider/LoaderContextProvider.js';
import TopicModal from "../models/Topic.js";
import { useGetUser } from "../ContextProvider/UserContextProvider.js";

export default function useTopicsEffect() {
    const [topics, dispatch] = useReducer(topicReducer, null, createInitialState);
    const user = useGetUser();
    const showLoader = useLoader();
    const Topic = useRef(new TopicModal(showLoader, user?.uid));

    useEffect(() => {
        let disconnect1 = null;
        let disconnect2 = null;
        let disconnect3 = null;
        function get() {
            disconnect1 = Topic.current.addChildListener('ADDED', (topic) => {
                dispatch({ type: 'ADD', payload: topic.val() });
            });
            disconnect2 = Topic.current.addChildListener('CHANGED', (topic) => {
                dispatch({ type: 'UPDATE', payload: topic.val() });
            });
            disconnect3 = Topic.current.addChildListener('REMOVED', (topic) => {
                dispatch({ type: 'DELETE', payload: topic.val().id });
            });
        }
        if (user?.uid) {
            Topic.current.userId = user.uid;
            get();
        }
        return () => {
            if (disconnect1) {
                disconnect1();
                disconnect2();
                disconnect3();
            }
        }
    }, [user]);

    return [topics, Topic.current];
};

function topicReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "ADD":
            return [...state, action.payload]
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