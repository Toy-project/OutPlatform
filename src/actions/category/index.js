import * as types from './actionTypes';

export function addCategory(name) {
  return {
    type: types.ADD_CATEGORY,
    name,
  }
}

export function setTitle(title){
  return {
    type: types.SET_TITLE,
    title
  }
}
