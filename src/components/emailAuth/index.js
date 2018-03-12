import React from 'react';
import { CSSTransition } from "react-css-transition";

import './scss/index.scss';

import * as AnimationStyle from 'helper/animationStyle';
import * as MailAuthHelper from 'helper/mailAuthHelper';
// import { InnerLoading } from 'components/';

class EmailAuth extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      popupContainerHeight : 0,
      active : false,
      isLoading : false,
      err_msg : '',
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.checkAuth = this.checkAuth.bind(this);

    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.setPopupContainerHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setPopupContainerHeight());
  }

  setPopupContainerHeight() {
    this.setState({
      active : !this.state.active,
      popupContainerHeight : document.getElementById('email-auth-popup-wrapper').offsetHeight,
    });
  }

  checkAuth() {
    if(MailAuthHelper.checkMailAuth(this.refs.email_auth.value)) {
      this.props.emailAuthCheck();
      this.handleClose();
    } else {
      this.setState({
        err_msg : '인증 번호가 올바르지 않습니다.',
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
    const _thisContainerMinHeight = this.state.popupContainerHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;

    return (
      <div className='popup_container'>
        <CSSTransition
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
          active={this.state.active}>
          <div id='email-auth-popup-wrapper' className='email-auth-container'>
            <div className='close-btn' onClick={this.handleClose}>
              <span className='x-icon'></span>
            </div>
            <h3>이메일 인증</h3>
            <p>
              {this.props.recevier}로 이메일 인증번호를 발송하였습니다. <br />
              인증번호를 확인 하신 후 인증 등록을 해주세요. <br />
            </p>
            <p>
              <b>{this.props.error ? '네트워크가 원활하지 않습니다. 잠시 후 이용해주세요.' : this.state.err_msg}</b>
            </p>
            <br />
            <input type='text' ref='email_auth' />
            <input type='button' onClick={this.checkAuth} value='인증하기' />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

EmailAuth.propTypes = {
};

export default EmailAuth;
