import React from 'react';
import  { withRouter } from 'react-router-dom';
import { CSSTransition, transit } from "react-css-transition";
import { getMemberUserId, getMemberEmail, createMember } from 'services/member';

import * as Helper from 'helper/registerHelper';
import * as Common from 'helper/common';

const transitionStyles = {
  defaultStyle: {
    transform: "translate(0, 0)",
    opacity: 0,
  },
  enterStyle: {
    transform: transit("translate(0, 100px)", 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    opacity: transit(1, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
  },
  leaveStyle: {
    transform: transit("translate(0, 0)", 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    opacity: transit(0, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
  },
  activeStyle: {
    transform: "translate(0, 100px)",
    opacity: 1,
  },
};

class RegisterMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "mem_userid" : {
        value: '',
        err_msg: '5자 이상 12자 이내로 지어주세요.',
        err: null,
      },
      "mem_pw" : {
        value: '',
        err_msg: '',
        err: null,
      },
      "mem_pw_confirm" : {
        value: '',
        err_msg: '영문,숫자,특수문자 포함 12자이내.',
        err: null,
      },
      "mem_email" : {
        value: '',
        err_msg: '',
        err: null,
      },
      "mem_name" : {
        value: '',
        err_msg: '',
        err: null,
      },
      "mem_phone" : {
        value: '',
        err_msg: '',
        err: null,
      },
      "mem_phone_auth" : {
        value: '',
        err_msg: '',
        err: null,
      },

      "mem_mail_agree" : {
        value: 1,
        err_msg: '',
        err: null,
      },

      "mem_phone_auth_btn" : true,

      "active" : true,
    };

    // handle Input Validation
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //연락처 인증
    this.responsePhoneAuth = this.responsePhoneAuth.bind(this);

    //handle submit
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(target.id === 'mem_userid') {
      err_msg = '5자 이상 12자 이내로 지어주세요.';
      if(!Common.isEmpty(value)) {
        if(!Helper.isUserIdAvailable(value)) {
          err = true;
        } else {
          err_msg = '이용 가능한 아이디입니다.';
        };
      }
    }
    if(target.id === 'mem_pw' || target.id === 'mem_pw_confirm') {
      if(target.id === 'mem_pw_confirm') err_msg = '영문,숫자,특수문자 포함 12자이내';
      if(!Common.isEmpty(value)) {
        if(!Helper.isPasswordAvailable(value)) {
          err_msg = '영문,숫자,특수문자 포함 12자이내';
          err = true;
        } else {
          err_msg='';
        }
      }
    }
    if(target.id === 'mem_email') {
      if(!Common.isEmpty(value)) {
        if(!Helper.isEmailAvailable(value)) {
          err_msg = '올바르지 않는 형식입니다.';
          err = true;
        }
      }
    }
    if(target.id === 'mem_name') {
      if(Common.isEmpty(target.value)) {
        err_msg = '이름을 입력해주세요.';
        err = true;
      }
    }
    if(target.id === 'mem_phone') {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      if(!Common.isEmpty(value)) {
        if(!Helper.isPhoneAvailable(value)) {
          err_msg = '올바르지 않는 전화번호입니다.';
          err = true;
        }
      }
    }

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err_msg: err_msg,
        err : Common.isEmpty(value) ? null : err,
      },
    });
  }

  handleBlur(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(Common.isEmpty(value)) return false;

    const isMemUserId = target.id === 'mem_userid' ? true : false;
    const isMemPw = target.id === 'mem_pw' ? true : false;
    const isMemPwConfirm = target.id === 'mem_pw_confirm' ? true : false;
    const isMemEmail = target.id === 'mem_email' ? true : false;

    if(isMemUserId) {
      if(!Helper.isUserIdAvailable(target.value)) {
        err_msg = '5자 이상 12자 이내로 지어주세요.';
        err = true;
      } else {
        getMemberUserId(target.value)
          .then((response) => {
            if(!response.data) {
              err_msg = '이용 가능한 아이디입니다.';
              err = false;
            } else {
              err_msg = '동일한 아이디가 존재합니다.';
              err = true;
            }

            this.setState({
              mem_userid : {
                ...this.state.mem_userid,
                err_msg: err_msg,
                err : err,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if(isMemPw || isMemPwConfirm) {
      if(!Helper.isPasswordAvailable(target.value)) {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
        err = true;
      } else {
        if(isMemPwConfirm) {
          const mem_pw = this.state.mem_pw.value;
          if(!Helper.compareTo(target.value, mem_pw)) {
            err_msg = '비밀번호가 일치하지 않습니다.';
            err = true;
          } else {
            err_msg = '이용 가능한 비밀번호입니다.';
            err = false;
          }
        }
      }
    }

    if(isMemEmail) {
      if(!Helper.isEmailAvailable(target.value)) {
        err_msg = '올바르지 않는 형식입니다.';
        err = true;
      } else {
        getMemberEmail(target.value)
          .then((response) => {
            if(!response.data) {
              err_msg = '이용 가능한 이메일입니다.';
              err = false;
            } else {
              err_msg = '동일한 이메일이 존재합니다.';
              err = true;
            }

            this.setState({
              mem_email : {
                ...this.state.mem_email,
                err_msg: err_msg,
                err : err,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    this.setState({
      [target.id] : {
        value: target.value,
        err_msg: err_msg,
        err : err,
      },
    });
  }

  responsePhoneAuth(e) {
    //인증완료
    this.setState({
      mem_phone_auth : {
        ...this.state.mem_phone_auth,
        err_msg: '인증에 성공하였습니다.',
        err : false,
      },
      mem_phone_auth_btn : false,
    })
  }

  handleEmptyValue(e) {
    if(Common.isEmpty(this.state.mem_userid.value)) this.refs.mem_userid.focus();
    else if(Common.isEmpty(this.state.mem_pw.value)) this.refs.mem_pw.focus();
    else if(Common.isEmpty(this.state.mem_pw_confirm.value)) this.refs.mem_pw_confirm.focus();
    else if(Common.isEmpty(this.state.mem_email.value)) this.refs.mem_email.focus();
    else if(Common.isEmpty(this.state.mem_name.value)) this.refs.mem_name.focus();
    else if(Common.isEmpty(this.state.mem_phone.value)) this.refs.mem_phone.focus();
    else if(Common.isEmpty(this.state.mem_phone_auth.value)) this.refs.mem_phone_auth.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.mem_userid.err,
      this.state.mem_pw.err,
      this.state.mem_pw_confirm.err,
      this.state.mem_email.err,
      this.state.mem_name.err,
      this.state.mem_phone.err,

      //True -> Ok / False -> Error
      this.state.mem_phone_btn,
      this.state.mem_phone_auth_btn
    ];

    //Empty Data check
    if(!this.handleEmptyValue()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error) {
        isValid = false;
        return false;
      }
    });

    if(isValid) {
      const data = {
        "mem_userid" : this.state.mem_userid.value,
        "mem_pw" : this.state.mem_pw.value,
        "mem_email" : this.state.mem_email.value,
        "mem_name" : this.state.mem_name.value,
        "mem_phone" : this.state.mem_phone.value,
        "mem_mail_agree" : 1
      };

    //Post 요청(Member)
    createMember(data)
      .then((response) => {
        alert('회원가입완료!');
        this.handleToggle();
        setTimeout(() => {
          window.location.reload();
        }, 300);

      })
      .catch((err) => {
        alert('에러!');
        console.log(err);
      });
    }
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  handleClose() {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  render() {
    const errorClassName = (identifier) => {
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }
    return (
      <CSSTransition
        transitionAppear={true}
        {...transitionStyles}
        active={this.state.active}>
        <div className='register-member-container'>
          <div className='register-member-inner'>
            <div className='close-btn' onClick={this.handleClose}>
              <span className='x-icon'></span>
            </div>
            <h3>간편 회원가입</h3>
            <p className='p'>
              회원가입시 외주대학교의 <span>이용약관</span> 및 <span>개인정보취급방침</span>을
              읽고 이해하였으며, 이에 동의하는 것으로 간주됩니다.
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="input-register">
                <label htmlFor="mem_userid">아이디</label>
                <input type="text" id="mem_userid" ref='mem_userid' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.mem_userid)}>{this.state.mem_userid.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_pw">비밀번호</label>
                <input type="password" id="mem_pw" ref='mem_pw' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.mem_pw)}>{this.state.mem_pw.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_pw_confirm">비밀번호 확인</label>
                <input type="password" id="mem_pw_confirm" ref='mem_pw_confirm' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.mem_pw_confirm)}>{this.state.mem_pw_confirm.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_email">이메일 주소</label>
                <input type="text" id="mem_email" ref='mem_email' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.mem_email)}>{this.state.mem_email.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_name">이름</label>
                <input type="text" id="mem_name" ref='mem_name' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.mem_name)}>{this.state.mem_name.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_phone">전화번호</label>
                <input type="text" id="mem_phone" ref='mem_phone' onChange={this.handleChange}/>
                <a className={errorClassName(this.state.mem_phone)}>{this.state.mem_phone.err_msg}</a>
              </div>
              <div className="input-register">
                <label htmlFor="mem_phone_auth">인증번호</label>
                <input type="text" id="mem_phone_auth" ref='mem_phone_auth' onChange={this.handleChange}/>
                <input type="button" value="인증번호 발송" onClick={this.responsePhoneAuth} />
                <a className={errorClassName(this.state.mem_phone_auth)}>{this.state.mem_phone_auth.err_msg}</a>
              </div>
              <div className="submit-resgister">
                <input type="submit" value="무료 가입하기"/>
              </div>
            </form>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

RegisterMember.propTypes = {
};

export default withRouter(RegisterMember);
