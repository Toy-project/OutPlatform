import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';
import RegisterSelection from './components/registerSelection';
import RegisterFinish from './components/registerFinish';
import RegisterMember from './components/registerMember';

import { InnerLoading, EmailAuth } from 'components/';

import { createMember } from 'services/member';

class RegisterPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registerSelectionToggle: true,
      registerMemberToggle: false,
      registerEmailAuthToggle: false,

      //이메일 인증용
      error: false,
      //이메일 인증 체크여부
      emailAuthCheck: false,

      //폼 작성 데이터
      data : [],
      isLoading : false,
    }

    this.registerMemberToggle = this.registerMemberToggle.bind(this);
    this.registerEmailAuthToggle = this.registerEmailAuthToggle.bind(this);

    this.setEmailAuthFlag = this.setEmailAuthFlag.bind(this);
    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.setState({
      data: data,
    });
  }

  setEmailAuthFlag() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    createMember(this.state.data)
      .then((response) => {
        //loading
        this.setState({
          isLoading: !this.state.isLoading,
          emailAuthCheck: !this.state.emailAuthCheck,
        });
      })
      .catch((err) => {
        this.registerEmailAuthToggle();
        this.setState({
          isLoading: !this.state.isLoading,
          error: !this.state.error,
        });
      });
  }

  registerEmailAuthToggle() {
    this.setState({
      registerEmailAuthToggle: !this.state.registerEmailAuthToggle,
    });
  }

  registerMemberToggle() {
    this.setState({
      registerMemberToggle: !this.state.registerMemberToggle,
    });
  }

  render() {
    let showRegisterStep = <RegisterSelection toggleToRegisterMember={this.registerMemberToggle} close={this.props.close} />;
    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

    if(this.state.registerMemberToggle){
      showRegisterStep = <RegisterMember toggleToRegisterEmailAuth={this.registerEmailAuthToggle} setData={this.setData} close={this.props.close} />;
    }

    if(this.state.registerEmailAuthToggle){
      showRegisterStep = <EmailAuth close={this.registerEmailAuthToggle} emailAuthCheck={this.setEmailAuthFlag} recevier={this.state.data.mem_email} error={this.state.error} />;
    }

    if(this.state.emailAuthCheck) {
      showRegisterStep = <RegisterFinish close={this.props.close} data={this.state.data} />;
    }

    return (
      <div className='popup_container'>
        {showRegisterStep}
        {this.state.isLoading ? loading : ''}
      </div>
    );
  }
}

RegisterPopup.propTypes = {
  registerToggle: PropTypes.func,
};

export default RegisterPopup;
