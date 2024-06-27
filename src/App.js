import { RouterProvider } from 'react-router-dom';
import OnlineContextProvider from './ContextProvider/OnlineContextProvider.js';
import LoaderContextProvider from './ContextProvider/LoaderContextProvider.js';
import UserContextProvider from './ContextProvider/UserContextProvider.js';
import router from './router.js';

function App() {
  return (
    <OnlineContextProvider>
      <LoaderContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </LoaderContextProvider>
    </OnlineContextProvider>
  );
}

export default App;
