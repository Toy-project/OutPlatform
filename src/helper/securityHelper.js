import * as LoginHelper from './loginHelper';

export function defenceAccessingWithoutToken() {
  if(LoginHelper.getCurrentToken() === false) {
    return false;
  }

  return true;
}

export function defenceAccessingWithInvalidToken(club_id) {
  if(LoginHelper.isMember(LoginHelper.getCurrentToken())) {
    return false;
  } else {
    if(LoginHelper.getCurrentToken().club_id !== parseInt(club_id,10)) {
      return false;
    }
  }
  return true;
}
