import * as types from './actionTypes';
import { getAllTag } from 'services/tag/';

function requestData() {
	return {type: types.TAG_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.TAG_RECV_DATA,
		data: json,
	}
};

function receiveError(json) {
	return {
		type: types.TAG_RECV_ERROR,
		data: json,
	}
};

export function fetchTag(start, end) {
  return function(dispatch) {
    dispatch(requestData());
    return getAllTag(start, end)
          .then((response) => {
						return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
};
