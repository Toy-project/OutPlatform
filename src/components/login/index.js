import React from 'react';
import { CSSTransition, transit } from "react-css-transition";
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { memberLogin, clubLogin } from 'services/auth';

import { isEmpty } from 'helper/common';

import * as LoginHelper from 'helper/loginHelper';

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

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      err_msg: '아직 외주대학교 회원이 아니신가요?',
      active: true,
    }
    //팝업 토글 처리
    this.registerToggle = this.registerToggle.bind(this);

    //공백처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //submit 처리
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.closePopup);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closePopup);
  }

  handleEmptyValue() {
    if(isEmpty(this.refs.userid.value)) this.refs.userid.focus();
    else if(isEmpty(this.refs.pw.value)) this.refs.pw.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    const userid = this.refs.userid.value;
    const pw = this.refs.pw.value;
    const type = this.refs.type.checked;

    if(!this.handleEmptyValue()) return false;

    // Login API 실행
    if(!type) {
      memberLogin(userid, pw)
        .then((response) => {
          LoginHelper.createToken(JSON.stringify(response.data));
          this.handleToggle();
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch((err) => {
          this.setState({
            err_msg : '일반 회원이 맞으신가요? 다시 확인하시고 로그인해주시기 바랍니다.'
          });
        });
    } else {
      clubLogin(userid, pw)
        .then((response) => {
          LoginHelper.createToken(JSON.stringify(response.data));
          this.handleToggle();
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch((err) => {
          this.setState({
            err_msg : '단체 회원이 맞으신가요? 다시 확인하시고 로그인해주시기 바랍니다.'
          });
        });
    }
  }

  handleClose() {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  //팝업을 종료하는 함수
  closePopup = (e) => {
    if (e.target.id === 'popup_container'){
      this.handleClose();
    }
  }

  registerToggle(e) {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
      this.props.register();
    }, 300);
  }

  render() {
    return(
      <div id='popup_container' className='popup_container'>
        <CSSTransition
          id = 'popup_container'
          transitionAppear={true}
          {...transitionStyles}
          active={this.state.active}>
          <div className='login-container'>
            <div className='login-inner'>
              <div className='close-btn' onClick={this.handleClose}>
                <span className='x-icon'></span>
              </div>
              <h3>로그인</h3>
              <p className='p'>
                {this.state.err_msg}
              </p>
              <form onSubmit={this.handleSubmit}>
                <input type='text' ref='userid' placeholder='아이디를 입력해주세요.' />
                <input type='password' ref='pw' placeholder='패스워드를 입력해주세요.' />

                <div className='type'>
                  <label htmlFor='type' className='title'>단체</label>
                  <input type="checkbox" id='type' ref='type' onChange={this.handleChange}/>
                  <label htmlFor='type'></label>
                </div>

                <input type='submit' value='로그인' />
                <button onClick={this.registerToggle} className='gray-btn'>간편 가입하기</button>
              </form>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

Login.propTypes = {
};

export default withRouter(Login);
