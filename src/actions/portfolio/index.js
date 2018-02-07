import * as types from './actionTypes';
import { getAllClubByCareerId, createCareer, updateCareer } from 'services/portfolio/';

function requestData() {
  return {type: types.PORTFOLIO_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.PORTFOLIO_RECV_DATA,
		data: json
	}
};

function createData(json){
  return {
    type: types.PORTFOLIO_POST_DATA,
    data: json,
  }
}

function updateData(json){
  return {
    type: types.PORTFOLIO_PUT_DATA,
    data: json,
  }
}

function receiveError(json) {
	return {
		type: types.PORTFOLIO_RECV_ERROR,
		data: json
	}
};

export function fetchCareer(club_id, start, end) {
  return function(dispatch){
    dispatch(requestData());
    return getAllClubByCareerId(club_id, start, end)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchCreateCareer(data) {
  return function(dispatch){
    dispatch(requestData());
    return createCareer(data)
          .then((response) => {
            return dispatch(createData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchUpdateCareer(data) {
  return function(dispatch){
    dispatch(requestData());
    return updateCareer(data)
          .then((response) => {
            return dispatch(updateData(data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
