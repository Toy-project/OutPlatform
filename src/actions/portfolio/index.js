import * as types from './actionTypes';
import * as Career from 'services/portfolio/';

function requestData() {
  return {type: types.PORTFOLIO_REQ_DATA}
};

function receiveData(json){
  return{
		type: types.PORTFOLIO_RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.PORTFOLIO_RECV_ERROR,
		data: json
	}
};

export function fetchCareer(club_id) {
  return function(dispatch){
    dispatch(requestData());
    return Career
          .getAllClubByCareerId(club_id)
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
    return Career
          .createCareer(data)
          .then((response) => {
            return dispatch(fetchCareer(data.club_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchUpdateCareer(data) {
  return function(dispatch){
    dispatch(requestData());
    return Career
          .updateCareer(data)
          .then((response) => {
            return dispatch(fetchCareer(data.club_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchDeleteCareer(club_id, career_id) {
  return function(dispatch){
    dispatch(requestData());
    return Career
          .deleteCareer(career_id)
          .then((response) => {
            console.log(response);
            return dispatch(fetchCareer(club_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
