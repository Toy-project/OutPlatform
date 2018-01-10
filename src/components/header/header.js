import React from 'react';
import '../../scss/common.scss';
import './scss/header.scss';
import Nav from '../nav/nav';


class Header extends React.Component {
  render(){
    return (
      <div className="top-container">
      <Nav />
        <div className="container">
          
        </div>
      </div>
    )
  }
}

export default Header;
