import jwtDecode from 'jwt-decode';
import { tokenName } from './variables';

function checkTokenIsAvailable(token) {
  const decoded = jwtDecode(token);
  const current = Date.now();

  if(decoded.exp < (current.valueOf() / 1000)) {
    return false;
  }

  return true;
}

export function handleExpire(tokenName) {
  //해당 이름의 토큰이 있는지 확인
  const token = localStorage.getItem(tokenName);
  if(!token) {
    return false;
  }

  //토큰 유효성 검사
  if(!checkTokenIsAvailable(token)) {
    localStorage.removeItem(tokenName);
  }

  return true;
}

export function createToken(token) {
  localStorage.setItem(tokenName, token);
}

export function removeToken() {
  localStorage.removeItem(tokenName);
}

export function getCurrentToken() {
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
