import React from 'react';
import '../../scss/common.scss';
import './scss/nav.scss';
import './js/nav.js';

class Nav extends React.Component {
  render(){
    return(
      <nav>
        <div class="nav-wrapper container">
          <ul class="right hide-on-med-and-down">
            <li><a href="#">Navbar Link</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
