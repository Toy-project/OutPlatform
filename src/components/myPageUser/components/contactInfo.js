import React from 'react';
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as RegisterHelper from 'helper/registerHelper';

import * as MemberActions from 'actions/member/';
import * as ClubActions from 'actions/club/';
import * as Member from 'services/member';
import * as Club from 'services/club';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone : {
        value: '',
        err_msg: '',
        err: null,
      },
      phone_auth : {
        value: '',
        err_msg: '',
        err: null,
      },
      email : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_phone_auth_btn : null,
      isEditToggle : false,
    }

    this.editToggle = this.editToggle.bind(this);

    //Input 처리
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //연락처 인증
    this.responsePhoneAuth = this.responsePhoneAuth.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(target.id === 'email') {
      if(!Common.isEmpty(value)) {
        if(!RegisterHelper.isEmailAvailable(value)) {
          err_msg = '올바르지 않는 형식입니다.';
          err = true;
        }
      }
    }
    if(target.id === 'phone') {

      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      if(!Common.isEmpty(value)) {
        if(!RegisterHelper.isPhoneAvailable(value)) {
          err_msg = '올바르지 않는 전화번호입니다.';
          err = true;
        }
      }
    }

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err_msg: err_msg,
        err : Common.isEmpty(value) ? null : err,
      },
    });
  }

  handleBlur(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(Common.isEmpty(value)) return false;

    if(target.id === 'email') {
      if(!RegisterHelper.isEmailAvailable(target.value)) {
        err_msg = '올바르지 않는 형식입니다.';
        err = true;
      } else {
        if(target.value === this.props.email) return false;
        Member.getMemberEmail(target.value)
          .then((response) => {
            console.log(response.data);
            if(!response.data) {
              err_msg = '이용 가능한 이메일입니다.';
              err = false;
            } else {
              err_msg = '동일한 이메일이 존재합니다.';
              err = true;
            }

            this.setState({
              email : {
                ...this.state.email,
                err_msg: err_msg,
                err : err,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    this.setState({
      [target.id] : {
        value: target.value,
        err_msg: err_msg,
        err : err,
      },
    });
  }

  responsePhoneAuth() {
    this.setState({
      phone_auth : {
        ...this.state.phone_auth,
        err_msg: '인증에 성공하였습니다.',
        err : false,
      },
      club_phone_auth_btn : false,
    })
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.phone.value)) this.refs.phone.focus();
    else if(Common.isEmpty(this.state.phone_auth.value)) this.refs.phone_auth.focus();
    else if(Common.isEmpty(this.state.email.value)) this.refs.email.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.phone.err,
      this.state.phone_auth.err,
      this.state.email.err,
      this.state.club_phone_auth_btn
    ];

    //Empty data check
    if(!this.handleEmptyValue()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error) {
        isValid = false;
        return false;
      }
    });

    if(isValid) {
      if(this.props.type === 'member') {
        const data = {
          "mem_phone" : this.state.phone.value,
          "mem_email" : this.state.email.value,
        }

        this.props.fetchUpdateMember(this.props.id, data);
      }

      if(this.props.type === 'club') {
        const data = {
          "club_phone" : this.state.phone.value,
          "club_email" : this.state.email.value,
        }

        this.props.fetchUpdateClub(this.props.id, data);
      }
    }
  }

  editToggle() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
    });
  }

  render() {
    let editButton;
    let editContact;
    let editEmail;

    const errorClassName = (identifier) => {
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    //수정 버튼 Toggle
    if(!this.state.isEditToggle){
      editButton = (
        <div className='edit-btn'>
          <button className='emerald-btn' onClick={this.editToggle}>수정</button>
        </div>
      );

      editContact = this.props.phone;
      editEmail = this.props.email;
    } else if(this.state.isEditToggle) {
      editButton = (
        <div className='edit-btn'>
          <button className='gray-btn' onClick={this.editToggle}>취소</button>
          <button className='emerald-btn' onClick={this.handleSubmit}>확인</button>
        </div>
      );

      editContact = (
        <div>
          <input type="text" id='phone' ref='phone' onChange={this.handleChange}/>
          <a className={errorClassName(this.state.phone)}>{this.state.phone.err_msg}</a>
          <input type="text" id='phone_auth' ref='phone_auth' onChange={this.handleChange} />
          <input type="button" value="인증번호 발송" className='inspect-phone-btn' onClick={this.responsePhoneAuth} />
          <a className={errorClassName(this.state.phone_auth)}>{this.state.phone_auth.err_msg}</a>
        </div>
      );

      editEmail = (
        <div>
          <input type="text" id='email' ref='email' onBlur={this.handleBlur} onChange={this.handleChange}/>
          <a className={errorClassName(this.state.email)}>{this.state.email.err_msg}</a>
        </div>
      );
    }
    return (
      <div className='contact-info-container'>
        <div className='container'>
          {editButton}
          <div className='title-wrapper'>
            <span></span>
            <h3>연락처 정보</h3>
          </div>
          <div className='input-container'>
            <form>
              <div className='info-input'>
                <label htmlFor='phone'>대표 전화번호</label>
                {editContact}
              </div>
              <div className='info-input'>
                <label htmlFor='email'>이메일 주소</label>
                {editEmail}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ContactInfo.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    member: state.member,
    club: state.club,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateMember: (id, data) => {
      dispatch(MemberActions.fetchUpdateMember(id, data));
    },
    fetchUpdateClub: (club_id, data) => {
      dispatch(ClubActions.fetchUpdateClub(club_id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
