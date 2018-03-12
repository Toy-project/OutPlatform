import { combineReducers } from 'redux';

import cards from './card/';
import category from './category/';
import club from './club';
import portfolio from './portfolio';
import comment from './comment';
import tag from './tag';
import sns from './sns';
import member from './member';
import login from './login';
import cart from './cart';
import search from './search';

const reducers = combineReducers({
  cards,
  category,
  club,
  portfolio,
  comment,
  tag,
  sns,
  member,
  login,
  cart,
  search
});

export default reducers;
