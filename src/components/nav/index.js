import React from 'react';
import PropTypes from 'prop-types';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { RegisterPopup } from 'components/';
import { Login } from 'components/';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegister : false,
      showLogin : false,
      showSubmenu: false,
    }

    this.registerToggle = this.registerToggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.goToMyPageClub = this.goToMyPageClub.bind(this);
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

  goToMyPageClub() {
    const type = 1;
    this.props.history.push(`/myPage/${type}`);
    window.location.reload();
  }

  render() {
    //const subPageStyle = this.props.subPage ? 'isSub' : '';
    const registerPopup = this.state.showRegister ? <RegisterPopup close={this.registerToggle} /> : '';
    const loginPopup = this.state.showLogin ? <Login close={this.loginToggle} register={this.registerToggle} /> : '';
    return (
      <div>
        <nav>
          <div className="container">
            <ul className="main-menu hide-on-med-and-down">
              <li>장바구니</li>
              <li onClick={this.registerToggle}>회원가입</li>
              <li onClick={this.loginToggle}>로그인</li>
              <li className='my-page'>
                마이 페이지
                <div className='sub-menu'>
                  <div className='container'>
                    <ul>
                      <li onClick={this.goToMyPageClub}>단체관리</li>
                      <li>외주관리</li>
                      <li>회원관리</li>
                    </ul>
                  </div>
                </div>
              </li>
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

export default withRouter(Nav);
