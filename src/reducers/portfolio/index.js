import * as types from 'actions/portfolio/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  data: [],
}

export default function Portfolio(state = initial, action) {
  switch(action.type){
    case types.PORTFOLIO_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    case types.PORTFOLIO_RECV_DATA :
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.data.rows,
      }
    case types.PORTFOLIO_POST_DATA :
        return {
          ...state,
          isLoading: false,
          error: false,
          data: [...state.data, action.data],
        }
    case types.PORTFOLIO_PUT_DATA :
        console.log(action.data);
        const renewing = state.data.map((data) => {
          if(data.career_id === action.data.career_id){
            return action.data;
          }
          return data;
        });
        return {
          ...state,
          isLoading: false,
          error: false,
          data: renewing,
        }
    case types.PORTFOLIO_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
