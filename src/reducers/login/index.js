import * as types from 'actions/login/actionTypes';
import * as LoginHelper from 'helper/loginHelper';

const initial = {
  isLoading: false,
  error: false,
  loggined : LoginHelper.getCurrentToken() ? true : false,
}

console.log(LoginHelper.getCurrentToken());

export default function Login(state = initial, action) {
  switch(action.type){
    case types.LOGIN_REQ :
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    case types.LOGIN_SUCCESS :
      if(LoginHelper.getCurrentToken()) { // 토큰이 있으면 제거
        LoginHelper.removeToken();
      }
      LoginHelper.createToken(action.token); //토큰 생성

      return {
        ...state,
        isLoading: false,
        error: false,
        loggined: true,
      }
    case types.LOGIN_ERROR :
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    case types.LOGIN_LOGOUT :
      //토큰 삭제
      LoginHelper.removeToken();
      return {
        ...state,
        loggined: false,
      }
    default :
      return state;
  }
}
