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
      let datas = [...state.data];

      action.data.forEach((data) => {
        datas =  [...datas, {
          club_id: data.club_id,
          club_profile_photo: data.club_profile_photo,
          club_name: data.club_name,
          club_ex: data.club_ex,
          club_rating: data.club_rating,
        }];
      });

      return {
          ...state,
          isLoading: false,
          error: false,
          data: datas,
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
