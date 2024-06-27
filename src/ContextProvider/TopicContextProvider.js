import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "./UserContextProvider";
import useTopicEffect from "../ModalEffects/Topic";

const TopicContext = createContext(null);

export function useTopic(){
    return useContext(TopicContext);
}

export default function TopicContextProvider({children}) {
    let { topicId } = useParams();
    const user = useGetUser();

    const currentTopic = useTopicEffect(user, topicId);

    return (
        <TopicContext.Provider value={currentTopic}>
            {children}
        </TopicContext.Provider>
    )
};
