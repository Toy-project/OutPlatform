import React from 'react';
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as RegisterHelper from 'helper/registerHelper';

import * as MemberActions from 'actions/member/';
import * as ClubActions from 'actions/club/';
import * as Member from 'services/member';
import * as Club from 'services/club';

class ContactInfoEditEmail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email : {
        value: this.props.email,
        err_msg: '변경할 이메일을 입력해주세요.',
        err: null,
      },
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);

    //Close
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '변경할 이메일을 입력해주세요.';
    let err = null;

    if(target.id === 'email') {
      if(!Common.isEmpty(value)) {
        if(!RegisterHelper.isEmailAvailable(value)) {
          err_msg = '올바르지 않는 형식입니다.';
          err = true;
        }
      }
    }

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err_msg: err_msg,
        err : err,
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
        if(target.value === this.props.email) {
          err_msg = '현재와 동일한 이메일입니다.';
          err = true;
        } else {
          Member.getMemberEmail(target.value)
            .then((response) => {
              if(!response.data) {
                Club.getClubEmail(target.value)
                  .then((response)=> {
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
                  })
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
    }

    this.setState({
      [target.id] : {
        value: target.value,
        err_msg: err_msg,
        err : err,
      },
    });
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.email.value)) this.refs.email.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.email.err,
    ];

    //Empty data check
    if(!this.handleEmptyValue()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error || Common.isNull(error)) {
        isValid = false;
        return false;
      }
    });

    if(isValid) {
      if(this.props.type === 'member') {
        const data = {
          "mem_email" : this.state.email.value,
        }

        this.props.fetchUpdateMember(this.props.id, data);
      }

      if(this.props.type === 'club') {
        const data = {
          "club_email" : this.state.email.value,
        }

        this.props.fetchUpdateClub(this.props.id, data);
      }

      this.setState({
        email : {
          ...this.state.email,
          err_msg : '성공적으로 업데이트를 하였습니다.'
        }
      });
    }
  }

  handleClose() {
    this.props.close();
  }

  componentDidMount() {
    this.refs.email.focus();
  }

  render() {
    const errorClassName = (identifier) => {
      //API 콜 에러일 때
      if(this.props.club.error || this.props.member.error) {
        return 'warning-color';
      }

      //폼 데이터 에러일 때
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    const msg = () => {
      //API 콜 에러일 때
      if(this.props.club.error || this.props.member.error) {
        return '업데이트 중 오류가 발생하였습니다. 다시 이용하여주세요.';
      }

      if( this.props.club.isLoading ||
          this.props.member.isLoading) {
        return '잠시만 기달려주세요.';
      }

      return this.state.email.err_msg;
    }

    return (
      <div className='popup_container'>
        <div className='contact-info-edit-email'>
          <div className='close-btn-right' onClick={this.handleClose}>
            <span className='x-icon'></span>
          </div>
          <div className='info-title'>
            <h1>이메일 주소 수정</h1>
            <label className={errorClassName(this.state.email)} htmlFor='email'>
              {msg()}
            </label>
          </div>
          <div className='info-input'>
            <input type="text" id='email' ref='email' onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={this.props.email}/>
          </div>
          <div className='info-btn'>
            <button onClick={this.handleSubmit}>확인</button>
            <button onClick={this.handleClose}>취소</button>
          </div>
        </div>
      </div>
    );
  }
}

ContactInfoEditEmail.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    club: state.club,
    member: state.member,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateMember: (mem_id, data) => {
      dispatch(MemberActions.fetchUpdateMember(mem_id, data));
    },
    fetchUpdateClub: (club_id, data) => {
      dispatch(ClubActions.fetchUpdateClub(club_id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoEditEmail);
