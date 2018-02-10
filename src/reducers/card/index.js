import * as types from 'actions/card/actionTypes';

const initial = {
  isLoading: false,
  error: false,
  hasMore: false,
  data: [],
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
          cate_id: data.cate_id,
          tag_id: data.tag_id,
        }];
      });
      return {
          ...state,
          isLoading: false,
          error: false,
          hasMore: hasMore,
          count: action.data.count,
          data: datas
      };
    case types.CARD_SORT_DATA :
      datas = [];
      state.data.map((item) => {
        if(parseInt(action.cate_id, 10) === item.cate_id){
          datas = [...datas, item];
        }
        return false;
      })
      return {
        ...state,
        isLoading: false,
        error: false,
        data: datas,
      };
    case types.CARD_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true
      }
    default :
      return state;
  }
}
