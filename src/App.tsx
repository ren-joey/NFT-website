import { useState } from 'react';
import FrontPage from 'src/views/FrontPage';
import LoadingPage from './views/LoadingPage';

import 'src/styles/reset.css';
import 'src/styles/index.scss';

const App = () => {
    const [loadingStatus, setLoadingStatus] = useState(false);

    return (
        <div className="App">
            {
                loadingStatus ? <FrontPage /> : ''
            }

            <LoadingPage setLoadingStatus={setLoadingStatus} />
        </div>
    );
};

export default App;
