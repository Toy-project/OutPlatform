import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class RegisterSelection extends React.Component {
  constructor(props){
    super(props);

    this.onCickToClubRegister = this.onCickToClubRegister.bind(this);
  }

  onCickToClubRegister() {
    this.props.history.push(`/register/`);
  }

  render() {
    return (
      <div className='register-selection-inner'>
        <h3>회원가입</h3>
        <p>
          단체회원가입과 일반회원가입 중 <br />원하시는 가입 유형을 선택해주세요!
        </p>
        <button onClick={this.props.toggleToRegisterMember} className="emerald-btn">일반 회원가입</button>
        <button onClick={this.onCickToClubRegister} className="blue-btn">단체 회원가입</button>
        <p className='warning'>
          *일반회원가입으로는 단체 개설이 불가능하니 단체 계정을 하나 더 만들 것을 권장드립니다.
        </p>
      </div>
    );
  }
}

RegisterSelection.propTypes = {
  toggleToClub: PropTypes.func,
  toggleToRegisterMember: PropTypes.func,
};

export default withRouter(RegisterSelection);
