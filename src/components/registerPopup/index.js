import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';
import RegisterSelection from './components/registerSelection';
import RegisterFinish from './components/registerFinish';
import RegisterMember from './components/registerMember';


class RegisterPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registerSelectionToggle: true,
      registerMemberToggle: false,
    }

    this.registerToMemberToggle = this.registerToMemberToggle.bind(this);
    this.registerFinishToggle = this.registerFinishToggle.bind(this);
  }

  registerFinishToggle() {
    this.setState({
      registerMemberToggle: !this.state.registerMemberToggle,
    });
  }

  registerToMemberToggle() {
    this.setState({
      registerSelectionToggle: !this.state.registerSelectionToggle,
      registerMemberToggle: !this.state.registerMemberToggle,
    });
  }

  render() {
    let showRegisterStep;
    let registerFinish;

    if(this.state.registerSelectionToggle){
      showRegisterStep = <RegisterSelection toggleToRegisterMember={this.registerToMemberToggle} close={this.props.close} />;
    } else if(this.state.registerMemberToggle) {
      showRegisterStep = <RegisterMember toggleToRegisterFinish={this.registerFinishToggle} close={this.props.close} />;
    } else {
      showRegisterStep = '';
      registerFinish = <RegisterFinish close={this.props.close} />;
    }

    return (
      <div className='popup_container'>
        {showRegisterStep}
        {registerFinish}
      </div>
    );
  }
}

RegisterPopup.propTypes = {
  registerToggle: PropTypes.func,
};

export default RegisterPopup;
