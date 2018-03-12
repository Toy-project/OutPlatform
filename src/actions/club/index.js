import * as types from './actionTypes';
import * as Club from 'services/club/';


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

export function fetchClub(club_id) {
  return function(dispatch){
    dispatch(requestData());
    return Club
          .getClubById(club_id)
          .then((response) => {
            // dispatch(receiveError(response.data));
            dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchUpdateClub(club_id, data) {
  return function(dispatch){
    dispatch(requestData());
    return Club
          .updateClub(club_id, data)
          .then((response) => {
            if(response.data) {
              console.log(data);
              dispatch(fetchClub(club_id));
              // dispatch(receiveError(response.data));
            }
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
