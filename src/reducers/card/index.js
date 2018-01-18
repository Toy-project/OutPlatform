import * as types from 'actions/card/actionTypes';

const initial = {
  isLoading: false,
  data: [],
  error: false,
}

export default function Card(state = initial, action) {
  switch(action.type){
    case types.CARD_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case types.CARD_RECV_DATA :
      return {
          ...state,
          isLoading: false,
          error: false,
          data: [...state.data, {
            club_profile_photo: action.data.club_profile_photo,
            club_name: action.data.club_name,
            club_ex: action.data.club_ex,
            club_rating: action.data.club_rating,
          }],
      };
    case types.CARD_RECV_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default :
      return state;
  }
}
