import * as types from './actionTypes';
import { getPortfolioById } from 'services/portfolio/';

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

export function fetchPortfolio(club_id) {
  return function(dispatch){
    dispatch(requestData());
    return getPortfolioById(club_id)
          .then((response) => {
            return dispatch(receiveData(response.data));
          })
          .catch((err) => {
            dispatch(receiveError(err.data));
          });
  }
}
