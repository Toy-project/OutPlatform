export function isPhoneGood(val) {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(val);
}

export function isEmailGood(val) {
  return /([\w-.]+)@([\w-.]+)(\.[\w-.]+)$/.test(val);
}

export function isPasswordGood(val) {
  return /^(?=.*[a-z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,12}$/.test(val);
}

export function isUseridGood(val) {
  return /^[a-zA-Z0-9]{5,12}$/.test(val);
}

export function isUsernameGood(val) {
  return /^[가-힣a-zA-Z\s]{5,12}$/.test(val);
}

export function isNameGood(val) {
  return /^[가-힣a-zA-Z\s]{5,10}$/.test(val);
}

export function isCopyrightGood(val) {
  return /^[가-힣\w\W\s]{2,30}$/.test(val);
}
