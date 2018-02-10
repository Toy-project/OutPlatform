import * as RegExp from 'helper/regExp';

export function isUserIdAvailable(value) {
  if(!RegExp.isUseridGood(value)) {
    return false;
  }
  return true;
}

export function isPasswordAvailable(value) {
  if(!RegExp.isPasswordGood(value)) {
    return false;
  }
  return true;
}

export function compareTo(val1, val2) {
  if(val1 !== val2) return false;
  return true;
}

export function isEmailAvailable(value) {
  if(!RegExp.isEmailGood(value)) {
    return false;
  }
  return true;
}

export function isPhoneAvailable(value) {
  if(!RegExp.isPhoneGood(value)) {
    return false;
  }
  return true;
}

export function requestAuth(value) {
  //인증 요청!

  return true;
}

export function responseAuth(value) {
  //인증 확인

  return true;
}

export function isNameAvailable(value) {
  if(!RegExp.isNameGood(value)) {
    return false;
  }
  return true;
}

export function isCopyrightAvailable(value) {
  if(!RegExp.isCopyrightGood(value)) {
    return false;
  }
  return true;
}
