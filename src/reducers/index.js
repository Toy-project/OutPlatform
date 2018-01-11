import { combineReducers } from 'redux';

import cards from './card/';
import category from './category/';

const reducers = combineReducers({
  cards, category
});

export default reducers;
