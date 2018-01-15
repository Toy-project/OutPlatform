import React from 'react';

import './scss/index.scss';

import RegisterSelection from 'components/register/';

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
    const registerPopup = this.state.showRegister ? <RegisterSelection close={this.registerToggle} /> : '';
    return (
      <div>
        <nav>
          <div className="container">
            <ul className="hide-on-med-and-down">
              <li><a href="">장바구니</a></li>
              <li><a onClick={this.registerToggle}>회원가입</a></li>
              <li><a>로그인</a></li>
              <li><a href="">마이 페이지</a></li>
            </ul>
          </div>
        </nav>
        {console.log(this.state.showRegister)}
        {registerPopup}
      </div>
    );
  }
}

export default Nav;
