import * as types from 'actions/club/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  data: {},
}

export default function Club(state = initial, action) {
  switch(action.type){
    case types.CLUB_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.CLUB_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data,
      };
    case types.CLUB_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
