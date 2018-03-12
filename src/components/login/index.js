import React from 'react';
import './scss/index.scss';

import LoginSelection from './components/loginSelection';
import Login from './components/login';

class LoginContainer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loginToggle: false,
      loginMemberToggle : false,
      loginClubToggle : false,
    }
    this.loginClubToggle = this.loginClubToggle.bind(this);
    this.loginMemberToggle = this.loginMemberToggle.bind(this);
  }

  loginMemberToggle() {
    this.setState({
      loginMemberToggle: !this.state.loginMemberToggle,
    })
  }

  loginClubToggle() {
    this.setState({
      loginClubToggle: !this.state.loginClubToggle,
    })
  }

  handleClose() {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  registerToggle(e) {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
      this.props.register();
    }, 300);
  }

  render() {

    const loginToggle = () => {
      //일반 로그인 버튼을 눌렸을 때
      if(this.state.loginMemberToggle) {
        return <Login type={false} close={this.props.close} />;
      //단체 로그인 버튼을 눌렸을 때
      } else if(this.state.loginClubToggle) {
        return <Login type={true} close={this.props.close} />;
      } else {
        return <LoginSelection close={this.props.close}
                               loginMemberToggle={this.loginMemberToggle}
                               loginClubToggle={this.loginClubToggle}/>;
      }
    }
    return loginToggle();
  }
}

LoginContainer.propTypes = {
};

export default LoginContainer;
