import React from 'react';

import { postMember } from 'services/register';

import { isPhoneGood, isEmailGood, isPasswordGood, isUseridGood } from 'helper/regExp';

class RegisterMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "mem_userid" : '',
      "mem_pw" : '',
      "mem_email" : '',
      "mem_name" : '',
      "mem_profile_photo": '',
      "mem_phone" : '',
      "mem_mail_agree" : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormError = this.showFormError.bind(this);
  }

  handleChange(e) {
      this.setState({
        [e.target.id]: e.target.value,
      });

      this.showInputError(e.target.id);
  }

  showFormError() {
    const inputs = document.querySelectorAll('.register-member-inner input:not([type="button"]):not([type="submit"])');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = this.showInputError(input.id);

      if(!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refId) {
    const element = document.getElementById(refId);
    const isUserid = refId === 'mem_userid' ? true : false;
    const isPassword = refId === 'mem_pw' ? true : false;
    const isPasswordConfirm = refId === 'mem_pw_confirm' ? true : false;
    const isEmail = refId === 'mem_email' ? true : false;
    const isPhone = refId === 'mem_phone' ? true : false;
    const error = document.getElementById(`${refId}_error`);

    //패스워드 검사
    if(isPassword){
      if(!isPasswordGood(element.value)){
        element.className = 'error';
        error.innerHTML = '올바르지 않은 패스워드입니다. 영문,숫자,특수문자 포함 12자이내'
        error.className = 'warning-color';
        return false;
      } else {
        error.innerHTML = '사용가능합니다'
        error.className = 'recommend-color';
        element.className = '';
      }
    }

    if(isPasswordConfirm){
      const error = document.getElementById('mem_pw_error');
      if(!isPasswordGood(document.getElementById('mem_pw').value)){
        error.innerHTML = '올바르지 않은 패스워드입니다. 영문,숫자,특수문자 포함 12자이내'
        error.className = 'warning-color';
      } else if(element.value !== document.getElementById('member_pw').value){
        element.className = 'error';
        error.innerHTML = '비밀번호가 다릅니다.';
        error.className = 'warning-color';
      } else {
        element.className = '';
        error.innerHTML = '사용가능합니다';
        error.className = 'recommend-color';
      }
    }

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
        error.innerHTML = '사용가능합니다';
        error.className = 'recommend-color';
        element.className = '';
      }
    }

    //전화번호일 경우
    if (isPhone){
      if(!isPhoneGood(element.value)){
        element.className = 'error';
        return false;
      } else {
        element.className = '';
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
        error.innerHTML = '등록 가능한 이메일입니다.';
        error.className = 'recommend-color';
      }
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()) {
      //Data를 폼에서 가져옴
      const data = {
        "mem_userid" : this.state.mem_userid,
        "mem_pw" : this.state.mem_pw,
        "mem_email" : this.state.mem_email,
        "mem_name" : "test",
        "mem_profile_photo": "test",
        "mem_phone" : this.state.mem_phone,
        "mem_mail_agree" : 1
      };

      //Post 요청(Member)
      const res = postMember(data);

      //True : 성공 , False: Error
      if(res){
        window.location.reload();
      }
    }
  }

  render() {
    return (
      <div className='register-member-inner'>
        <h3>간편 회원가입</h3>
        <p>
          회원가입시 외주대학교의 <span>이용약관</span> 및 <span>개인정보취급방침</span>을
          읽고 이해하였으며, 이에 동의하는 것으로 간주됩니다.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="input-register member-id">
            <label htmlFor="mem_userid">아이디</label>
            <input type="text" id="mem_userid" onChange={this.handleChange} />
            <a id='mem_userid_error'>5자 이상 12자 이내로 지어주세요.</a>
          </div>
          <div className="input-register member-pw">
            <label htmlFor="mem_pw">비밀번호</label>
            <input type="password" id="mem_pw" onChange={this.handleChange} />
          </div>
          <div className="input-register member-pw_confirm">
            <label htmlFor="mem_pw_confirm">비밀번호</label>
            <input type="password" id="mem_pw_confirm" onChange={this.handleChange}/>
            <a id='mem_pw_error'>영문,숫자,특수문자 포함 12자이내</a>
          </div>
          <div className="input-register member-email">
            <label htmlFor="mem_email">이메일</label>
            <input type="text" id="mem_email" onChange={this.handleChange}/>
            <a id='mem_email_error'>이메일을 입력해주세요.</a>
          </div>
          <div className="input-register member-phone">
            <label htmlFor="mem_phone">전화번호</label>
            <input type="text" id="mem_phone" onChange={this.handleChange}/>
            <input type="button" value="인증번호 발송"/>
          </div>
          <div className="input-register">
            <label htmlFor="mem_phone_auth">인증번호</label>
            <input type="text" id="mem_phone_auth" onChange={this.handleChange}/>
            <input type="button" value="확인" className='member-phone-auth-btn' />
          </div>
          <div className="input-register">
            <input type="submit" value="무료 가입하기"/>
          </div>
        </form>
      </div>
    );
  }
}

RegisterMember.propTypes = {
};

export default RegisterMember;
