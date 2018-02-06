import * as types from './actionTypes';
import { getCommentById } from 'services/comment/';

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
    return getCommentById(club_id, start, end)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
