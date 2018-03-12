import * as types from './actionTypes';
import * as Club from 'services/club';

function requestData() {
	return {type: types.CARD_REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.CARD_RECV_DATA,
		data: json
	}
};

function resetData(cate_id, byCateId) {
	return{
		type: types.CARD_RESET_DATA,
		byCateId: byCateId,
		cate_id: cate_id,
	}
};

function receiveError(json) {
	return {
		type: types.CARD_RECV_ERROR,
	}
};

export function fetchCards(start, end) {
  return function(dispatch) {
    dispatch(requestData());
    return Club
					.getClubAll(start, end)
          .then((response) => {
							return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchResetData(cate_id, byCateId) {
	return resetData(cate_id, byCateId);
}

export function fetchCardsByCateId(cate_id, start, end) {
	return function(dispatch) {
    dispatch(requestData());
    return Club
					.getClubCategory(cate_id, start, end)
          .then((response) => {
							return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
