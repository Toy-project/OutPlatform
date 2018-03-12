import React from 'react';
// import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import * as MailAuthHelper from 'helper/mailAuthHelper';

import * as Club from 'services/club';
import * as Member from 'services/member';
import * as MailAuth from 'services/mailAuth';

import { InnerLoading, EmailAuth } from 'components/';

class FindUserId extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundUserIdToggle: false,
      isLoading : false,
      email: '',
      foundUserId : '',
      flag: '',

      registerEmailAuthToggle: false,
      //이메일 인증용
      error: false,
      //이메일 인증 체크여부
      emailAuthCheck: false,
    }

    this.handleChange = this.handleChange.bind(this);

    this.findMemberUserIdByEmail = this.findMemberUserIdByEmail.bind(this);
    this.findClubUserIdByEmail = this.findClubUserIdByEmail.bind(this);
    this.foundUserIdToggle = this.foundUserIdToggle.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailAuthCheck = this.emailAuthCheck.bind(this);
    this.registerEmailAuthToggle = this.registerEmailAuthToggle.bind(this);

    this.finish = this.finish.bind(this);
  }

  emailAuthCheck() {
    this.setState({
      emailAuthCheck: !this.state.emailAuthCheck,
    });
  }

  foundUserIdToggle() {
    if(this.state.flag === 'member') {
      this.findMemberUserIdByEmail();
    } else {
      this.findClubUserIdByEmail();
    }

    this.emailAuthCheck();
  }

  registerEmailAuthToggle() {
    this.setState({
      registerEmailAuthToggle: !this.state.registerEmailAuthToggle,
    });
  }

  handleChange(e) {
    let flag = 'member';

    if(e.target.id === 'club_email') {
      flag = 'club';
    }

    this.setState({
      email : e.target.value,
      flag: flag,
    });
  }

  findMemberUserIdByEmail() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    Member.getMemberEmail(this.refs.mem_email.value)
      .then((res) => {
        if(res.data) {
          this.setState({
            foundUserId: res.data.mem_userid,
          });
        }

        this.setState({
          isLoading: !this.state.isLoading,
          foundUserIdToggle: !this.state.foundUserIdToggle,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: !this.state.isLoading,
        });
      });
  }

  findClubUserIdByEmail() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    Club.getClubEmail(this.refs.club_email.value)
      .then((res) => {
        if(res.data) {
          this.setState({
            foundUserId: res.data.club_userid,
          });
        }

        this.setState({
          isLoading: !this.state.isLoading,
          foundUserIdToggle: !this.state.foundUserIdToggle,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: !this.state.isLoading,
        });
      });
  }

  finish() {
    this.props.history.push(`/`);
  }

  handleSubmit() {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    MailAuth.sendEmail(this.state.email)
    .then((res) => {
      if(res.data) {
        //Save auth
        MailAuthHelper.setMailAuth(res.data.auth);

        //5분 후에 자동으로 삭제
        setTimeout(() => {
          MailAuthHelper.removeMailAuth();
        }, 300000);

        this.setState({
          isLoading: !this.state.isLoading,
        });

        this.registerEmailAuthToggle();
      }
    })
    .catch((err) => {
      //loading
      this.setState({
        isLoading: !this.state.isLoading,
      });
    });
  }

  render() {
    const mailAuth = this.state.registerEmailAuthToggle ? <EmailAuth close={this.registerEmailAuthToggle} emailAuthCheck={this.foundUserIdToggle} recevier={this.state.email} error={false} /> : '';

    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

    const msg = () => {
      if(this.state.foundUserId) {
        return (
          <div>
            <p>
              회원님의 아이디를 찾았습니다. <br />
              로그인을 원하시면 해당 아이디를 이용하여 로그인 해주세요.
            </p>
            <section>
              {this.state.foundUserId}
            </section>
          </div>
        );
      } else {
        return (
          <p>
            해당 이메일로 가입된 정보가 없습니다. <br />
            회원가입을 이용하여 생성하여 주세요.
          </p>
        );
      }
    }

    const contents = () => {
      if(this.state.emailAuthCheck) {
        return (
          <div>
            {msg()}
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
                [일반회원] 이메일로 인증하기
              </h3>
              <p>
                회원가입시 등록한 이메일와 같은 이메일을 입력해 주세요. <br />
                입력하신 이메일 주소가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='mem_name' className='input-title'>이름</label>
                <input type="text" id='mem_name' ref='mem_name' />
              </div>
              <div className='input-register'>
                <label htmlFor='mem_email' className='input-title'>이메일 주소</label>
                <input type="text" id='mem_email' ref='mem_email' onChange={this.handleChange} />
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.handleSubmit}/>
              </div>
            </div>

            <div className='line hide-on-med-and-down'></div>

            <div className='input-register-right'>
              <h3>
                [단체회원] 이메일로 인증하기
              </h3>
              <p>
                회원가입시 등록한 이메일와 같은 이메일을 입력해 주세요. <br />
                입력하신 이메일 주소가 같은 경우에만 인증번호를 받으실 수 있습니다.
              </p>
              <div className='input-register'>
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' />
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email' onChange={this.handleChange} />
              </div>
              <div className='submit-register'>
                <input type="button" value="다음" onClick={this.handleSubmit}/>
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
        {this.state.isLoading ? loading : ''}
        {mailAuth}
      </div>
    );
  }
}

FindUserId.propTypes = {

};

export default withRouter(FindUserId);
