import React from 'react';

import UnregisterPopup from './unregisterPopup';

class Unregister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUnregisterToggle : false,
    }

    this.unregisterToggle = this.unregisterToggle.bind(this);
  }

  unregisterToggle() {
    this.setState({
      isUnregisterToggle : !this.state.isUnregisterToggle,
    });
  }
  render() {
    const unregisterPopup = this.state.isUnregisterToggle ? <UnregisterPopup type={this.props.type} close={this.unregisterToggle} /> : '';
    return (
      <div className='unregister-container'>
        <div className='container'>
          <div className='edit-btn'>
            <button className='gray-btn unregister' onClick={this.unregisterToggle}>탈퇴하기</button>
          </div>
        </div>
        {unregisterPopup}
      </div>
    );
  }
}

Unregister.propTypes = {
};

export default Unregister;
