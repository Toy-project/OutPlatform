import React from 'react';

import './scss/index.scss';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.test = this.test.bind(this);
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

  test(e) {
    e.preventDefault();
    this.props.close();
    this.props.register();
  }

  render() {
    return(
      <div id='popup_container' className='popup_container'>
        <div class='login-inner'>
          <h3>로그인</h3>
          <p class='p'>
            아직 외주대학교 회원이 아니신가요?
          </p>
          <form>
            <input type='text' placeholder='아이디를 입력해주세요.' />
            <input type='password' placeholder='패스워드를 입력해주세요.' />
            <input type='submit' value='로그인' />
            <button onClick={this.test} className='gray-btn'>간편 가입하기</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
};

export default Login;
