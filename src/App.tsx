import React, { useState } from 'react';
// import { Transition } from 'react-transition-group';
import FrontPage from 'src/views/FrontPage';
// import Web3Component from './views/Web3Component';
import LoadingPage from './views/LoadingPage';

// import 'src/styles/reset.css';
import 'src/styles/index.scss';

// const duration = 500;

// const defaultStyle: React.CSSProperties = {
//     transition: `opacity ${duration}ms`,
//     opacity: 0
// };

// const transitionStyles = {
//     entering: { opacity: 0.5 },
//     entered: { opacity: 1 },
//     exiting: { opacity: 0.5 },
//     exited: { opacity: 0 }
// };

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

            {/* <Web3Component /> */}
        </div>
    );
};

export default App;
