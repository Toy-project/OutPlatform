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
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.closePopup);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closePopup);
  }

  //팝업을 종료하는 함수
  closePopup = (e) => {
    if (e.target.id === 'popup_container'){
      this.props.close();
    }
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
      showRegisterStep = <RegisterSelection toggleToClub={this.registerToClubToggle} toggleToRegisterMember={this.registerToMemberToggle} />;
    } else if(this.state.typeOfClubSelectionToggle) {
      showRegisterStep = <TypeOfClubSelection toggleToBack={this.registerToClubToggle} />;
    } else {
      showRegisterStep = <RegisterMember />;
    }

    return (
      <div id='popup_container' className='popup_container'>
        {showRegisterStep}
      </div>
    );
  }
}

RegisterPopup.propTypes = {
  registerToggle: PropTypes.func,
};

export default RegisterPopup;
