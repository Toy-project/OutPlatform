import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';

import { RegisterPopup } from 'components/';
import { Login } from 'components/';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegister : false,
      showLogin : false,
    }

    this.registerToggle = this.registerToggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
  }

  registerToggle() {
    this.setState({
      showRegister : !this.state.showRegister,
    });
  }

  loginToggle() {
    this.setState({
      showLogin : !this.state.showLogin,
    });
  }

  render() {
    const subPageStyle = this.props.subPage ? 'isSub' : '';
    const registerPopup = this.state.showRegister ? <RegisterPopup close={this.registerToggle} /> : '';
    const loginPopup = this.state.showLogin ? <Login close={this.loginToggle} register={this.registerToggle} /> : '';
    return (
      <div>
        <nav className={subPageStyle}>
          <div className="container">
            <ul className="hide-on-med-and-down">
              <li><a href="">장바구니</a></li>
              <li><a onClick={this.registerToggle}>회원가입</a></li>
              <li><a onClick={this.loginToggle}>로그인</a></li>
              <li><a href="">마이 페이지</a></li>
            </ul>
          </div>
        </nav>
        {registerPopup}
        {loginPopup}
      </div>
    );
  }
}

Nav.propTypes = {
  showRegister: PropTypes.bool,
  registerToggle: PropTypes.func,
  subPage: PropTypes.bool,
}

export default Nav;
