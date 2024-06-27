import { useEffect, useRef, useState } from "react";
import {useLoader} from '../ContextProvider/LoaderContextProvider.js';
import TopicModal from "../models/Topic.js";

export default function useTopicEffect(user, topicId) {
    const [currentTopic, setCurrentTopic] = useState(null);
    const showLoader = useLoader();
    const Topic = useRef(new TopicModal(showLoader, user?.uid));

    useEffect(() => {
        let disconnect = null;
        function get() {
            disconnect = Topic.current.addValueListener(topicId, (topic) => {
                if (!topic.val()){
                    return setCurrentTopic(404);
                }
                setCurrentTopic(topic.val());
            });
        }
        if (user?.uid) {
            Topic.current.userId = user.uid;
            get();
        }

        return () => {
            if (disconnect) {
                disconnect();
            }
        }
    }, [user, topicId]);

    return currentTopic;
};
