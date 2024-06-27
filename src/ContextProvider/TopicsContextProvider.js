import { createContext, useContext, useState } from "react";
import useTopicsEffect from "../ModalEffects/Topics.js";

const TopicContext = createContext([]);
const TopicSortContext = createContext(null);
const TopicModalContext = createContext(null);

export function useTopics() {
    return useContext(TopicContext);
}

export function useTopicsModal() {
    return useContext(TopicModalContext);
}

export function useSortTopics() {
    return useContext(TopicSortContext);
}

export default function TopicsContextProvider({ children }) {
    const [currentSortColumn, setCurrentSortColumn] = useState('name');
    const [isAscending, setIsAscending] = useState(true);
    
    const [topics, Topic] = useTopicsEffect();

    topics.sort((a, b) => {
        const valueA = a[currentSortColumn];
        const valueB = b[currentSortColumn];
        if (valueA < valueB) return isAscending ? -1 : 1;
        if (valueA > valueB) return isAscending ? 1 : -1;
        return 0;
    });

    function handleSortTopics(e) {
        let column = e.target.id;
        if (currentSortColumn === column) {
            setIsAscending(!isAscending);
        } else {
            setCurrentSortColumn(column);
            setIsAscending(true);
        }
    }

    return (
        <TopicContext.Provider value={topics}>
            <TopicSortContext.Provider value={handleSortTopics}>
                <TopicModalContext.Provider value={Topic}>
                    {children}
                </TopicModalContext.Provider>
            </TopicSortContext.Provider>
        </TopicContext.Provider>
    )
};