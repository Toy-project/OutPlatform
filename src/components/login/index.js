import React from 'react';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { memberLogin, clubLogin } from 'services/auth';

import { inputValidator } from 'helper/registerHelper';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      'userid' : '',
      'pw' : '',
      'type' : '',
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
    inputValidator(e.target.id, 'login');

    //체크버튼일 경우
    if(e.target.id === 'type'){
      this.setState({
        [e.target.id]: e.target.checked,
      });

      return false;
    }

    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  showFormError() {
    const inputs = document.querySelectorAll('.login-inner input:not([type="button"]):not([type="submit"])');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = inputValidator(input.id, 'login');

      if(!isInputValid){

        isFormValid = false;
      }
    });

    return isFormValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()){
      const userid = this.state.userid;
      const pw = this.state.pw;

      // Login API 실행
      if(!this.state.type) {
        memberLogin(userid, pw)
          .then((response) => {
            localStorage.setItem('mem_user', JSON.stringify(response.data));
            this.props.history.push(`/`);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        clubLogin(userid, pw)
          .then((response) => {
            localStorage.setItem('club_user', JSON.stringify(response.data));
            this.props.history.push(`/`);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

            <div className='type'>
              <label htmlFor='type' className='title'>단체</label>
              <input type="checkbox" id='type' onChange={this.handleChange}/>
              <label htmlFor='type'></label>
            </div>

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

export default withRouter(Login);
