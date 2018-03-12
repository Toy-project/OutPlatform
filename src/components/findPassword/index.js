import React from 'react';
// import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import * as RegisterHelper from 'helper/registerHelper';
import * as Common from 'helper/common';
import * as MailAuthHelper from 'helper/mailAuthHelper';

import * as Club from 'services/club';
import * as Member from 'services/member';
import * as MailAuth from 'services/mailAuth';

import { InnerLoading, EmailAuth } from 'components/';
import MessagePopup from 'components/messagePopup';

class FindPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundUserIdToggle: false,
      isLoading : false,
      email: '',
      foundId : '',
      flag: '',

      //폼 에러 메세지
      pw : {
        value: '',
        err_msg: '',
        err: null,
      },

      pw_confirm : {
        value: '',
        err_msg: '영문,숫자,특수문자 포함 12자이내.',
        err: null,
      },

      registerEmailAuthToggle: false,
      //이메일 인증용
      error: false,
      //이메일 인증 체크여부
      emailAuthCheck: false,

      //완료 메세지
      messagePopup: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.findMemberUserIdByEmail = this.findMemberUserIdByEmail.bind(this);
    this.findClubUserIdByEmail = this.findClubUserIdByEmail.bind(this);
    this.foundUserIdToggle = this.foundUserIdToggle.bind(this);

    //이메일 인증
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailAuthCheck = this.emailAuthCheck.bind(this);
    this.registerEmailAuthToggle = this.registerEmailAuthToggle.bind(this);

    //패스워드 변경 폼
    this.changePassword = this.changePassword.bind(this);
    this.isEmptyPassword = this.isEmptyPassword.bind(this);

    this.finish = this.finish.bind(this);

    //완료 메세지
    this.messagePopup = this.messagePopup.bind(this);
  }

  messagePopup() {
    this.setState({
      messagePopup: !this.state.messagePopup,
    });
  }

  emailAuthCheck() {
    this.setState({
      emailAuthCheck: !this.state.emailAuthCheck,
    });
  }

  foundUserIdToggle() {
    if(this.state.flag === 'member') {
      this.findMemberUserIdByEmail();
    } else {
      this.findClubUserIdByEmail();
    }

    this.emailAuthCheck();
  }

  registerEmailAuthToggle() {
    this.setState({
      registerEmailAuthToggle: !this.state.registerEmailAuthToggle,
    });
  }

  handleChange(e) {
    let flag = 'member';

    if(e.target.id === 'club_email') {
      flag = 'club';
    }

    this.setState({
      email: e.target.value,
      flag: flag,
    });
  }

  handleBlur(e) {
    const target = e.target;
    let value = target.value;
    let err_msg = '';
    let err = false;

    if(target.id === 'pw' || target.id === 'pw_confirm') {
      if(!RegisterHelper.isPasswordAvailable(target.value)) {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
        err = true;
      } else {
        if(target.id === 'pw_confirm') {
          const pw = this.refs.pw.value;
          if(!RegisterHelper.compareTo(target.value, pw)) {
            err_msg = '비밀번호가 일치하지 않습니다.';
            err = true;
          } else {
            err_msg = '이용 가능한 비밀번호입니다.';
            err = false;
          }
        }
      }
    }

    this.setState({
      [target.id] : {
        value: value,
        err_msg: err_msg,
        err: err,
      }
    })
  }

  findMemberUserIdByEmail() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    Member.getMemberEmail(this.refs.mem_email.value)
      .then((res) => {
        if(res.data) {
          console.log(res.data);
          this.setState({
            foundId: res.data.mem_id,
          });
        }

        this.setState({
          isLoading: !this.state.isLoading,
          foundUserIdToggle: !this.state.foundUserIdToggle,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: !this.state.isLoading,
        });
      });
  }

  findClubUserIdByEmail() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    Club.getClubEmail(this.refs.club_email.value)
      .then((res) => {
        if(res.data) {
          this.setState({
            foundId: res.data.club_id,
          });
        }

        this.setState({
          isLoading: !this.state.isLoading,
          foundUserIdToggle: !this.state.foundUserIdToggle,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: !this.state.isLoading,
        });
      });
  }

  finish() {
    this.props.history.push(`/`);
  }

  isEmptyPassword() {
    if(Common.isEmpty(this.refs.pw.value)) this.refs.pw.focus();
    else if(Common.isEmpty(this.refs.pw_confirm.value)) this.refs.pw_confirm.focus();
    else {
      return true;
    }

    return false;
  }

  changePassword() {
    const ID = this.state.foundId;
    let isValid = true;

    const validator = [
      this.state.pw.err,
      this.state.pw_confirm.err,
    ];

    if(!this.isEmptyPassword()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error) {
        isValid = false;
        return false;
      }
    });

    //찾은 아이디 없으면 return
    if(!ID) {
      return false;
    }

    if(isValid) {
      this.setState({
        isLoading: !this.state.isLoading,
      });

      if(this.state.flag === 'member') {
        const data = {
          mem_pw : this.refs.pw.value,
        }
        Member.updateMember(ID, data)
          .then((res) => {
            if(res.data) {
              this.messagePopup();
            }

            this.setState({
              isLoading: !this.state.isLoading,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: !this.state.isLoading,
            });
          });
      } else {
        const data = {
          club_pw : this.refs.pw.value,
        }
        Club.updateClub(ID, data)
          .then((res) => {
            if(res.data) {
              this.messagePopup();
            }

            this.setState({
              isLoading: !this.state.isLoading,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: !this.state.isLoading,
            });
          });
      }
    }
  }

  handleSubmit() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    MailAuth.sendEmail(this.state.email)
    .then((res) => {
      if(res.data) {
        //Save auth
        MailAuthHelper.setMailAuth(res.data.auth);

        //5분 후에 자동으로 삭제
        setTimeout(() => {
          MailAuthHelper.removeMailAuth();
        }, 300000);

        this.setState({
          isLoading: !this.state.isLoading,
        });

        this.registerEmailAuthToggle();
      }
    })
    .catch((err) => {
      //loading
      this.setState({
        isLoading: !this.state.isLoading,
      });
    });
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

    const mailAuth = this.state.registerEmailAuthToggle ? <EmailAuth close={this.registerEmailAuthToggle} emailAuthCheck={this.foundUserIdToggle} recevier={this.state.email} error={false} /> : '';

    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

    const messagePopup = this.state.messagePopup ? <MessagePopup close={this.messagePopup} msg={'비밀변호가 성공적으로 변경되었습니다.'} /> : '';

    const msg = () => {
      if(this.state.foundId) {
        return (
          <div>
            <form>
              <div className='input-register-plain'>
                <h3>
                  비밀번호를 새롭게 변경해주세요!
                </h3>
                <br />
                <div className='input-register'>
                  <label htmlFor='mem_name' className='input-title'>비밀번호</label>
                  <input type="password" id='pw' ref='pw' onBlur={this.handleBlur}/>
                  <a className={errorClassName(this.state.pw)}>{this.state.pw.err_msg}</a>
                </div>
                <div className='input-register'>
                  <label htmlFor='mem_email' className='input-title'>비밀번호 확인</label>
                  <input type="password" id='pw_confirm' ref='pw_confirm' onBlur={this.handleBlur}/>
                  <a className={errorClassName(this.state.pw_confirm)}>{this.state.pw_confirm.err_msg}</a>
                </div>
                <div className='submit-register'>
                  <input type="button" value="변경하기" onClick={this.changePassword}/>
                </div>
              </div>
            </form>
          </div>
        );
      } else {
        return (
          <div>
            <h3>
              해당 이메일로 가입된 정보가 없습니다.
            </h3>
            <p>
              회원가입을 이용하여 생성하여 주세요.
            </p>
            <br />
            <br />
            <div className='submit-register' onClick={this.finish}>
              <input type="button" value="완료"/>
            </div>
          </div>
        );
      }
    }

    const contents = () => {
      if(this.state.emailAuthCheck) {
        return (
          <div>
            {msg()}
          </div>
        );
      } else {
        return (
          <form>
            <div className='input-register-left'>
              <h3>
                [일반회원] 이메일로 인증하기
              </h3>
              <p>
                회원가입시 등록한 이메일와 같은 이메일을 입력해 주세요. <br />
                입력하신 이메일 주소가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='mem_name' className='input-title'>이름</label>
                <input type="text" id='mem_name' ref='mem_name' />
              </div>
              <div className='input-register'>
                <label htmlFor='mem_email' className='input-title'>이메일 주소</label>
                <input type="text" id='mem_email' ref='mem_email' onChange={this.handleChange} />
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.handleSubmit}/>
              </div>
            </div>

            <div className='line hide-on-med-and-down'></div>

            <div className='input-register-right'>
              <h3>
                [단체회원] 이메일로 인증하기
              </h3>
              <p>
                회원가입시 등록한 이메일와 같은 이메일을 입력해 주세요. <br />
                입력하신 이메일 주소가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' />
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email' onChange={this.handleChange} />
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.handleSubmit}/>
              </div>
            </div>
          </form>
        )
      }
    }
    return (
      <div className='findUserId-container'>
        <div className='container'>
          <h1>비밀번호 찾기</h1>
          {contents()}
        </div>
        {this.state.isLoading ? loading : ''}
        {mailAuth}
        {messagePopup}
      </div>
    );
  }
}

FindPassword.propTypes = {

};

export default withRouter(FindPassword);
