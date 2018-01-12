import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'babel-polyfill';
import registerServiceWorker from './registerServiceWorker';

import './css/main.css';
import 'materialize-css';

import App from './components/app';

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.querySelector('.app'));
registerServiceWorker();
