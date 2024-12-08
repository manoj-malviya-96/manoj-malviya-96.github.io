import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/primereact.css';
import './index.css';
import Tailwind from "primereact/passthrough/tailwind";
import {twMerge} from "tailwind-merge";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PrimeReactProvider value={{
            ripple: true,
            unstyled: true,
            pt: Tailwind,
            ptOptions: {mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge}
        }}>
            <App/>
        </PrimeReactProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
