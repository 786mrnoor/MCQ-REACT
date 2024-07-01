import { createContext, useContext, useState } from "react";
import useQuizStateHook from '../Hooks/useQuizState.js';

const QuizContext = createContext(null);
const QuizFunctionsContext = createContext(null);
const FilterContext = createContext(null);
const SetFilterContext = createContext(null);

export function useQuizState() {
    return useContext(QuizContext);
}

export function useQuizFunctions() {
    return useContext(QuizFunctionsContext);
}
export function useFilter() {
    return useContext(FilterContext);
}

export function useSetFilter() {
    return useContext(SetFilterContext);
}

export default function QuizContextProvider({ children }) {
    const [filter, setFilter] = useState({ created: '', attend: '', correct: '', questions: '' });
    const [quizState, quizFunctions] = useQuizStateHook();

    return (
        <QuizContext.Provider value={quizState}>
            <QuizFunctionsContext.Provider value={quizFunctions}>
                <SetFilterContext.Provider value={setFilter}>
                    <FilterContext.Provider value={filter}>
                        {children}
                    </FilterContext.Provider>
                </SetFilterContext.Provider>
            </QuizFunctionsContext.Provider>
        </QuizContext.Provider>
    )
};


// import { createContext, useCallback, useContext, useState } from "react";
// import { useQuestions } from '../ContextProvider/QuestionContextProvider.js';
// import getFilteredQuiz from "../helpers/filterQuiz.js";
// import useQuizStateHook from '../Hooks/useQuizState.js';

// const QuizContext = createContext(null);
// const QuizStartContext = createContext(null);
// const QuizOverContext = createContext(null);
// const QuizResetContext = createContext(null);
// const FilterContext = createContext(null);
// const SetFilterContext = createContext(null);

// export function useQuizState() {
//     return useContext(QuizContext);
// }

// export function useStartQuiz() {
//     return useContext(QuizStartContext);
// }

// export function useOverQuiz() {
//     return useContext(QuizOverContext);
// }

// export function useResetQuiz() {
//     return useContext(QuizResetContext);
// }

// export function useFilter() {
//     return useContext(FilterContext);
// }

// export function useSetFilter() {
//     return useContext(SetFilterContext);
// }

// const QUIZ_STATE = {
//     questions: null,
//     result: null,
//     isStarted: false,
//     isOver: false,
// }


// export default function QuizContextProvider({ children }) {
//     const questions = useQuestions();
//     const [filter, setFilter] = useState({ created: '', attend: '', correct: '', questions: '' });
//     const [quizState, setQuizState] = useState(QUIZ_STATE);

//     const startTest = useCallback(() => {
//         let quizQuestions = getFilteredQuiz(questions, filter);
//         if (!quizQuestions) return window.alert('There Is No Questions To Start Test');

//         setQuizState({
//             questions: quizQuestions,
//             result: [],
//             isStarted: true,
//             isOver: false,
//         });
//     }, [questions, filter]);

//     const testOver = useCallback(() => {
//         setQuizState(state => ({
//             ...state,
//             isStarted: false,
//             isOver: true,
//         }));
//     }, []);

//     const resetTest = useCallback(() => {
//         setQuizState(QUIZ_STATE);
//     }, []);

//     return (
//         <QuizContext.Provider value={quizState}>
//             <QuizStartContext.Provider value={startTest}>
//                 <QuizOverContext.Provider value={testOver}>
//                     <QuizResetContext.Provider value={resetTest}>
//                         <SetFilterContext.Provider value={setFilter}>
//                             <FilterContext.Provider value={filter}>
//                                 {children}
//                             </FilterContext.Provider>
//                         </SetFilterContext.Provider>
//                     </QuizResetContext.Provider>
//                 </QuizOverContext.Provider>
//             </QuizStartContext.Provider>
//         </QuizContext.Provider>
//     )
// };