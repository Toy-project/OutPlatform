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

  submenuToggleOut(e) {
    const id = e.taget.id;
    const element = document.getElementById(id);
    const elementBackground = document.getElementById(`${id}_bg`);

    if(typeof element === String){
      element.className.add('sub-menu-hide');
      elementBackground.className.add('sub-menu-hide');
    }
  }

  submenuToggleIn(e) {
    const id = e.taget.id;
    const element = document.getElementById(`${id}_sub_menu`);
    const elementBackground = document.getElementById(`${id}_sub_menu_bg`);

    if(typeof element === String){
      element.className.add('sub-menu-show');
      elementBackground.className.add('sub-menu-show');
    }
  }

  goToMyPageClub() {

  }

  render() {
    const subPageStyle = this.props.subPage ? 'isSub' : '';
    const registerPopup = this.state.showRegister ? <RegisterPopup close={this.registerToggle} /> : '';
    const loginPopup = this.state.showLogin ? <Login close={this.loginToggle} register={this.registerToggle} /> : '';
    return (
      <div>
        <nav className={subPageStyle}>
          <div className="container">
            <ul className="main-menu hide-on-med-and-down">
              <li><a href="">장바구니</a></li>
              <li><a onClick={this.registerToggle}>회원가입</a></li>
              <li><a onClick={this.loginToggle}>로그인</a></li>
              <li>
                <a href="" className='my-page'>마이 페이지</a>
                <div className='sub-menu'>
                  <div className='container'>
                    <ul>
                      <li><a onClick={this.goToMyPageClub}>단체관리</a></li>
                      <li><a>외주관리</a></li>
                      <li><a>회원관리</a></li>
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

export default Nav;
