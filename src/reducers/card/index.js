import * as types from 'actions/card/actionTypes';
import { cardListEnd } from 'helper/variables';
const initial = {
  isLoading: false,
  error: false,
  start: 0,
  data: [],
  hasMore: false,
  byCateId: false,
}

export default function Card(state = initial, action) {
  switch(action.type){
    case types.CARD_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case types.CARD_RECV_DATA :
      let datas = [...state.data];
      let hasMore = false;

      if(action.data.rows.length !== 0){
        hasMore = true;
      }

      action.data.rows.forEach((data) => {
        datas =  [...datas, {
          club_id: data.club_id,
          club_photo: data.club_photo,
          club_name: data.club_name,
          club_copyright: data.club_copyright,
          club_rating: data.club_rating,
        }];
      });

      return {
          ...state,
          isLoading: false,
          error: false,
          count: action.data.count,
          hasMore: hasMore,
          data: datas,
          start: state.start + cardListEnd,
      };
    case types.CARD_RESET_DATA :
      const byCateId = action.byCateId;

      return {
        ...state,
        byCateId: byCateId,
        cate_id: action.cate_id,
        data: [],
        hasMore: false,
        start: 0,
      }
    case types.CARD_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    default :
      return state;
  }
}
