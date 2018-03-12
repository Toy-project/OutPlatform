import * as types from 'actions/member/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  data: {},
}

export default function Member(state = initial, action) {
  switch(action.type){
    case types.MEMBER_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.MEMBER_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data
      };
    case types.MEMBER_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
