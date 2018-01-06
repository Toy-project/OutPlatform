import React from 'react';
import '../../scss/common.scss';
import './scss/nav.scss';

class Nav extends React.Component {
  render(){
    return(
      <nav>
        <div className="nav-wrapper container">
          <ul className="right hide-on-med-and-down">
            <li><a href="#">Navbar Link</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
