import React from 'react';
import  { withRouter } from 'react-router-dom';

import { getMemberUserId, getMemberEmail, createMember } from 'services/member';

import { getValueId, inputValidator } from 'helper/registerHelper';

class RegisterMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "mem_userid" : '',
      "mem_pw" : '',
      "mem_email" : '',
      "mem_name" : '',
      "mem_phone" : '',
      "mem_mail_agree" : '',
      "verified_userid" : false,
      "verified_mem_email" : false,
      "mem_phone_btn_toggle" : false,
      "mem_phone_auth_toggle" : false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormError = this.showFormError.bind(this);

    //동일한 데이터 검색
    this.verifyDuplication = this.verifyDuplication.bind(this);
    this.verifyPhone = this.verifyPhone.bind(this);
  }

  handleChange(e) {
    inputValidator(e.target.id, 'mem');

    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  showFormError() {
    if(!document.querySelectorAll){
      alert('Error');
    }
    const inputs = document.querySelectorAll('.register-member-inner input:not([type="button"]):not([type="submit"])');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = inputValidator(input.id, 'mem');

      if(!isInputValid) {
        isFormValid = false;
      }
    });

    if(!this.state.verified_userid) isFormValid = false;
    if(!this.state.verified_mem_email) isFormValid = false;
    if(!this.state.mem_phone_btn_toggle) isFormValid = false;
    if(!this.state.mem_phone_auth_toggle) isFormValid = false;

    return isFormValid;
  }

  verifyDuplication(e) {
    const target = getValueId(e.target.id);
    const element = document.getElementById(target);
    const error = document.getElementById(`${target}_error`);
    const verified = inputValidator(target, 'mem');
    const isUserid = target === 'mem_userid' ? true : false;
    const isEmail = target === 'mem_email' ? true : false;

    if(verified && isUserid) {
      getMemberUserId(e.target.value)
        .then((response) => {
          if(response.data){
            element.className = '';
            error.innerHTML = '이미 등록된 아이디입니다.';
            error.className = 'warning-color';
          } else {
            element.className = '';
            error.innerHTML = '이용가능한 아이디입니다.';
            error.className = 'recommend-color';

            this.setState({
              ...this.state,
              verified_userid: !this.state.verified_userid,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if(verified && isEmail) {
      getMemberEmail(e.target.value)
        .then((response) => {
          if(response.data){
            element.className = '';
            error.innerHTML = '이미 등록된 이메일입니다.';
            error.className = 'warning-color';
          } else {
            element.className = '';
            error.innerHTML = '이용가능한 이메일입니다.';
            error.className = 'recommend-color';

            this.setState({
              ...this.state,
              verified_mem_email: !this.state.verified_mem_email,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  verifyPhone(e) {
    const target = getValueId(e.target.id);
    const element = document.getElementById(target);
    const error = document.getElementById('mem_phone_error');
    const verified = inputValidator(target, 'mem');
    const isPhone = target === 'mem_phone' ? true : false;
    const isPhoneAuth = target === 'mem_phone_auth' ? true : false;

    if(verified && isPhone){
      //인증
      this.setState({
        ...this.state,
        mem_phone_btn_toggle: !this.state.mem_phone_btn_toggle,
      });
    }

    if(verified && isPhoneAuth){
      //인증 확인
      this.setState({
        ...this.state,
        mem_phone_auth_toggle: !this.state.mem_phone_auth_toggle,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()) {
      //Data를 폼에서 가져옴
      const data = {
        "mem_userid" : this.state.mem_userid,
        "mem_pw" : this.state.mem_pw,
        "mem_email" : this.state.mem_email,
        "mem_name" : this.state.mem_name,
        "mem_phone" : this.state.mem_phone,
        "mem_mail_agree" : 1
      };

      //Post 요청(Member)
      createMember(data)
        .then((response) => {
          alert('회원가입완료!');
          this.props.history.push(`/`);
          window.location.reload();
        })
        .catch((err) => {
          alert('에러!');
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div className='register-member-inner'>
        <h3>간편 회원가입</h3>
        <p className='p'>
          회원가입시 외주대학교의 <span>이용약관</span> 및 <span>개인정보취급방침</span>을
          읽고 이해하였으며, 이에 동의하는 것으로 간주됩니다.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="input-register">
            <label htmlFor="mem_userid">아이디</label>
            <input type="text" id="mem_userid" onChange={this.handleChange} onBlur={this.verifyDuplication}/>
            <a id='mem_userid_error'>5자 이상 12자 이내로 지어주세요.</a>
          </div>
          <div className="input-register">
            <label htmlFor="mem_pw">비밀번호</label>
            <input type="password" id="mem_pw" onChange={this.handleChange} />
          </div>
          <div className="input-register">
            <label htmlFor="mem_pw_confirm">비밀번호 확인</label>
            <input type="password" id="mem_pw_confirm" onChange={this.handleChange}/>
            <a id='mem_pw_error'>영문,숫자,특수문자 포함 12자이내</a>
          </div>
          <div className="input-register">
            <label htmlFor="mem_email">이메일 주소</label>
            <input type="text" id="mem_email" onChange={this.handleChange} onBlur={this.verifyDuplication}/>
            <a id='mem_email_error'>이메일을 입력해주세요.</a>
          </div>
          <div className="input-register">
            <label htmlFor="mem_name">이름</label>
            <input type="text" id="mem_name" onChange={this.handleChange} onBlur={this.showButtonError} />
          </div>
          <div className="input-register">
            <label htmlFor="mem_phone">전화번호</label>
            <input type="text" id="mem_phone" onChange={this.handleChange}/>
            <input type="button" id="mem_phone_btn" value="인증번호 발송" onClick={this.verifyPhone}/>
          </div>
          <div className="input-register">
            <label htmlFor="mem_phone_auth">인증번호</label>
            <input type="text" id="mem_phone_auth" onChange={this.handleChange}/>
            <input type="button" id ="mem_phone_auth_btn" value="확인" className='member-phone-auth-btn' onClick={this.verifyPhone}/>
            <a id='mem_phone_error'>핸드폰 인증을 해주세요!</a>
          </div>
          <div className="submit-resgister">
            <input type="submit" value="무료 가입하기"/>
          </div>
        </form>
      </div>
    );
  }
}

RegisterMember.propTypes = {
};

export default withRouter(RegisterMember);
