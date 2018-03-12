import * as types from 'actions/comment/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  data: [],
}

export default function Comment(state = initial, action) {
  switch(action.type){
    case types.COMMENT_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    case types.COMMENT_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data,
      }
    case types.COMMENT_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
