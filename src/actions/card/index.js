import * as types from './actionTypes';

export function addCards(club_profile_photo, club_name, club_ex, club_rating) {
  return {
    type: types.ADD_CARDS,
    club_profile_photo,
    club_name,
    club_ex,
    club_rating
  }
};
