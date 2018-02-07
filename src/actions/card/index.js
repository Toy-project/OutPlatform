import * as types from './actionTypes';
import { getClubAll } from 'services/club';

function requestData() {
	return {type: types.CARD_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.CARD_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.CARD_RECV_ERROR,
		data: json
	}
};

function sortCardsByCateId(cate_id) {
	return {
		type: types.CARD_SORT_DATA,
		cate_id : cate_id,
	}
}

export function fetchCards(start, end) {
  return function(dispatch) {
    dispatch(requestData());
    return getClubAll(start, end)
          .then((response) => {
							return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchSortCardsByCateId(cate_id) {
	return function(dispatch) {
		return dispatch(sortCardsByCateId(cate_id));
	}
}
