import * as types from 'actions/sns/actionTypes';

const initial = {
  isLoading: false,
  data: [],
  error: false,
}

export default function Sns(state = initial, action){
  switch(action.type){
    case types.SNS_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.SNS_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data.rows,
      };
    case types.SNS_RECV_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
}
