import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store';
import App from './App';

const root = document.getElementById('root');
const load = () => render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', load);
}

load();
