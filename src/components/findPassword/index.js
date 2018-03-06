import React from 'react';
// import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

class FindPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundPasswordToggle: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.findPasswordByPhone = this.findPasswordByPhone.bind(this);
    this.findPasswordByEmail = this.findPasswordByEmail.bind(this);
    this.finish = this.finish.bind(this);
  }

  findPasswordByPhone() {
    this.setState({
      foundPasswordToggle: !this.state.foundPasswordToggle,
    });
  }

  findPasswordByEmail() {
    // to do
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if(target.id === 'club_phone') {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  }

  finish() {
    this.props.history.push(`/`);
  }

  render() {
    const contents = () => {
      if(this.state.foundPasswordToggle) {
        return (
          <div>
            <p>
              회원님의 패스워드를 찾았습니다. <br />
              로그인을 원하시면 해당 패스워드를 이용하여 로그인 해주세요.
            </p>
            <section>
              g1u****
            </section>
            <br />
            <br />
            <div className='submit-register' onClick={this.finish}>
              <input type="button" value="완료"/>
            </div>
          </div>
        );
      } else {
        return (
          <form>
            <div className='input-register-left'>
              <h3>
                휴대전화로 인증하기
              </h3>
              <p>
                회원가입시 등록한 휴대전화 번호와 같은 번호를 입력해 주세요. <br />
                입력하신 번호가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='club_userid' className='input-title'>아이디</label>
                <input type="text" id='club_userid' ref='club_userid'/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>전화번호</label>
                <input type="text" id='club_phone' ref='club_phone'/>
              </div>
              <div className='submit-register' >
                <input type="button" value="다음" onClick={this.findPasswordByPhone}/>
              </div>
            </div>

            <div className='line hide-on-med-and-down'></div>

            <div className='input-register-right'>
              <h3>
                이메일로 인증하기
              </h3>
              <p>
                회원가입시 등록한 이메일와 같은 이메일을 입력해 주세요. <br />
                입력하신 이메일 주소가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='club_userid' className='input-title'>아이디</label>
                <input type="text" id='club_userid' ref='club_userid'/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email'/>
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.findPasswordByPhone}/>
              </div>
            </div>
          </form>
        )
      }
    }
    return (
      <div className='findUserId-container'>
        <div className='container'>
          <h1>비밀번호 찾기</h1>
          {contents()}
        </div>
      </div>
    );
  }
}

FindPassword.propTypes = {

};

export default withRouter(FindPassword);
