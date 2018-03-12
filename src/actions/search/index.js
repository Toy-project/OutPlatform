import * as types from './actionTypes';
import * as Search from 'services/search';
import { searchListEnd } from 'helper/variables';

function requestData() {
  return {type: types.SEARCH_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.SEARCH_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.SEARCH_RECV_ERROR,
		data: json
	}
};

export function fetchSearch(keyword, start){
  return function(dispatch){
    dispatch(requestData());
    return Search
          .getClubByKeyword(keyword, start)
          .then((response) => {
            dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
