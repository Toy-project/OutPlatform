import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from 'router/';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/';

import { fetchCards } from 'actions/card';
import { fetchCategory } from 'actions/category';

const store = configureStore();

store.dispatch(fetchCards(0, 6));
store.dispatch(fetchCategory(0, 8));

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
