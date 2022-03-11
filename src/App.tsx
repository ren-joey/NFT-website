import { useState } from 'react';
import FrontPage from 'src/views/FrontPage';
// import Web3Component from './views/Web3Component';
import LoadingPage from './views/LoadingPage';

// import 'src/styles/reset.css';
import 'src/styles/index.scss';

const App = () => {
    const [loadingStatus, setLoadingStatus] = useState(false);

    return (
        <div className="App">
            {
                loadingStatus ? <FrontPage /> : ''
            }

            <LoadingPage setLoadingStatus={setLoadingStatus} />

            {/* <Web3Component /> */}
        </div>
    );
};

export default App;
