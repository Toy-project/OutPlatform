import * as types from './actionTypes';
import { getClubById } from 'services/club/';


function requestData() {
  return {type: types.CLUB_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.CLUB_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.CLUB_RECV_ERROR,
		data: json
	}
};

export function fetchClub(club_id, cate_id, tag_id) {
  return function(dispatch){
    dispatch(requestData());
    return getClubById(club_id, cate_id, tag_id)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
