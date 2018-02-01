import * as types from './actionTypes';

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
