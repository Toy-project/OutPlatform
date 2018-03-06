import React from 'react';
import { CSSTransition } from "react-css-transition";

import './scss/index.scss';

import * as AnimationStyle from 'helper/animationStyle';

class MessagePopup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      popupContainerHeight: 0,
      active: false,
    }
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

  setPopupContainerHeight() {
    this.setState({
      active : !this.state.active,
      popupContainerHeight : document.getElementById('message-popup-wrapper').offsetHeight,
    });
  }

  render() {
    const _thisContainerMinHeight = this.state.popupContainerHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;
    return(
      <div className='popup_container'>
        <CSSTransition
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
          active={this.state.active}>
          <div id='message-popup-wrapper' className='message-popup-container'>
            <div className='contents'>
              {this.props.msg}
            </div>
            <div className='ok' onClick={this.handleClose}>
              확인
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

MessagePopup.propTypes = {
};

export default MessagePopup;
