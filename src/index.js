import React from 'react';
import ReactDOM from 'react-dom';
import Main from './layout/main';
import './scss/common.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
