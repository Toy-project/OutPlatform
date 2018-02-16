import React from 'react';
import PropTypes from 'prop-types';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { RegisterPopup } from 'components/';
import { Login } from 'components/';

import * as LoginHelper from 'helper/loginHelper';

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
    this.goToMyPageUser= this.goToMyPageUser.bind(this);
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

  //단체수정페이지
  goToMyPageClub() {
    if(LoginHelper.isMember(LoginHelper.getCurrentToken())) {
      return false;
    }

    this.props.history.push(`/myPage/${LoginHelper.getCurrentToken().club_id}`);
  }

  //유저정보페이지
  goToMyPageUser() {
    if(LoginHelper.isMember(LoginHelper.getCurrentToken())) {
      this.props.history.push(`/myPageUser/member`);
    } else {
      this.props.history.push(`/myPageUser/club`);
    }
  }

  //메인으로 가는 버튼
  goToMain(){
    this.props.history.push(`/`);
  }

  //로그아웃
  logout() {
    if(LoginHelper.getCurrentToken() !== false){
      LoginHelper.removeToken();
    }

    window.location.reload();
  }

  render() {
    //회원가입 로그인 팝업 토글
    const registerPopup = this.state.showRegisterPopup ? <RegisterPopup close={this.registerToggle} /> : '';
    const loginPopup = this.state.showLoginPopup ? <Login close={this.loginToggle} register={this.registerToggle} /> : '';

    //로그인, 로그아웃 버튼 토글
    const showToggle = () => {
      if(LoginHelper.getCurrentToken() !== false) {
        return (
          <ul className="main-menu hide-on-med-and-down">
            {!LoginHelper.isMember(LoginHelper.getCurrentToken()) ? (<li>장바구니</li>) : ''}
            <li onClick={this.logout}>로그아웃</li>
            <li className='my-page'>
              마이 페이지
              <div className='sub-menu'>
                <ul>
                  {!LoginHelper.isMember(LoginHelper.getCurrentToken()) ? (<li onClick={this.goToMyPageClub}>단체관리</li>) : ''}
                  <li onClick={this.goToMyPageClub}>외주관리</li>
                  <li onClick={this.goToMyPageUser}>회원관리</li>
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
