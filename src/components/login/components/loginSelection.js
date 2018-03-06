import React from 'react';
import  { withRouter } from 'react-router-dom';
import { CSSTransition } from "react-css-transition";

import * as AnimationStyle from 'helper/animationStyle';

class LoginSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupContainerHeight : 0,
      active : false,
    }

    this.handleClose = this.handleClose.bind(this);
    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);

    this.goToFindUserId = this.goToFindUserId.bind(this);
    this.goToFindPassword = this.goToFindPassword.bind(this);

  }

  goToFindUserId() {
    this.props.history.push(`/findUserId`);
  }

  goToFindPassword() {
    this.props.history.push(`/findPassword`);
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

  componentDidMount() {
    window.addEventListener('load', this.setPopupContainerHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setPopupContainerHeight());
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

    return (
      <div className='popup_container'>
        <CSSTransition
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
          active={this.state.active}>
          <div id='popup-wrapper' className="login-selection-popup-container">
            <div className='close-btn' onClick={this.handleClose}>
              <span className='x-icon'></span>
            </div>
            <h3>로그인</h3>
            <p className='p-emerald'>
              단체 로그인과 일반 로그인을 선택해주세요!
            </p>
            <div className='login-btns'>
              <button className="emerald-btn" onClick={this.props.loginMemberToggle}>일반 회원 로그인</button>
              <button className="emerald-btn" onClick={this.props.loginClubToggle}>단체 회원 로그인</button>
            </div>
            <p className='p-gray'>
              아이디랑 비밀번호를 잊어버리셨나요?
            </p>
            <div className='find-btns'>
              <button className="gray-btn" onClick={this.goToFindUserId}>아이디 찾기</button>
              <button className="gray-btn" onClick={this.goToFindPassword}>패스워드 찾기</button>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

LoginSelection.propTypes = {
};

export default withRouter(LoginSelection);
