import jwtDecode from 'jwt-decode';

function checkTokenIsAvailable(token) {
  const decoded = jwtDecode(token);
  const current = Date.now();

  if(decoded.exp < (current.valueOf() / 1000)) {
    return false;
  }

  return true;
}

export function handleExpire(val) {
  //해당 이름의 토큰이 있는지 확인
  const token = localStorage.getItem(val);
  if(!token) {
    return false;
  }

  //토큰 유효성 검사
  if(!checkTokenIsAvailable(token)) {
    localStorage.removeItem(val);
  }

  return true;
}
