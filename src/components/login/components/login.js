import React from 'react';
import { CSSTransition } from "react-css-transition";
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as AnimationStyle from 'helper/animationStyle';

import * as LoginActions from 'actions/login';

import { InnerLoading } from 'components/';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      err_msg: '아직 외주대학교 회원이 아니신가요?',
      popupContainerHeight: 0,
      active: false,
    }
    //팝업 토글 처리
    this.registerToggle = this.registerToggle.bind(this);

    //공백처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //submit 처리
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('load', this.setPopupContainerHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setPopupContainerHeight());
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.refs.userid.value)) this.refs.userid.focus();
    else if(Common.isEmpty(this.refs.pw.value)) this.refs.pw.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    const userid = this.refs.userid.value;
    const pw = this.refs.pw.value;

    if(!this.handleEmptyValue()) return false;

    // Login API 실행
    if(!this.props.type) {
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

  registerToggle(e) {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
      this.props.register();
    }, 300);
  }

  setPopupContainerHeight() {
    this.setState({
      active : !this.state.active,
      popupContainerHeight : document.getElementById('popup-wrapper').offsetHeight,
    });
  }

  render() {
    const _thisContainerMinHeight = this.state.popupContainerHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;
    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.props.login.isLoading} />
      </div>
    );

    return(
      <div id='popup_container' className='popup_container'>
        <CSSTransition
          id = 'popup_container'
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
          active={this.state.active}>
          <div id='popup-wrapper' className='login-container'>
            <div className='login-inner'>
              <div className='close-btn' onClick={this.handleClose}>
                <span className='x-icon'></span>
              </div>
              <h3>로그인</h3>
              <p className='p'>
                {Common.isError(this.props.login) ? '로그인에 실패하였습니다.' : this.state.err_msg}
              </p>
              <form onSubmit={this.handleSubmit}>
                <input type='text' ref='userid' placeholder='아이디를 입력해주세요.' />
                <input type='password' ref='pw' placeholder='패스워드를 입력해주세요.' />

                {/* <div className='type'>
                  <label htmlFor='type' className='title'>단체</label>
                  <input type="checkbox" id='type' ref='type' onChange={this.handleChange}/>
                  <label htmlFor='type'></label>
                </div> */}

                <input type='submit' value='로그인' />
                <button onClick={this.registerToggle} className='gray-btn'>간편 가입하기</button>
              </form>
              {Common.isLoading(this.props.login) ? loading : ''}
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
