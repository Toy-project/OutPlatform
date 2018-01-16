import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';

import { RegisterPopup } from 'components/';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegister : false,
    }

    this.registerToggle = this.registerToggle.bind(this);
  }

  registerToggle() {
    this.setState({
      showRegister : !this.state.showRegister,
    });
  }

  render() {
    const subPageStyle = this.props.subPage ? 'isSub' : '';
    const registerPopup = this.state.showRegister ? <RegisterPopup close={this.registerToggle} /> : '';
    return (
      <div>
        <nav className={subPageStyle}>
          <div className="container">
            <ul className="hide-on-med-and-down">
              <li><a href="">장바구니</a></li>
              <li><a onClick={this.registerToggle}>회원가입</a></li>
              <li><a>로그인</a></li>
              <li><a href="">마이 페이지</a></li>
            </ul>
          </div>
        </nav>
        {registerPopup}
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
