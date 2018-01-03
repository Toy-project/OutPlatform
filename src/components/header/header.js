import React from 'react';
import '../../scss/common.scss';
import './scss/header.scss';
import './js/header.js';


class Header extends React.Component {
  render(){
    return (
      <nav>
        <div class="nav-wrapper container">
          <span class="center-align">Navbar</span>
        </div>
      </nav>
    )
  }
}

export default Header;
