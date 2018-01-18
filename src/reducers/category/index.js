import * as types from 'actions/category/actionTypes';

const initial = {
  isLoading: false,
  cate_name: [],
  title: '추천 단체를 확인하세요',
  error: false,
}

export default function Category(state = initial, action){
  switch(action.type){
    case types.CATE_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.CATE_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        cate_name: [...state.cate_name, action.data],
      };
    case types.CATE_RECV_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}
