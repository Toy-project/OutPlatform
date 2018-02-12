import React from 'react';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { memberLogin, clubLogin } from 'services/auth';

import { isEmpty } from 'helper/common';

class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      club_userid : {
        value: '',
        err: true,
      },

      club_pw : {
        value: '',
        err: true,
      },

      club_pw_confirm : {
        value: '',
        err: true,
      },
      err_msg: '아직 외주대학교 회원이 아니신가요?',
    }
    //팝업 토글 처리
    this.registerToggle = this.registerToggle.bind(this);

    //인풋 처리
    this.handleChange = this.handleChange.bind(this);

    //공백처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //submit 처리
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
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err = false;

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err : err,
      },
    });
  }

  handleEmptyValue() {
    if(isEmpty(this.state.userid.value)) this.refs.userid.focus();
    else if(isEmpty(this.state.pw.value)) this.refs.pw.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    const userid = this.state.userid.value;
    const pw = this.state.pw.value;

    if(!this.handleEmptyValue()) return false;

    // Login API 실행
    if(!this.state.type) {
      memberLogin(userid, pw)
        .then((response) => {
          localStorage.setItem('mem_user', JSON.stringify(response.data));
          this.props.history.push(`/`);
          window.location.reload();
        })
        .catch((err) => {
          this.setState({
            err_msg : '일반 회원이 맞으신가요? 다시 확인하시고 로그인해주시기 바랍니다.'
          });
        });
    } else {
      clubLogin(userid, pw)
        .then((response) => {
          localStorage.setItem('club_user', JSON.stringify(response.data));
          this.props.history.push(`/`);
          window.location.reload();
        })
        .catch((err) => {
          this.setState({
            err_msg : '단체 회원이 맞으신가요? 다시 확인하시고 로그인해주시기 바랍니다.'
          });
        });
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
        <div className='login-container'>
          <div className='login-inner'>
            <div className='close-btn' onClick={this.props.close}>
              <span className='x-icon'></span>
            </div>
            <h3>로그인</h3>
            <p className='p'>
              {this.state.err_msg}
            </p>
            <form onSubmit={this.handleSubmit}>
              <input type='text' id='userid' ref='userid' onChange={this.handleChange} placeholder='아이디를 입력해주세요.' />
              <input type='password' id='pw' ref='pw' onChange={this.handleChange} placeholder='패스워드를 입력해주세요.' />

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
      </div>
    );
  }
}

Login.propTypes = {
};

export default withRouter(Login);
