import React from 'react';
import './scss/index.scss';

class Footer extends React.Component {
  render(){
    return (
      <footer className="footer-wrapper">
        <div className="container">
          <div className="contact-info-wrapper">
            <h5>contact</h5>
            <ul>
              <li>연락처 : 010-2492-0223</li>
              <li>이메일 : toyprojectgroup@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
