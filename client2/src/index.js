import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './store/reducers';

import './index.scss';
import App from './App';
import AppNavigation from './components/appNavigation';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers);
console.log('UseFake', process.env.REACT_APP_USE_FAKE);
ReactDOM.render(
    <Provider store={store}>
        <AppNavigation/>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
