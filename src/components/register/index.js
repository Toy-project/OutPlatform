import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import * as Helper from 'helper/registerHelper';
import * as Common from 'helper/common';

import { getClubUserId, createClub, getClubEmail, getClubName } from 'services/club';
import * as Member from 'services/member';
import * as PhoneAuth from 'services/phoneAuth';
import * as College from 'services/colleges';

import RegisterFinish from 'components/registerPopup/components/registerFinish';
import { InnerLoading } from 'components/';
import FindCollege from './components/findCollege';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      club_userid : {
        value: '',
        err_msg: '5자 이상 12자 이내로 지어주세요.',
        err: null,
      },

      club_pw : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_pw_confirm : {
        value: '',
        err_msg: '영문,숫자,특수문자 포함 12자이내.',
        err: null,
      },

      club_email : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_username : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_phone : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_phone_auth : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_name : {
        value: '',
        err_msg: '동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!',
        err: null,
      },

      cate_id : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_college : {
        value: '',
        err_msg: '',
        err: null,
      },

      union_enabled : {
        value: '',
        err_msg: '',
        err: null,
      },

      club_copyright : {
        value: '',
        err_msg: '동아리의 매력을 한 줄로 설명해주세요!(30자 이내)',
        err: null,
      },

      "club_phone_auth_btn" : {
        type: false,
        err: true,
        loading: false,
      },

      findCollegeToggle : false,
      registerFinishToggle : false,
      isLoading : false,
    }

    //Input 처리
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //연락처 인증
    this.requestPhoneAuth = this.requestPhoneAuth.bind(this);
    this.responsePhoneAuth = this.responsePhoneAuth.bind(this);

    this.setCollegeName = this.setCollegeName.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);

    this.registerFinishToggle = this.registerFinishToggle.bind(this);
    this.isFindCollegeToggle = this.isFindCollegeToggle.bind(this);
  }

  setCollegeName(value) {
    this.refs.club_college.value = value;
    this.setState({
      club_college: {
        value: value,
        err_msg: '',
        err: false,
      }
    })
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = null;

    if(target.id === 'club_userid') {
      err_msg = '5자 이상 12자 이내로 지어주세요.';
      if(!Common.isEmpty(value)) {
        if(!Helper.isUserIdAvailable(value)) {
          err = true;
        } else {
          err_msg = '이용 가능한 아이디입니다.';
          err = false;
        };
      }
    }
    if(target.id === 'club_pw' || target.id === 'club_pw_confirm') {
      if(target.id === 'club_pw_confirm') {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
      }
      if(!Common.isEmpty(value)) {
        if(!Helper.isPasswordAvailable(value)) {
          err_msg = '영문,숫자,특수문자 포함 12자이내';
          err = true;
        } else {
          err_msg = '이용 가능한 비밀번호입니다.';
          err = false;
        }
      }
    }
    if(target.id === 'club_email') {
      if(!Common.isEmpty(value)) {
        if(!Helper.isEmailAvailable(value)) {
          err_msg = '올바르지 않는 형식입니다.';
          err = true;
        }
      }
    }
    if(target.id === 'club_username') {
      if(Common.isEmpty(target.value)) {
        err_msg = '이름을 입력해주세요.';
        err = true;
      }
    }
    if(target.id === 'club_phone') {

      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      if(!Common.isEmpty(value)) {
        if(!Helper.isPhoneAvailable(value)) {
          err_msg = '올바르지 않는 전화번호입니다.';
          err = true;
        }
      }
    }
    if(target.id === 'club_name') {
      err_msg = '동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!';
      if(!Common.isEmpty(value)) {
        if(!Helper.isNameAvailable(value)) {
          err = true;
        } else {
          err_msg = '이용 가능한 동아리 이름입니다.';
          err = false;
        }
      }
    }
    if(target.id === 'club_copyright') {
      err_msg = '5자 이상 30자 이내만 가능합니다!';
      if(!Common.isEmpty(value)) {
        if(!Helper.isCopyrightAvailable(value)) {
          err = true;
        } else {
          err_msg = '이용 가능합니다.';
          err = false;
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

    if(target.id === 'club_userid') {
      if(!Helper.isUserIdAvailable(target.value)) {
        err_msg = '5자 이상 12자 이내로 지어주세요.';
        err = true;
      } else {
        this.setState({
          isLoading: !this.state.isLoading,
        });
        getClubUserId(target.value)
          .then((response) => {
            if(!response.data) {
              Member.getMemberUserId(target.value)
                .then((response) => {
                  if(!response.data) {
                    err_msg = '이용 가능한 아이디입니다.';
                    err = false;
                  } else {
                    err_msg = '동일한 아이디가 존재합니다.';
                    err = true;
                  }

                  this.setState({
                    club_userid : {
                      ...this.state.club_userid,
                      err_msg: err_msg,
                      err : err,
                    },
                  });
                })
            } else {
              err_msg = '동일한 아이디가 존재합니다.';
              err = true;
            }

            this.setState({
              club_userid : {
                ...this.state.club_userid,
                err_msg: err_msg,
                err : err,
              },
              isLoading: !this.state.isLoading,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: !this.state.isLoading,
            });

            //to do
          });
      }
    }

    if(target.id === 'club_pw' || target.id === 'club_pw_confirm') {
      if(!Helper.isPasswordAvailable(target.value)) {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
        err = true;
      } else {
        if(target.id === 'club_pw_confirm') {
          const club_pw = this.state.club_pw.value;
          if(!Helper.compareTo(target.value, club_pw)) {
            err_msg = '비밀번호가 일치하지 않습니다.';
            err = true;
          } else {
            err_msg = '이용 가능한 비밀번호입니다.';
            err = false;
          }
        }
      }
    }

    if(target.id === 'club_email') {
      if(!Helper.isEmailAvailable(target.value)) {
        err_msg = '올바르지 않는 형식입니다.';
        err = true;
      } else {
        this.setState({
          isLoading: !this.state.isLoading,
        });
        getClubEmail(target.value)
          .then((response) => {
            if(!response.data) {
              Member.getMemberEmail(target.value)
                .then((response) => {
                  if(!response.data) {
                    err_msg = '이용 가능한 이메일입니다.';
                    err = false;
                  } else {
                    err_msg = '동일한 이메일이 존재합니다.';
                    err = true;
                  }

                  this.setState({
                    club_email : {
                      ...this.state.club_email,
                      err_msg: err_msg,
                      err : err,
                    },
                  });
                })
            } else {
              err_msg = '동일한 이메일이 존재합니다.';
              err = true;
            }

            this.setState({
              club_email : {
                ...this.state.club_email,
                err_msg: err_msg,
                err : err,
              },
              isLoading: !this.state.isLoading,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: !this.state.isLoading,
            });

            //to do
          });
      }
    }

    if(target.id === 'club_name') {
      if(!Helper.isNameAvailable(target.value)) {
        err_msg = '동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!';
        err = true;
      } else {
        this.setState({
          isLoading: !this.state.isLoading,
        });
        getClubName(target.value)
          .then((response) => {
            if(!response.data) {
              err_msg = '이용 가능한 동아리 이름입니다.';
              err = false;
            } else {
              err_msg = '동일한 동아리 이름이 존재합니다.';
              err = true;
            }

            this.setState({
              club_name : {
                ...this.state.club_name,
                err_msg: err_msg,
                err : err,
              },
              isLoading: !this.state.isLoading,
            });
          })
          .catch((err) => {
            this.setState({
              isLoading: !this.state.isLoading,
            });
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

  requestPhoneAuth(e) {
    const phone = this.state.club_phone;
    const phone_ref = this.refs.club_phone;
    const phone_auth = this.state.club_phone_auth;
    const phone_auth_btn = this.state.club_phone_auth_btn;

    if(Common.isEmpty(phone.value)) { phone_ref.focus();
    } else if(!Helper.isPhoneAvailable(phone.value)) { phone_ref.focus();
    } else {
      const phone = phone_ref.value.split('-');
      const to = `+82${phone[0]}${phone[1]}${phone[2]}`;

      //데이터 로딩 true
      this.setState({
        club_phone_auth : {
          ...phone_auth,
          err : null,
          err_msg : '',
        },
        club_phone_auth_btn : {
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

          this.setState({
            club_phone_auth : {
              ...phone_auth,
              err_msg : err_msg,
              err : err
            },
            club_phone_auth_btn : {
              ...phone_auth_btn,
              type : type,
              loading : loading,
              err : err
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  responsePhoneAuth(e) {
    const phone_ref = this.refs.club_phone;
    const phone_auth = this.state.club_phone_auth;
    const phone_auth_ref = this.refs.club_phone_auth;
    const phone_auth_btn = this.state.club_phone_auth_btn;

    if(Common.isEmpty(phone_auth.value)) { phone_auth_ref.focus();
    } else {
      if(Common.isNull(localStorage.getItem('request_id'))) return false;

      const data = {
        request_id : localStorage.getItem('request_id'),
        code : phone_auth.value
      }

      //데이터 로딩 true
      this.setState({
        club_phone_auth : {
          ...phone_auth,
          err : null,
          err_msg : '',
        },
        club_phone_auth_btn : {
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
            err = true;

            phone_auth_ref.focus();

          //인증 코드 실패
          } else if(result.status === '6') {
            err_msg = '많은 입력 실패로 인하여 다시 인증번호를 받아주세요.';
            err = true;
            type = !type;
            phone_auth_ref.value = '';
            phone_ref.focus();

          } else {
            //to do list
          }

          this.setState({
            club_phone_auth : {
              ...phone_auth,
              err : err,
              err_msg : err_msg
            },
            club_phone_auth_btn : {
              ...phone_auth_btn,
              type: type,
              loading : loading
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.club_userid.value)) this.refs.club_userid.focus();
    else if(Common.isEmpty(this.state.club_pw.value)) this.refs.club_pw.focus();
    else if(Common.isEmpty(this.state.club_pw_confirm.value)) this.refs.club_pw_confirm.focus();
    else if(Common.isEmpty(this.state.club_email.value)) this.refs.club_email.focus();
    else if(Common.isEmpty(this.state.club_name.value)) this.refs.club_name.focus();
    else if(Common.isEmpty(this.state.club_phone.value)) this.refs.club_phone.focus();
    // else if(Common.isEmpty(this.state.club_phone_auth.value)) this.refs.club_phone_auth.focus();
    else if(Common.isEmpty(this.state.club_name.value)) this.refs.club_name.focus();
    else if(Common.isEmpty(this.state.cate_id.value)) this.refs.cate_id.focus();
    else if(Common.isEmpty(this.state.club_college.value)) this.refs.club_college.focus();
    else if(Common.isEmpty(this.state.club_copyright.value)) this.refs.club_copyright.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.club_userid.err,
      this.state.club_pw.err,
      this.state.club_pw_confirm.err,
      this.state.club_email.err,
      this.state.club_username.err,
      this.state.club_phone.err,
      this.state.club_name.err,
      this.state.cate_id.err,
      this.state.club_college.err,
      this.state.club_copyright.err,

      //True -> Ok / False -> Error
      // this.state.club_phone_auth_btn.err
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
      const data = {
        "club_userid" : this.state.club_userid.value,
        "club_pw" : this.state.club_pw.value,
        "club_email" : this.state.club_email.value,
        "club_username" : this.state.club_username.value,
        "club_phone" : this.state.club_phone.value,
        "club_name" : this.state.club_name.value,
        "club_college" : this.state.club_college.value,
        "union_enabled" : this.state.union_enabled.value ? 1 : 0,
        "cate_id" : this.state.cate_id.value,
        "club_copyright" : this.state.club_copyright.value,
      };

      //loading
      this.setState({
        isLoading: !this.state.isLoading,
      });

      //Post API
        createClub(data)
          .then((response) => {
            //loading
            this.setState({
              isLoading: !this.state.isLoading,
            });

            this.registerFinishToggle();
          })
          .catch((err) => {
          })
    }
  }

  registerFinishToggle() {
    this.setState({
      registerFinishToggle : !this.state.registerFinishToggle,
    });
  }

  isFindCollegeToggle() {
    this.setState({
      findCollegeToggle: !this.state.findCollegeToggle,
    });
  }

  render() {

    const errorClassName = (identifier) => {
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    const findCollegePopup = this.state.findCollegeToggle ? <FindCollege close={this.isFindCollegeToggle} setCollegeName={this.setCollegeName} /> : '';

    // const phoneAuthBtn = () => {
    //   if(!this.state.club_phone_auth_btn.type) {
    //     return (
    //       <input type="button" value="인증번호 발송" className='inspect-phone-btn' onClick={this.requestPhoneAuth} />
    //     );
    //   } else {
    //     return (
    //       <input type="button" value="확인" className='inspect-phone-btn' onClick={this.responsePhoneAuth} />
    //     );
    //   }
    // }

    const registerFinish = () => {
      if(!this.state.registerFinishToggle) {
        return '';
      } else {
        return (
          <div className='popup_container'>
            <RegisterFinish close={this.registerFinishToggle} />
          </div>
        );
      }
    }

    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

    return(
      <div className="register-container">
        <div className="container">
          <h1>동아리 개설</h1>
          <p>
            회원가입시 외주대학교의 <span>이용약관</span> 및 <span>개인정보취급방침</span>을 읽고 이해하였으며, 이에 동의하는 것으로 간주됩니다.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className='input-register-left'>
              <h3>계정 정보</h3>
              <div className='input-register'>
                <label htmlFor='club_userid' className='input-title'>아이디</label>
                <input type="text" id='club_userid' ref='club_userid' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_userid)}>
                  {this.state.club_userid.err_msg}
                </a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw' className='input-title'>비밀번호</label>
                <input type="password" id='club_pw' ref='club_pw' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_pw)}>{this.state.club_pw.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw_confirm' className='input-title'>비밀번호 확인</label>
                <input type="password" id='club_pw_confirm' ref='club_pw_confirm' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_pw_confirm)}>{this.state.club_pw_confirm.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_email)}>{this.state.club_email.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_username)}>{this.state.club_username.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
                <input type="text" id='club_phone' ref='club_phone' onChange={this.handleChange} />
                <a className={errorClassName(this.state.club_phone)}>{this.state.club_phone.err_msg}</a>
              </div>
              {/* <div className='input-register'>
                <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
                <input type="text" id='club_phone_auth' ref='club_phone_auth' onChange={this.handleChange} />
                {phoneAuthBtn()}
                <a className={errorClassName(this.state.club_phone_auth)}>
                  {this.state.club_phone_auth.err_msg}
                  {this.state.club_phone_auth_btn.loading ? '잠시만 기달려주세요.' : ''}
                </a>
              </div> */}
            </div>

            <div className='line hide-on-med-and-down'></div>

            <div className='input-register-right'>
              <h3>단체 정보</h3>
              <div className='input-register'>
                <label htmlFor='club_name' className='input-title'>동아리 이름</label>
                <input type="text" id='club_name' ref='club_name' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={errorClassName(this.state.club_name)}>{this.state.club_name.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='cate_id' className='input-title'>동아리 종류</label>
                <select id='cate_id' ref='cate_id' onChange={this.handleChange}>
                  <option value='0'>카테고리를 정해주세요!</option>
                  {
                    this.props.category.data.map((item, key) => {
                      return(<option key={key} value={item.cate_id}>{item.cate_name}</option>);
                    })
                  }
                </select>
              </div>
              <div className='input-register college'>
                <label htmlFor='club_college' className='input-title' >동아리 소속</label>
                <input type='text' ref='club_college' id='club_college' onFocus={this.isFindCollegeToggle} placeholder='여기를 클릭해주세요!'/>
                <a>
                  <label htmlFor='union_enabled'>대학 연합입니다</label>
                  <input type="checkbox" id='union_enabled' onChange={this.handleChange}/>
                  <label htmlFor='union_enabled'></label>
                </a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_copyright' className='input-title'>동아리 설명</label>
                <input type="text" id='club_copyright' ref='club_copyright' placeholder='동아리의 매력을 한 줄로 설명해주세요!' onChange={this.handleChange}/>
                <a className={errorClassName(this.state.club_copyright)}>{this.state.club_copyright.err_msg}</a>
              </div>
            </div>

            <div className='submit-register'>
              <input type="submit" value="가입하기"/>
            </div>
          </form>
        </div>
        {registerFinish()}
        {findCollegePopup}
        {this.state.isLoading ? loading : ''}
      </div>
    );
  }
}

Register.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    category: state.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
