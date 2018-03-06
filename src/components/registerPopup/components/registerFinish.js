import React from 'react';
import  { withRouter } from 'react-router-dom';
import { CSSTransition } from "react-css-transition";

import * as AnimationStyle from 'helper/animationStyle';

class RegisterFinish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupContainerHeight : 0,
      active : false,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.goToMain = this.goToMain.bind(this);
    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);
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

  goToMain() {
    this.props.history.push('/');
    this.handleClose();
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
      <CSSTransition
        transitionAppear={true}
        {...AnimationStyle.transitionStyles(_animationStartFrom)}
        active={this.state.active}>

        <div id='popup-wrapper' className="register-finish-container">
          <div className='close-btn' onClick={this.handleClose}>
            <span className='x-icon'></span>
          </div>
          <h3>회원가입</h3>
          <p className='p'>
            외주대학교에 입학하신걸 환영합니다!
          </p>
          <button onClick={this.goToMain} className="emerald-btn">메인페이지로 가기</button>
        </div>
      </CSSTransition>
    );
  }
}

RegisterFinish.propTypes = {
};

export default withRouter(RegisterFinish);
