import React from 'react';
import '../../scss/common.scss';
import './scss/nav.scss';

class Nav extends React.Component {
  render(){
    return(
      <nav>
        <div className="nav-wrapper container">
          <ul className="right hide-on-med-and-down">
            <li><a href="#">장바구니</a></li>
            <li><a href="#">회원가입</a></li>
            <li><a href="#">로그인</a></li>
            <li><a href="#">마이 페이지</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
