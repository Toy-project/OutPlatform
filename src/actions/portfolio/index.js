import * as types from './actionTypes';
import * as Career from 'services/portfolio/';

import * as Club from 'actions/club';

function requestData() {
  return {type: types.PORTFOLIO_REQ_DATA}
};

// function receiveData(json){
//   return{
// 		type: types.PORTFOLIO_RECV_DATA,
// 		data: json
// 	}
// };

function receiveError(json) {
	return {
		type: types.PORTFOLIO_RECV_ERROR,
		data: json
	}
};

// export function fetchCareer(club_id) {
//   return function(dispatch){
//     dispatch(requestData());
//     return Career
//           .getAllClubByCareerId(club_id)
//           .then((response) => {
//             return dispatch(receiveData(response.data));
//           })
//           .catch((err) => {
//             dispatch(receiveError(err.data));
//           });
//   }
// }

export function fetchCreateCareer(data) {
  return function(dispatch){
    dispatch(requestData());
    return Career
          .createCareer(data)
          .then((response) => {
            return dispatch(Club.fetchClub(data.get('club_id')));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}

export function fetchUpdateCareer(career_id, data) {
  return function(dispatch){
    dispatch(requestData());
    return Career
          .updateCareer(career_id, data)
          .then((response) => {
            return dispatch(Club.fetchClub(data.get('club_id')));
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
            return dispatch(Club.fetchClub(club_id));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
