import React from 'react';
import ReactDOM from 'react-dom';
import Main from './layout/main';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/';

const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
