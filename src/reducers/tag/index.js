import * as types from 'actions/tag/actionTypes';

const initial = {
  isLoading: false,
  data: [],
  error: false,
}

export default function Tag(state = initial, action){
  switch(action.type){
    case types.TAG_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.TAG_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data.rows,
      };
    case types.TAG_RECV_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}
