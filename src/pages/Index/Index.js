import TopicsContextProvider from "../../ContextProvider/TopicsContextProvider";
import useTitle from '../../Hooks/useTitle.js';
import Home from './Home.js';

export default function Index() {
    useTitle();
    return (
        <TopicsContextProvider>
            <Home />
        </TopicsContextProvider>
    )
};
