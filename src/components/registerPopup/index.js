import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';
import RegisterSelection from './components/registerSelection';
import TypeOfClubSelection from './components/typeOfClubSelection';
import RegisterMember from './components/registerMember';


class RegisterPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registerSelectionToggle: true,
      typeOfClubSelectionToggle: false,
      registerMember: false,
    }

    this.registerToMemberToggle = this.registerToMemberToggle.bind(this);
    this.registerToClubToggle = this.registerToClubToggle.bind(this);
  }

  registerToClubToggle() {
    this.setState({
      registerSelectionToggle: !this.state.registerSelectionToggle,
      typeOfClubSelectionToggle: !this.state.typeOfClubSelectionToggle,
    });
  }

  registerToMemberToggle() {
    this.setState({
      registerSelectionToggle: !this.state.registerSelectionToggle,
      registerMember: !this.state.registerMember,
    });
  }

  render() {
    let showRegisterStep;

    if(this.state.registerSelectionToggle){
      showRegisterStep = <RegisterSelection toggleToRegisterMember={this.registerToMemberToggle} close={this.props.close} />;
    } else if(this.state.typeOfClubSelectionToggle) {
      showRegisterStep = <TypeOfClubSelection toggleToBack={this.registerToClubToggle} close={this.props.close} />;
    } else {
      showRegisterStep = <RegisterMember close={this.props.close} />;
    }

    return (
      <div className='popup_container'>
        {showRegisterStep}
      </div>
    );
  }
}

RegisterPopup.propTypes = {
  registerToggle: PropTypes.func,
};

export default RegisterPopup;
