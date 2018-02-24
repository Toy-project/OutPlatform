import React from 'react';
import ReactDOM from 'react-dom';


import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from 'router/';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/';

import { fetchCards } from 'actions/card';
import { fetchCategory } from 'actions/category';
import { fetchTag } from 'actions/tag';

import { handleExpire } from 'helper/loginHelper';
import { cardListEnd } from 'helper/variables';

const store = configureStore();

// //Check token expire date

store.dispatch(fetchCards(0, cardListEnd));
store.dispatch(fetchCategory(0, 8));
store.dispatch(fetchTag(0, 10));

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
