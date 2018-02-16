import * as types from './actionTypes';
import * as Services from 'services/comment/';
import { commentListEnd } from 'helper/variables';

function requestData() {
  return {type: types.COMMENT_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.COMMENT_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.COMMENT_RECV_ERROR,
		data: json
	}
};

export function fetchComment(club_id, start, end){
  return function(dispatch){
    dispatch(requestData());
    return Services
          .getCommentById(club_id, start, end)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchCreateComment(data) {
  return function(dispatch){
    dispatch(requestData());
    return Services
          .createComment(data)
          .then((response) => {
            return dispatch(fetchComment(data.club_id, 0, commentListEnd));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
