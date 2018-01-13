import * as types from './actionTypes';

export function addCategory(cate_name) {
  return {
    type: types.ADD_CATEGORY,
    cate_name,
  }
}

export function setTitle(title){
  return {
    type: types.SET_TITLE,
    title
  }
}
