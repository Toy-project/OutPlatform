import React from 'react';
import '../../scss/common.scss';
import './scss/header.scss';
import './js/header.js';
import Nav from '../nav/nav';


class Header extends React.Component {
  render(){
    return (
      <div class="top-container">
        <Nav />
      </div>
    )
  }
}

export default Header;
