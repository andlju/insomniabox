import 'array-flat-polyfill';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store';
import App from './App';

const root = document.getElementById('root');

const load = () => render(
  (
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', load);
}

load();
