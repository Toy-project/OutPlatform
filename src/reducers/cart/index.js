import * as types from 'actions/cart/actionTypes';
import { cartListEnd } from 'helper/variables';

const initial = {
  isLoading: false,
  error: false,
  data: [],
  count: 0,
  hasMore: false,
  start: 0,
}

export default function Cart(state = initial, action) {
  switch(action.type){
    case types.CART_REQ_DATA :
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case types.CART_RECV_DATA :
      let datas = [];
      let hasMore = false;

      if(action.data.rows.length !== 0){
        hasMore = true;
      }

      action.data.rows.forEach((data) => {
        datas =  [...datas, {
          cart_id: data.cart_id,
          club_photo: data.club.club_photo,
          club_name: data.club.club_name,
          club_copyright: data.club.club_copyright,
          club_rating: data.club.club_rating,
          club_id: data.club_id,
        }];
      });

      return {
        ...state,
        count: action.data.count,
        data : datas,
        hasMore: hasMore,
        start: state.start + cartListEnd,
        isLoading: false,
        error: false,
      };

    case types.CART_REPEAT_RECV_DATA :
      datas = [...state.data];
      hasMore = false;

      if(action.data.rows.length !== 0){
        hasMore = true;
      }

      action.data.rows.forEach((data) => {
        datas =  [...datas, {
          cart_id: data.cart_id,
          club_photo: data.club.club_photo,
          club_name: data.club.club_name,
          club_copyright: data.club.club_copyright,
          club_rating: data.club.club_rating,
          club_id: data.club_id,
        }];
      });

      return {
        ...state,
        count: action.data.count,
        data : datas,
        hasMore: hasMore,
        start: state.start + cartListEnd,
        isLoading: false,
        error: false,
      };
    case types.CART_REMOVE_DATA :
      datas = [];

      state.data.forEach((data) => {
        if(data.cart_id === action.cart_id) {
          return false;
        }

        datas = [...datas, data];
      });


      return {
        ...state,
        count: state.count -1,
        data : datas,
        isLoading: false
      };

    case types.CART_RECV_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default :
      return state;
  }
}
