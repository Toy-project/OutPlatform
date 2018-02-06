import { combineReducers } from 'redux';

import cards from './card/';
import category from './category/';
import club from './club';
import portfolio from './portfolio';
import comment from './comment';

const reducers = combineReducers({
  cards, category, club, portfolio, comment
});

export default reducers;
