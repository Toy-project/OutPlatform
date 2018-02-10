import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import * as Helper from 'helper/registerHelper';
import { isEmpty } from 'helper/common';
import { getClubUserId, createClub, getClubEmail, getClubName } from 'services/club';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      club_userid : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_pw : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_pw_confirm : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_email : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_username : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_phone : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_phone_auth : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_name : {
        value: '',
        err_msg: '',
        err: true,
      },

      cate_id : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_college : {
        value: '',
        err_msg: '',
        err: true,
      },

      union_enabled : {
        value: '',
        err_msg: '',
        err: true,
      },

      club_copyright : {
        value: '',
        err_msg: '',
        err: true,
      },

      "club_phone_btn" : true,
      "club_phone_auth_btn" : true,
    }

    //Input 처리
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //연락처 인증
    this.requestPhoneAuth = this.requestPhoneAuth.bind(this);
    this.responsePhoneAuth = this.responsePhoneAuth.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(target.id === 'club_userid') {
      if(!Helper.isUserIdAvailable(value)) {
        err_msg = '5자 이상 12자 이내로 지어주세요.';
        err = true;
      };
    }
    if(target.id === 'club_pw' || target.id === 'club_pw_confirm') {
      if(!Helper.isPasswordAvailable(value)) {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
        err = true;
      }
    }
    if(target.id === 'club_email') {
      if(!Helper.isEmailAvailable(value)) {
        err_msg = '올바르지 않는 형식입니다.';
        err = true;
      }
    }
    if(target.id === 'club_phone') {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      if(!Helper.isPhoneAvailable(value)) {
        err_msg = '올바르지 않는 전화번호입니다.';
        err = true;
      }
    }
    if(target.id === 'club_name') {
      if(!Helper.isNameAvailable(value)) {
        err_msg = '동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!';
        err = true;
      }
    }
    if(target.id === 'club_copyright') {
      if(!Helper.isCopyrightAvailable(value)) {
        err_msg = '5자 이상 30자 이내만 가능합니다!';
        err = true;
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
    let err_msg = '';
    let err = false;

    if(target.id === 'club_userid') {
      if(!Helper.isUserIdAvailable(target.value)) {
        err_msg = '5자 이상 12자 이내로 지어주세요.';
        err = true;
      } else {
        getClubUserId(target.value)
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
          .catch((err) => {
            console.log(err);
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
        getClubEmail(target.value)
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
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if(target.id === 'club_username') {
      if(isEmpty(target.value)) {
        err_msg = '이름을 입력해주세요.';
        err = true;
      }
    }

    if(target.id === 'club_name') {
      if(!Helper.isNameAvailable(target.value)) {
        err_msg = '동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!';
        err = true;
      } else {
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

  requestPhoneAuth(e) {
    const club_phone = this.state.club_phone.value;

    if(!Helper.isPhoneAvailable(club_phone)) {
      this.setState({
        club_phone : {
          ...this.state.club_phone,
          err_msg: '연락처를 입력해주세요.',
          err : true,
        },
      });
      return false;
    }

    if(!Helper.requestAuth(club_phone)) {
      //인증요청 실패
      this.setState({
        club_phone_auth : {
          ...this.state.club_phone_auth,
          err_msg: '인증요청에 실패하였습니다.',
          err : true,
        },
        club_phone : {
          ...this.state.club_phone,
          err : true,
        },
        club_phone_btn : true,
        club_phone_auth_btn : true,
      });
    } else {
      //인증요청완료
      this.setState({
        club_phone_auth : {
          ...this.state.club_phone_auth,
          err_msg: '인증요청을 성공하였습니다. 잠시만 기달려주세요.',
          err : false,
        },
        club_phone : {
          ...this.state.club_phone,
          err : false,
        },
        club_phone_btn : false,
        club_phone_auth_btn : true,
      });
    }
  }

  responsePhoneAuth(e) {
    const club_phone_auth = this.state.club_phone_auth.value;
    const club_phone_btn = this.state.club_phone_btn;

    if(club_phone_btn) {
      this.setState({
        club_phone_auth : {
          ...this.state.club_phone_auth,
          err_msg: '인증번호 발송버튼을 눌러주세요.',
          err : true,
        }
      });

      return false;
    }

    if(!Helper.responseAuth(club_phone_auth)) {
      //인증 실패
      this.setState({
        club_phone_auth : {
          ...this.state.club_phone_auth,
          err_msg: '인증에 실패하였습니다.',
          err : true,
        },
        club_phone_auth_btn : true,
      });
    } else {
      //인증완료
      this.setState({
        club_phone_auth : {
          ...this.state.club_phone_auth,
          err_msg: '인증에 성공하였습니다.',
          err : false,
        },
        club_phone_auth_btn : false,
      })
    }
  }

  handleEmptyValue() {
    if(isEmpty(this.state.club_userid.value)) this.refs.club_userid.focus();
    else if(isEmpty(this.state.club_pw.value)) this.refs.club_pw.focus();
    else if(isEmpty(this.state.club_pw_confirm.value)) this.refs.club_pw_confirm.focus();
    else if(isEmpty(this.state.club_email.value)) this.refs.club_email.focus();
    else if(isEmpty(this.state.club_name.value)) this.refs.club_name.focus();
    else if(isEmpty(this.state.club_phone.value)) this.refs.club_phone.focus();
    else if(isEmpty(this.state.club_phone_auth.value)) this.refs.club_phone_auth.focus();
    else if(isEmpty(this.state.club_name.value)) this.refs.club_name.focus();
    else if(isEmpty(this.state.cate_id.value)) this.setState({cate_id: { ...this.state.cate_id, err_msg: '카테고리를 선택해주세요.', err: true}})
    else if(isEmpty(this.state.club_copyright.value)) this.refs.club_copyright.focus();
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
      this.state.club_copyright.err,

      //True -> Ok / False -> Error
      this.state.club_phone_btn,
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

      //Post API
        createClub(data)
          .then((response) => {
            alert('회원가입완료!');
            console.log(response.data);
            this.props.history.push(`/`);
            window.location.reload();
          })
          .catch((err) => {
            alert('에러!');
            console.log(err);
          })
    }
  }

  render() {
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
                <a className={this.state.club_userid.err ? 'warning-color' : 'recommend-color'}>
                  {this.state.club_userid.err_msg}
                </a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw' className='input-title'>비밀번호</label>
                <input type="password" id='club_pw' ref='club_pw' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={this.state.club_pw.err ? 'warning-color' : 'recommend-color'}>{this.state.club_pw.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw_confirm' className='input-title'>비밀번호 확인</label>
                <input type="password" id='club_pw_confirm' ref='club_pw_confirm' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={this.state.club_pw_confirm.err ? 'warning-color' : 'recommend-color'}>{this.state.club_pw_confirm.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' ref='club_email' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={this.state.club_email.err ? 'warning-color' : 'recommend-color'}>{this.state.club_email.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' ref='club_username' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={this.state.club_username.err ? 'warning-color' : 'recommend-color'}>{this.state.club_username.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
                <input type="text" id='club_phone' ref='club_phone' onChange={this.handleChange} />
                <input type="button" value="인증번호 발송" className='inspect-phone-btn' onClick={this.requestPhoneAuth} />
                <a className={this.state.club_phone.err ? 'warning-color' : 'recommend-color'}>{this.state.club_phone.err_msg}</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
                <input type="text" id='club_phone_auth' ref='club_phone_auth' onChange={this.handleChange} />
                <input type="button" value="확인" onClick={this.responsePhoneAuth} />
                <a className={this.state.club_phone_auth.err ? 'warning-color' : 'recommend-color'}>{this.state.club_phone_auth.err_msg}</a>
              </div>
            </div>

            <div className='line hide-on-med-and-down'></div>

            <div className='input-register-right'>
              <h3>단체 정보</h3>
              <div className='input-register'>
                <label htmlFor='club_name' className='input-title'>동아리 이름</label>
                <input type="text" id='club_name' ref='club_name' onChange={this.handleChange} onBlur={this.handleBlur}/>
                <a className={this.state.club_name.err ? 'warning-color' : 'recommend-color'}>{this.state.club_name.err_msg}</a>
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
                <a className={this.state.cate_id.err ? 'warning-color' : 'recommend-color'}>{this.state.cate_id.err_msg}</a>
              </div>
              <div className='input-register college'>
                <label htmlFor='club_college' className='input-title'>동아리 소속</label>
                <select id='club_college' onChange={this.handleChange}>
                  <option value='0'>대학교를 선택해주세요!</option>
                </select>
                <a>
                  <label htmlFor='union_enabled'>대학 연합입니다</label>
                  <input type="checkbox" id='union_enabled' onChange={this.handleChange}/>
                  <label htmlFor='union_enabled'></label>
                </a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_copyright' className='input-title'>동아리 설명</label>
                <input type="text" id='club_copyright' ref='club_copyright' placeholder='동아리의 매력을 한 줄로 설명해주세요!' onChange={this.handleChange}/>
                <a className={this.state.club_copyright.err ? 'warning-color' : 'recommend-color'}>{this.state.club_copyright.err_msg}</a>
              </div>
            </div>

            <div className='submit-register'>
              <input type="submit" value="가입하기"/>
            </div>
          </form>
        </div>
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
