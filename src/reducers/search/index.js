import * as types from 'actions/search/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  count: -1,
  data: [],
}

export default function Search(state = initial, action) {
  switch(action.type){
    case types.SEARCH_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    case types.SEARCH_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        count: action.data.count,
        data: action.data.rows,
      }
    case types.SEARCH_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
