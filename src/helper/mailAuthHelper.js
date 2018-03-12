//setter
export function setMailAuth(auth) {
  if(localStorage.getItem('mailAuth')) {
    localStorage.removeItem('mailAuth');
  }
  localStorage.setItem('mailAuth', auth);
}

//check auth
export function checkMailAuth(auth) {
  return auth === localStorage.getItem('mailAuth') ? true : false;
}

//remove auth
export function removeMailAuth() {
  if(localStorage.getItem('mailAuth')) {
    localStorage.removeItem('mailAuth');
  }
}

//getter
export function getMailAuth() {
  if(localStorage.getItem('mailAuth')) {
    return localStorage.getItem('mailAuth');
  }
}
