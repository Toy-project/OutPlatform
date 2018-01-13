import * as types from '../../actions/card/actionTypes';

const initial = [
]

export default function Card(state = initial, action) {
  switch(action.type){
    case types.ADD_CARDS :
      return [
          ...state,
          {
            club_profile_photo: action.club_profile_photo,
            club_name: action.club_name,
            club_ex: action.club_ex,
            club_rating: action.club_rating,
          }
      ];
    default :
      return state;
  }
}
