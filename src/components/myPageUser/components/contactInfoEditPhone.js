import React from 'react';
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as Helper from 'helper/registerHelper';

import * as MemberActions from 'actions/member/';
import * as ClubActions from 'actions/club/';
import * as Member from 'services/member';
import * as Club from 'services/club';
import * as PhoneAuth from 'services/phoneAuth';

class ContactInfoEditPhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone : {
        value: this.props.phone,
        err_msg: '변경할 연락처를 입력해주세요.',
        err: null,
      },
      phone_auth : {
        value: '인증코드를 입력해주세요',
        err_msg: '인증코드를 입력해주세요',
        err: null,
      },

      phone_auth_btn : {
        type: false,
        loading: false,
        err: true
      }
    }

    //Input 처리
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //연락처 인증
    this.requestPhoneAuth = this.requestPhoneAuth.bind(this);
    this.responsePhoneAuth = this.responsePhoneAuth.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '인증코드를 입력해주세요';
    let err = null;

    if(target.id === 'phone') {

      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      err_msg = '변경할 연락처를 입력해주세요.';

      if(!Common.isEmpty(value)) {
        if(!Helper.isPhoneAvailable(value)) {
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
        err : err,
      },
    });
  }

  requestPhoneAuth(e) {
    const phone = this.state.phone;
    const phone_ref = this.refs.phone;
    const phone_auth = this.state.phone_auth;
    const phone_auth_btn = this.state.phone_auth_btn;

    if(Common.isEmpty(phone.value)) { phone_ref.focus();
    } else if(!Helper.isPhoneAvailable(phone.value)) { phone_ref.focus();
    } else {

      // if(this.state.phone.value === this.props.phone) {
      //   this.setState({
      //     phone : {
      //       ...this.state.phone,
      //       err_msg : '이미 등록된 연락처입니다.'
      //     }
      //   });
      //   return false;
      // }

      const phone = phone_ref.value.split('-');
      const to = `+82${phone[0]}${phone[1]}${phone[2]}`;

      //데이터 로딩 true
      this.setState({
        phone_auth : {
          ...phone_auth,
          err : null,
          err_msg : '',
        },
        phone_auth_btn : {
          ...phone_auth_btn,
          loading : !phone_auth_btn.loading
        }
      });

      //Sending Phone Auth request
      PhoneAuth.sendingVerifiedCode(to)
        .then((res) => {
          //성공일 때
          const data = res.data;

          let err_msg = '';
          let err = null;
          let type = phone_auth_btn.type;
          let loading = false;

          if(!Common.isNull(localStorage.getItem('request_id'))) {
            localStorage.removeItem('request_id', data.request_id);
            localStorage.setItem('request_id', data.request_id);
          } else {
            localStorage.setItem('request_id', data.request_id);
          }

          if(data.status === '0') {
            err_msg = '인증번호가 전송되었습니다. 잠시만 기다려주세요.';
            type = !type;
          } else if(data.status === '10') {
            err_msg = '이미 전송되었습니다. 확인 후 인증번호를 입력해주세요.';
            type = !type;
          }

          phone_ref.value = '';

          this.setState({
            phone_auth : {
              ...phone_auth,
              err_msg : err_msg,
              err : err
            },
            phone_auth_btn : {
              ...phone_auth_btn,
              type : type,
              loading : loading
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  responsePhoneAuth(e) {
    const phone_auth = this.state.phone_auth;
    const phone_auth_ref = this.refs.phone_auth;
    const phone_auth_btn = this.state.phone_auth_btn;

    if(Common.isEmpty(phone_auth.value)) { phone_auth_ref.focus();
    } else {
      if(Common.isNull(localStorage.getItem('request_id'))) return false;

      const data = {
        request_id : localStorage.getItem('request_id'),
        code : phone_auth.value
      }

      //데이터 로딩 true
      this.setState({
        phone_auth : {
          ...phone_auth,
          err : null,
          err_msg : '',
        },
        phone_auth_btn : {
          ...phone_auth_btn,
          loading : !phone_auth_btn.loading
        }
      });

      PhoneAuth.checkVerifiedCode(data)
        .then((res) => {
          const result = res.data;

          let err_msg = '';
          let err = null;
          let type = phone_auth_btn.type;
          let loading = false;

          //인증 완료
          if(result.status === '0') {
            err_msg = '인증이 완료되었습니다.';
            err = false;

            localStorage.removeItem('request_id');
          //인증 코드 일치 하지 않을 때
          } else if(result.status === '16' || result.status === '17') {
            err_msg = '인증번호가 일치하지 않습니다. 다시 입력해주세요.';
            err = true,

            phone_auth_ref.focus();

          //인증 코드 실패
          } else if(result.status === '6') {
            err_msg = '많은 입력 실패로 인하여 다시 인증번호를 받아주세요.';
            err = true;
            type = !type;

            this.setState({
              phone: {
                ...this.state.phone,
                err : err,
                err_msg : err_msg
              }
            });
            console.log(this.state.phone.value);
            phone_auth_ref.value = this.state.phone.value;
          } else {
            //to do list
          }

          this.setState({
            phone_auth : {
              ...phone_auth,
              err : err,
              err_msg : err_msg
            },
            phone_auth_btn : {
              ...phone_auth_btn,
              type: type,
              loading : loading,
              err: err,
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.phone.value)) this.refs.phone.focus();
    else if(Common.isEmpty(this.state.phone_auth.value)) this.refs.phone_auth.focus();
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
      this.state.phone_auth_btn.err
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
        }

        this.props.fetchUpdateMember(this.props.id, data);
      }

      if(this.props.type === 'club') {
        const data = {
          "club_phone" : this.state.phone.value,
        }

        this.props.fetchUpdateClub(this.props.id, data);
      }

      this.setState({
        phone_auth : {
          ...this.state.phone_auth,
          err_msg : '성공적으로 업데이트를 하였습니다.',
        }
      });
    } else {
      this.setState({
        phone: {
          ...this.state.phone,
          err_msg : '인증 후 이용해주세요.'
        }
      });
    }
  }

  handleClose() {
    this.props.close();
  }

  componentDidMount() {
    this.refs.phone.focus();
  }

  render() {
    const errorClassName = (identifier) => {
      //API call 에러일 때
      if(this.props.club.error || this.props.member.error) {
        return 'warning-color';
      //폼 데이터 에러일 때
      }

      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }
    const phone = () => {
      if(this.state.phone_auth_btn.type) {
        return (
          <div className='info-input'>
            <input type="text" id='phone_auth' ref='phone_auth' onChange={this.handleChange}/>
            <input type="button" value="발송" onClick={this.responsePhoneAuth} />
          </div>
        );
      } else {
        return (
          <div className='info-input'>
            <input type="text" id='phone' ref='phone' onChange={this.handleChange} defaultValue={this.state.phone.value}/>
            <input type="button" value="인증번호 발송" onClick={this.requestPhoneAuth} />
          </div>
        );
      }
    }

    const msg = () => {
      //API 콜 에러일 때
      if(this.props.club.error || this.props.member.error) {
        return '업데이트 중 오류가 발생하였습니다. 다시 이용하여주세요.';
      }

      if(this.state.phone_auth_btn.loading ||
          this.props.club.isLoading ||
          this.props.member.isLoading) {
        return '잠시만 기달려주세요.';
      } else {
        if(this.state.phone_auth_btn.type) {
          return this.state.phone_auth.err_msg;
        } else {
          return this.state.phone.err_msg;
        }
      }
    }

    return (
      <div className='popup_container'>
        <div className='contact-info-edit-phone'>
          <div className='close-btn-right' onClick={this.handleClose}>
            <span className='x-icon'></span>
          </div>
          <div className='info-title'>
            <h1>연락처 수정</h1>
            <label className={errorClassName(this.state.phone_auth_btn.type ? this.state.phone_auth : this.state.phone)} htmlFor='phone'>
              {msg()}
            </label>
          </div>
          {phone()}
          <div className='info-btn'>
            <button onClick={this.handleSubmit}>확인</button>
            <button onClick={this.handleClose}>취소</button>
          </div>
        </div>
      </div>
    );
  }
}

ContactInfoEditPhone.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoEditPhone);
