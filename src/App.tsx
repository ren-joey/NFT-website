import { useState } from 'react';
import FrontPage from 'src/views/FrontPage';
import LoadingPage from './views/LoadingPage';

import 'src/styles/reset.css';
import 'src/styles/index.scss';

const App = () => {
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingPageStatus, setLoadingPageStatus] = useState(true);

    return (
        <div className="App">
            {
                loadingStatus ? <FrontPage /> : ''
            }

            {
                loadingPageStatus ?
                    <LoadingPage
                        setLoadingStatus={setLoadingStatus}
                        setLoadingPageStatus={setLoadingPageStatus}
                    />
                    : ''
            }
        </div>
    );
};

export default App;
