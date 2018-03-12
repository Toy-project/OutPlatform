import * as types from './actionTypes';
import { getAllCategory } from 'services/category/';

function requestData() {
	return {type: types.CATE_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.CATE_RECV_DATA,
		data: json,
	}
};

function receiveError(json) {
	return {
		type: types.CATE_RECV_ERROR,
		data: json,
	}
};

export function fetchCategory(start, end) {
  return function(dispatch) {
    dispatch(requestData());
    return getAllCategory(start, end)
          .then((response) => {
						return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
};
