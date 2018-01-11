import * as types from '../../actions/category/actionTypes';

const initial = {
  name: [
    '디자인', 'IT/프로그래밍', '컨텐츠제작', '마케팅', '컨설팅', '통/번역', '문서작성', '레슨',
  ],
  title: '추천 단체를 확인하세요',
}

export default function Category(state = initial, action){
  switch(action.type){
    case types.ADD_CATEGORY :
      return {
        ...state,
        name: [state.name, action.name],
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
