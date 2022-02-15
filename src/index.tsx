import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App';
import reportWebVitals from 'src/reportWebVitals';
import gaParser from './functions/gaParser';
import { clearAllParameter, getParameterByName } from './utils';

const origin = getParameterByName('origin');
const redirect = getParameterByName('redirect');
window.history.replaceState({}, document.title, clearAllParameter());
gaParser(origin, redirect);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
