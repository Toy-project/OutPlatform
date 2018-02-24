import jwtDecode from 'jwt-decode';
import { tokenName } from './variables';

// function checkTokenIsAvailable(token) {
//   const decoded = jwtDecode(token);
//   const current = Date.now();
//
//   if(decoded.exp < (current.valueOf() / 1000)) {
//     return false;
//   }
//
//   return true;
// }

export function handleExpire() {
  //해당 이름의 토큰이 있는지 확인
  const tokenData = getCurrentTokenData();
  const current = Date.now();

  if(!tokenData) {
    return false;
  }

  //토큰 유효성 검사
  if(tokenData.exp < parseInt((current.valueOf() / 1000), 10)) {
    console.log('expired');
    removeToken();
    return false;
  }

  return true;
}

export function createToken(token) {
  localStorage.setItem(tokenName,JSON.stringify(token));
}

export function removeToken() {
  localStorage.removeItem(tokenName);
}

export function getCurrentToken() {
  if(localStorage.getItem(tokenName) === null) {
    return false;
  }

  return JSON.parse(localStorage.getItem(tokenName));
}

export function getCurrentTokenData() {
  if(localStorage.getItem(tokenName) === null) {
    return false;
  }
  return jwtDecode(localStorage.getItem(tokenName));
}

//True: 일반회원, False: 단체회원
export function isMember(val) {
  if('mem_id' in val) {
    return true;
  }

  return false;
}
