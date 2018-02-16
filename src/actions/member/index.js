import * as types from './actionTypes';
import * as Services from 'services/member/';

function requestData() {
  return {type: types.MEMBER_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.MEMBER_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.MEMBER_RECV_ERROR,
		data: json
	}
};

export function fetchMember(mem_id){
  return function(dispatch){
    dispatch(requestData());
    return Services
          .getMemberByUserId(mem_id)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchUpdateMember(mem_id, data) {
  return function(dispatch){
    dispatch(requestData());
    return Services
          .updateMember(mem_id, data)
          .then((response) => {
            console.log(response.data);
            return dispatch(fetchMember(mem_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
