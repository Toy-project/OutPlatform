import React from 'react';
import PropTypes from 'prop-types';

class RegisterSelection extends React.Component {

  render() {
    return (
      <div className='register-selection-inner'>
        <h3>회원가입</h3>
        <p>
          동아리, 학회, 소모임 등의 <br /> <span>대학교 관련 단체 소속</span>이신가요?
        </p>
        <button onClick={this.props.toggleToClub} className="emerald-btn">네, 단체 소속이에요.</button>
        <button onClick={this.props.toggleToRegisterMember} className="gray-btn">아니요, 단체가 아니예요.</button>
      </div>
    );
  }
}

RegisterSelection.propTypes = {
  toggleToClub: PropTypes.func,
  toggleToRegisterMember: PropTypes.func,
};

export default RegisterSelection;
