import * as types from './actionTypes';
import * as Services from 'services/auth/';
import * as History from 'helper/history';

function request() {
  return {
    type: types.LOGIN_REQ,
  }
};

function success(token){
  return{
		type: types.LOGIN_SUCCESS,
		token: token
	}
};

function error(err) {
	return {
		type: types.LOGIN_ERROR,
		data: err
	}
};

function logout() {
  return {
    type: types.LOGIN_LOGOUT,
  }
}

export function tryLoggingIn(userid, pw, type){
  return function(dispatch){
    dispatch(request());
    if(type === 'member') {
      return Services
            .memberLogin(userid, pw)
            .then((response) => {
              dispatch(success(response.data));
              History.history.push('/');
            })
            .catch((err) => {
              dispatch(error(err.data));
            });
    } else if(type === 'club') {
      return Services
            .clubLogin(userid, pw)
            .then((response) => {
              dispatch(success(response.data));
              window.location.reload();
            })
            .catch((err) => {
              dispatch(error(err.data));
            });
    } else {
      //To do
      dispatch(error('error'));
    }
  }
}

export function loggingOut() {
  return function(dispatch){
    dispatch(logout());
    window.location.reload();
  }
}
