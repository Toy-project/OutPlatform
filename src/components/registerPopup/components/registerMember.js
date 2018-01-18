import React from 'react';

import { postMember } from 'services/register';

class RegisterMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      member_id: {
        value: undefined,
        error: false,
      },
      member_pw: {
        value: undefined,
        error: false,
      },
      member_pw_confirm: {
        value: undefined,
        error: false,
      },
      member_email: {
        value: undefined,
        error: false,
      },
      member_phone: {
        value: undefined,
        error: false,
      },
      member_phone_auth: {
        value: undefined,
        error: false,
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if(e.target.id === 'member_id'){
      let regExpError = false;
      if(!/^[a-zA-Z0-9]{5,12}$/.test(e.target.value)){
        regExpError = true;
      }
      this.setState({
        member_id : {
          value : e.target.value,
          error: regExpError,
        }
      });
    }

    if(e.target.id === 'member_pw'){
      let regExpError = false;
      if(!/^(?=.*[a-z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,12}$/.test(e.target.value)){
        regExpError = true;
      }
      this.setState({
        member_pw : {
          value : e.target.value,
          error: regExpError,
        }
      });
    }

    if(e.target.id === 'member_pw_confirm'){
      let confirmError = false;
      if(e.target.value !== this.state.member_pw.value){
        confirmError = true;
      }
      this.setState({
        member_pw_confirm : {
          value : e.target.value,
          error: confirmError,
        }
      });
    }

    if(e.target.id === 'member_email'){
      let regExpError = false;
      if(!/([\w-.]+)@([\w-.]+)(\.[\w-.]+)$/.test(e.target.value)){
        regExpError = true;
      }
      this.setState({
        member_email : {
          value : e.target.value,
          error: regExpError,
        }
      });
    }

    if(e.target.id === 'member_phone'){
      let regExpError = false;
      if(!/^\d{3}-\d{3,4}-\d{4}$/.test(e.target.value)){
        regExpError = true;
      }
      this.setState({
        member_phone : {
          value : e.target.value,
          error: regExpError,
        }
      });
    }

    if(e.target.id === 'member_phone_auth'){
      this.setState({
        member_phone_auth : {
          value : e.target.value,
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.member_id.value === undefined){
      this.setState({
        member_id : {
          error: true,
        }
      });
    }

    if(this.state.member_pw.value === undefined){
      this.setState({
        member_pw : {
          error: true,
        }
      });
    }

    if(this.state.member_pw_confirm.value !== this.state.member_pw.value ||
      this.state.member_pw_confirm.value === undefined){
      this.setState({
        member_pw_confirm : {
          error: true,
        }
      });
    }

    if(this.state.member_email.value === undefined){
      this.setState({
        member_email : {
          error: true,
        }
      });
    }

    if(this.state.member_phone.value === undefined){
      this.setState({
        member_phone : {
          error: true,
        }
      });
    }

    if(this.state.member_phone_auth.value === undefined){
      this.setState({
        member_phone_auth : {
          error: true,
        }
      });
    }

    if((this.state.member_id.value !== undefined & !this.state.member_id.error)
      & (this.state.member_pw.value !== undefined & !this.state.member_pw.error)
      & (this.state.member_pw_confirm.value !== undefined & !this.state.member_pw_confirm.error)
      & (this.state.member_email.value !== undefined & !this.state.member_email.error)
      & (this.state.member_phone.value !== undefined & !this.state.member_phone.error)
      & (this.state.member_phone_auth.value !== undefined & !this.state.member_phone_auth.error)){
        //Data를 폼에서 가져옴
        const data = {
          "mem_userid" : this.state.member_id.value,
          "mem_pw" : this.state.member_pw.value,
          "mem_email" : this.state.member_email.value,
        	"mem_name" : "test",
        	"mem_profile_photo": "test",
        	"mem_phone" : this.state.member_phone.value,
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
            <label htmlFor="member_id">아이디</label>
            <input type="text" id="member_id" onChange={this.handleChange} className={this.state.member_id.error ? 'error' : ''}/>
            <a className={this.state.member_id.error ? 'red' : ''}>5자 이상 12자 이내로 지어주세요.</a>
          </div>
          <div className="input-register member-pw">
            <label htmlFor="member_pw">비밀번호</label>
            <input type="password" id="member_pw" onChange={this.handleChange} className={this.state.member_pw.error ? 'error' : ''}/>
          </div>
          <div className="input-register member-pw_confirm">
            <label htmlFor="member_pw_confirm">비밀번호</label>
            <input type="password" id="member_pw_confirm" onChange={this.handleChange} className={this.state.member_pw_confirm.error ? 'error' : ''}/>
          <a className={this.state.member_pw.error ? 'red' : ''}>{this.state.member_pw_confirm.confirmError ? '비밀번호가 일치하지 않습니다' : '영문,숫자,특수문자 포함 12자이내'}</a>
          </div>
          <div className="input-register member-email">
            <label htmlFor="member_email">이메일</label>
            <input type="text" id="member_email" onChange={this.handleChange} className={this.state.member_email.error ? 'error' : ''}/>
          <a className={this.state.member_email.error ? 'red' : ''}>{this.state.member_email.regExpError ? '이메일 형식이 맞지 않습니다' : '등록 가능한 이메일입니다.'}</a>
          </div>
          <div className="input-register member-phone">
            <label htmlFor="member_phone">전화번호</label>
          <input type="text" id="member_phone" onChange={this.handleChange} className={this.state.member_phone.error ? 'error' : ''}/>
            <input type="button" value="인증번호 발송"/>
          </div>
          <div className="input-register">
            <label htmlFor="member_phone_auth">인증번호</label>
            <input type="text" id="member_phone_auth" onChange={this.handleChange} className={this.state.member_phone_auth.error ? 'error' : ''}/>
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
