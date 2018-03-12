import * as LoginHelper from './loginHelper';

export function defenceAccessingWithoutToken(loggined) {
  if(!loggined) {
    return false;
  }

  return true;
}

export function defenceAccessingWithInvalidToken() {
  if(LoginHelper.isMember(LoginHelper.getCurrentTokenData() ? LoginHelper.getCurrentTokenData() : [])) {
    return false;
  }
  return true;
}
