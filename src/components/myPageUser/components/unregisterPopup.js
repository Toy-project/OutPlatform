import React from 'react';
import  { withRouter } from 'react-router-dom';

import * as Common from 'helper/common';
import * as LoginHelper from 'helper/loginHelper';

import * as Auth from 'services/auth';
import { deleteClub } from 'services/club';
import { deleteMember } from 'services/member';

class UnregisterPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pw : {
        err: false,
      }
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    //Empty Value check
    if(Common.isEmpty(this.refs.pw.value)) {
      this.refs.pw.focus();
      return false;
    }

    if(this.props.type === 'member') {
      Auth.memberLogin(this.props.userid, this.refs.pw.value)
        .then((response) => {
          if(response.data.isValid) {
            deleteMember(this.props.id)
              .then((response) => {
                //해당 토큰 해제 후 메인으로 이동
                LoginHelper.removeToken();
                this.props.history.push(`/`);
              })
              .then((err) => {
                //to do
              });
          }
        })
        .catch((err) => {
          //to do
        });
    } else if(this.props.type === 'club') {
      Auth.clubLogin(this.props.userid, this.refs.pw.value)
        .then((response) => {
          if(response.data.isValid) {
            deleteClub(this.props.id)
              .then((response) => {
                //해당 토큰 해제 후 메인으로 이동
                LoginHelper.removeToken();
                this.props.history.push(`/`);
              })
              .then((err) => {
                //to do
              });
          }
        })
        .catch((err) => {
          //to do
        });
    } else {
      //to do
    }
  }

  handleClose() {
    this.props.close();
  }
  render() {
    return (
      <div className='popup_container'>
        <div className='unregister-popup-container'>
          <div className='close-btn' onClick={this.handleClose}>
            <span className='x-icon'></span>
          </div>
          <div className='header'>
            <h3>회원탈퇴</h3>
            <p>
              정말 탈퇴하시겠습니까? <br />
              회원 탈퇴 시 모든 정보와 이 계정으로 만든 단체 또한 삭제됩니다.
            </p>
          </div>
          <div className='contents'>
            <label htmlFor='pw'>비밀번호</label>
            <input type='password' id='pw' ref='pw' />
          </div>
          <div className='footer'>
            <button className='gray-btn' onClick={this.handleClose}>닫기</button>
            <button className='emerald-btn' onClick={this.handleSubmit}>탈퇴</button>
          </div>
        </div>
      </div>
    );
  }
}

UnregisterPopup.propTypes = {
};

export default withRouter(UnregisterPopup);
