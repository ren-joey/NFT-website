import { useEffect, useState } from 'react';
import FrontPage from 'src/views/FrontPage';
import LoadingPage from './views/LoadingPage';
import loader from "src/functions/loader";

import 'src/styles/reset.css';
import 'src/styles/index.scss';

const App = () => {
    const [frontPageStatus, setFrontPageStatus] = useState(false);
    const [loadingPageStatus, setLoadingPageStatus] = useState(true);

    return (
        <div className="App">
            {
                frontPageStatus ? <FrontPage /> : ''
            }

            {
                loadingPageStatus ?
                    <LoadingPage
                        setFrontPageStatus={setFrontPageStatus}
                        setLoadingPageStatus={setLoadingPageStatus}
                    />
                    : ''
            }
        </div>
    );
};

export default App;
