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

export function fetchCategory() {
  return function(dispatch) {
    dispatch(requestData());
    return getAllCategory()
          .then((response) => {
						return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
};
