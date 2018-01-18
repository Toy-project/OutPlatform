import * as types from './actionTypes';
import { getClubLists } from 'services/card/';

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

export function fetchCards(paginationStart, paginationCount) {
  return function(dispatch) {
    dispatch(requestData());
    return getClubLists(paginationStart, paginationCount)
          .then((response) => {
						response.data.map((item, key) => {
							return dispatch(receiveData(item));
						})
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
