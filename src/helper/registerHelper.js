import { isPhoneGood, isNameGood, isProfileGood, isUseridGood, isEmailGood, isPasswordGood } from 'helper/regExp';

export function getValueId(val) {
  if(val.indexOf("_btn") === -1){
    return val;
  }
  return val.substring(0, val.indexOf("_btn"));
}

export function autoHypenPhone(str){
  str = str.replace(/[^0-9]/g, '');
  var tmp = '';
  if( str.length < 4){
    return str;
  }else if(str.length < 7){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }else if(str.length < 11){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  }else{
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
}

export function varifiedPassword(pw1, pw2){
  return pw1 === pw2 ? true : false;
}

export function inputValidator(refId, type){
  const error = document.getElementById(`${refId}_error`);
  const element = document.getElementById(refId);

  //Common
  const isUserid = refId === `${type}_userid` ? true : false;
  const isPassword = refId === `${type}_pw` ? true : false;
  const isPasswordConfirm = refId === `${type}_pw_confirm` ? true : false;
  const password = document.getElementById(`${type}_pw`);
  const passwordConfirm = document.getElementById(`${type}_pw_confirm`);
  const isEmail = refId === `${type}_email` ? true : false;
  const isPhone = refId === `${type}_phone` ? true : false;

  //Different entry
  const isClubName = refId === 'club_name' ? true : false;
  const isExplaination = refId === 'club_copyright' ? true : false;

  //Empty Value 체크
  if(element.value === ''){
    element.className = 'error';
    return false;
  } else {
    element.className = '';
  }

  //아이디일 경우
  if (isUserid){
    if(!isUseridGood(element.value)){
      element.className = 'error';
      error.innerHTML = '올바르지 않는 아이디입니다. 5자 이상 12자 이내로 지어주세요';
      error.className = 'warning-color';
      return false;
    } else {
      element.className = '';
      error.innerHTML = '';
    }
  }

  //패스워드 검사
  if(isPassword){
    if(!isPasswordGood(password.value)){
      password.className = 'error';
      error.innerHTML = '올바르지 않은 패스워드입니다. 영문,숫자,특수문자 포함 12자이내'
      error.className = 'warning-color';
      return false;
    } else {
      password.className = '';
      error.innerHTML = '적합한 패스워드입니다.'
      error.className = 'recommend-color';
    }
  }

  if(isPasswordConfirm){
    const error = document.getElementById(`${type}_pw_error`);
    if(!isPasswordGood(passwordConfirm.value)){
      passwordConfirm.className = 'error';
      error.innerHTML = '올바르지 않은 패스워드입니다. 영문,숫자,특수문자 포함 12자이내'
      error.className = 'warning-color';
      return false;
    } else {
      passwordConfirm.className = '';
      error.innerHTML = '적합한 패스워드입니다.'
      error.className = 'recommend-color';
    }
  }

  if(password || passwordConfirm) {
    if(password.value !== '' && passwordConfirm.value !== ''){
      if(!varifiedPassword(password.value, passwordConfirm.value)){
        const error = document.getElementById(`${type}_pw_error`);
        passwordConfirm.className = 'error';
        password.className = 'error';
        error.innerHTML = '패스워드가 일치하지 않습니다.';
        error.className = 'warning-color';

        return false;
      } else {
        const error = document.getElementById(`${type}_pw_error`);
        passwordConfirm.className = '';
        password.className = '';
        error.innerHTML = '적합한 패스워드입니다.';
        error.className = 'recommend-color';
      }
    }
  }

  //이메일일 경우
  if (isEmail){
    if(!isEmailGood(element.value)){
      element.className = 'error';
      error.innerHTML = '올바르지 않는 이메일 형식입니다.';
      error.className = 'warning-color';
      return false;
    } else {
      element.className = '';
      error.innerHTML = '';
    }
  }

  //단체 이름
  if (isClubName){
    if(!isNameGood(element.value)){
      element.className = 'error';
      error.innerHTML = '2글자 이상, 10글자 미만으로 해주세요!';
      error.className = 'warning-color';
      return false;
    } else {
      element.className = '';
      error.innerHTML = '';
      error.className = 'recommend-color';
    }
  }

  //전화번호일 경우
  if(isPhone) {
    element.value = autoHypenPhone(element.value);
    if(!isPhoneGood(element.value)){
      element.className = 'error';
      error.innerHTML = '올바르지 않는 연락처입니다.';
      error.className = 'warning-color';
      return false;
    } else {
      element.className = '';
      error.innerHTML = '인증 버튼을 눌러주세요.';
      error.className='recommend-color';
    }
  }

  //단체 설명
  if(isExplaination) {
    if(!isProfileGood(element.value)){
      element.className = 'error';
      error.innerHTML = '30자 이내로 작성해주세요!';
      error.className = 'warning-color';
      return false;
    } else {
      element.className = '';
      error.innerHTML = '등록 가능한 소개입니다.';
      error.className = 'recommend-color';
    }
  }

  return true;
}
