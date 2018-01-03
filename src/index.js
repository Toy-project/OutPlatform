import React from 'react';
import ReactDOM from 'react-dom';
import Main from './layout/main';
import './scss/common.scss';
import Header from './components/header/header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Header />, document.getElementById('nav'));
ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
