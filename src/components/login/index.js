import React from 'react';
import { CSSTransition } from "react-css-transition";
import { connect } from 'react-redux';

import './scss/index.scss';

import { isEmpty } from 'helper/common';
import * as AnimationStyle from 'helper/animationStyle';
import * as Variables from 'helper/variables';

import * as LoginActions from 'actions/login';

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
      this.props.tryLoggingIn(userid, pw, 'member');
    } else {
      this.props.tryLoggingIn(userid, pw, 'club');
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
    const _thisContainerMinHeight = Variables.loginPopupHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;
    return(
      <div id='popup_container' className='popup_container'>
        <CSSTransition
          id = 'popup_container'
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
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

const mapStateToProps = (state) => {
  return {
    login : state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLoggingIn: (userid, pw, type) => {
      dispatch(LoginActions.tryLoggingIn(userid, pw, type));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
