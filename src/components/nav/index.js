import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { RegisterPopup } from 'components/';
import { Login } from 'components/';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegisterPopup : false,
      showLoginPopup : false,
      showSubmenu: false,
    }

    this.registerToggle = this.registerToggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.goToMyPageClub = this.goToMyPageClub.bind(this);
    this.goToMain = this.goToMain.bind(this);

    //로그아웃
    this.logout = this.logout.bind(this);
  }

  registerToggle() {
    this.setState({
      showRegisterPopup : !this.state.showRegisterPopup,
    });
  }

  loginToggle() {
    this.setState({
      showLoginPopup : !this.state.showLoginPopup,
    });
  }

  goToMyPageClub() {
    const { club_id } = jwtDecode(localStorage.getItem('club_user'));

    this.props.history.push(`/myPage/${club_id}`);
  }

  goToMain(){
    this.props.history.push(`/`);
  }

  logout() {
    if(localStorage.getItem('mem_user')){
      localStorage.removeItem('mem_user');
    } else {
      localStorage.removeItem('club_user');
    }

    this.props.history.push(`/`);
  }

  render() {
    //회원가입 로그인 팝업 토글
    const registerPopup = this.state.showRegisterPopup ? <RegisterPopup close={this.registerToggle} /> : '';
    const loginPopup = this.state.showLoginPopup ? <Login close={this.loginToggle} register={this.registerToggle} /> : '';

    //로그인, 로그아웃 버튼 토글
    const showToggle = () => {
      if(localStorage.getItem('mem_user') || localStorage.getItem('club_user')) {
        return (
          <ul className="main-menu hide-on-med-and-down">
            <li>장바구니</li>
            <li onClick={this.logout}>로그아웃</li>
            <li className='my-page'>
              마이 페이지
              <div className='sub-menu'>
                <ul>
                  {showClubEditPageButton()}
                  <li onClick={this.goToMyPageClub}>외주관리</li>
                  <li onClick={this.goToMyPageClub}>회원관리</li>
                </ul>
              </div>
              <div className='sub-menu-bg'>
              </div>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="main-menu hide-on-med-and-down">
            <li onClick={this.loginToggle}>로그인</li>
            <li onClick={this.registerToggle}>회원가입</li>
          </ul>
        );
      }
    }

    //단체 관리 페이지 토글
    const showClubEditPageButton = () => {
      if(localStorage.getItem('club_user')) {
        return (
          <li onClick={this.goToMyPageClub}>단체관리</li>
        );
      } else {
        return '';
      }
    }

    return (
      <div>
        <nav>
          <div className="container">
            <div className='logo' onClick={this.goToMain}>
              외주대학교
            </div>
            {showToggle()}
          </div>
        </nav>
        {registerPopup}
        {loginPopup}
      </div>
    );
  }
}

Nav.propTypes = {
  showRegisterPopup: PropTypes.bool,
  registerToggle: PropTypes.func,
  subPage: PropTypes.bool,
}

export default withRouter(Nav);
