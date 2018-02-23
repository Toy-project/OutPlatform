import React from 'react';
import { CSSTransition, transit } from "react-css-transition";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import * as Variables from 'helper/variables';

import * as AnimationStyle from 'helper/animationStyle';

class RegisterSelection extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      active: true,
    }

    this.onCickToClubRegister = this.onCickToClubRegister.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToMemberRegister = this.handleToMemberRegister.bind(this);
  }

  onCickToClubRegister() {
    this.handleToggle();
    setTimeout(() => {
      this.props.history.push(`/register/`);
    }, 300);
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

  handleToMemberRegister() {
    this.handleToggle();
    setTimeout(() => {
      this.props.toggleToRegisterMember();
    }, 300);
  }



  render() {
    const _thisContainerMinHeight = Variables.registerSelectionPopupHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;

    return (
      <CSSTransition
        transitionAppear={true}
        {...AnimationStyle.transitionStyles(_animationStartFrom)}
        active={this.state.active}>
        <div className='register-selection-container'>
          <div className='register-selection-inner'>
            <div className='close-btn' onClick={this.handleClose}>
              <span className='x-icon'></span>
            </div>
            <div className='close-btn' onClick={this.props.close}></div>
            <h3>회원가입</h3>
            <p>
              단체회원가입과 일반회원가입 중 <br />원하시는 가입 유형을 선택해주세요!
            </p>
            <button onClick={this.handleToMemberRegister} className="emerald-btn">일반 회원가입</button>
            <button onClick={this.onCickToClubRegister} className="blue-btn">단체 회원가입</button>
            <p className='warning'>
              *일반회원가입으로는 단체 개설이 불가능하니 단체 계정을 하나 더 만들 것을 권장드립니다.
            </p>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

CSSTransition.childContextTypes = {
    //child context keys
}

RegisterSelection.propTypes = {
  toggleToClub: PropTypes.func,
  toggleToRegisterMember: PropTypes.func,
};

export default withRouter(RegisterSelection);
