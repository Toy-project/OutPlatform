import * as types from '../../actions/category/actionTypes';

const initial = {
  cate_name: [],
  title: '추천 단체를 확인하세요',
}

export default function Category(state = initial, action){
  switch(action.type){
    case types.ADD_CATEGORY :
      return {
        ...state,
        cate_name: [...state.cate_name, action.cate_name],
      }
    case types.SET_TITLE:
      return {
        ...state,
        title: action.title,
      }
    default:
      return state;
  }
}
