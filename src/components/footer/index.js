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
              <li>mail@mail.com</li>
              <li>toy project</li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
