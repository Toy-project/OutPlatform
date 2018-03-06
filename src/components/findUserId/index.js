import React from 'react';
// import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

class FindUserId extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundUserIdToggle: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.findUserIdByPhone = this.findUserIdByPhone.bind(this);
    this.findUserIdByEmail = this.findUserIdByEmail.bind(this);
    this.finish = this.finish.bind(this);
  }

  findUserIdByPhone() {
    this.setState({
      foundUserIdToggle: !this.state.foundUserIdToggle,
    });
  }

  findUserIdByEmail() {
    //to do
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
      if(this.state.foundUserIdToggle) {
        return (
          <div>
            <p>
              회원님의 아이디를 찾았습니다. <br />
              로그인을 원하시면 해당 아이디를 이용하여 로그인 해주세요.
            </p>
            <section>
              sayyou0918
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
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>전화번호</label>
                <input type="text" id='club_phone' ref='club_phone' onChange={this.handleChange} />
              </div>
              <div className='submit-register' >
                <input type="button" value="다음" onClick={this.findUserIdByPhone}/>
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
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email' onChange={this.handleChange} />
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.findUserIdByPhone}/>
              </div>
            </div>
          </form>
        )
      }
    }
    return (
      <div className='findUserId-container'>
        <div className='container'>
          <h1>아이디 찾기</h1>
          {contents()}
        </div>
      </div>
    );
  }
}

FindUserId.propTypes = {

};

export default withRouter(FindUserId);
