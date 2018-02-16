import { combineReducers } from 'redux';

import cards from './card/';
import category from './category/';
import club from './club';
import portfolio from './portfolio';
import comment from './comment';
import tag from './tag';
import sns from './sns';
import member from './member';

const reducers = combineReducers({
  cards,
  category,
  club,
  portfolio,
  comment,
  tag,
  sns,
  member
});

export default reducers;
