import * as types from './actionTypes';

export function addCards(img, title, contents, rating) {
  return {
    type: types.ADD_CARDS,
    img,
    title,
    contents,
    rating
  }
};
