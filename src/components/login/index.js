import React from 'react';

import './scss/index.scss';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      'userid' : '',
      'pw' : '',
      'login_toggle' : '',
    }

    this.registerToggle = this.registerToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.closePopup);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closePopup);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });

    this.showInputError(e.target.id);
  }

  showFormError() {
    const inputs = document.querySelectorAll('.login-inner input:not([type="button"]):not([type="submit"])');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = this.showInputError(input.id);

      if(!isInputValid){

        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(id){
    const element = document.getElementById(id);

    if(element.value === ''){
      element.className = 'error';
      return false;
    } else {
      element.className = '';
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()){
      // Login API 실행
    }
  }

  //팝업을 종료하는 함수
  closePopup = (e) => {
    if (e.target.id === 'popup_container'){
      this.props.close();
    }
  }

  registerToggle(e) {
    e.preventDefault();
    this.props.close();
    this.props.register();
  }

  render() {
    return(
      <div id='popup_container' className='popup_container'>
        <div className='login-inner'>
          <h3>로그인</h3>
          <p className='p'>
            아직 외주대학교 회원이 아니신가요?
          </p>
          <form onSubmit={this.handleSubmit}>
            <input type='text' id='userid' onChange={this.handleChange} placeholder='아이디를 입력해주세요.' />
            <input type='password' id='pw' onChange={this.handleChange} placeholder='패스워드를 입력해주세요.' />
            <input type='submit' value='로그인' />
            <button onClick={this.registerToggle} className='gray-btn'>간편 가입하기</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
};

export default Login;
