import * as types from './actionTypes';
import { getSnsByClubId } from 'services/sns/';
import { fetchClub } from 'actions/club';

function requestData() {
	return {type: types.SNS_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.SNS_RECV_DATA,
		data: json,
	}
};

function receiveError(json) {
	return {
		type: types.SNS_RECV_ERROR,
		data: json,
	}
};

export function fetchSnsByClubId(club_id) {
  return function(dispatch) {
    dispatch(requestData());
    return getSnsByClubId(club_id)
          .then((response) => {
						return dispatch(fetchClub(club_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
};
