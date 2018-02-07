import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { getValueId, inputValidator } from 'helper/registerHelper';

import { getClubUserId, getClubName, createClub, getClubEmail } from 'services/club';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "club_userid" : '',
      "club_pw" : '',
      "club_email" : '',
      "club_phone" : '',
      "club_name" : '',
      "club_username" : '',
      "cate_id" : 0,
      "club_college" : '',
      "club_copyright" : '',
      "union_enabled" : '',
      "verified_userid" : false,
      "verified_club_name" : false,
      "verified_club_email" : false,
      "club_phone_btn_toggle" : false,
      "club_phone_auth_toggle" : false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormError = this.showFormError.bind(this);

    //아이디 동일 확인
    this.verifyDuplication = this.verifyDuplication.bind(this);

    //핸드폰 인증 확인
    this.verifyPhone = this.verifyPhone.bind(this);
  }

  handleChange(e) {
    inputValidator(e.target.id, 'club');

    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  showFormError() {
    const inputs = document.querySelectorAll('.register-container input:not([type="button"]):not([type="submit"])');
    const selects = document.querySelectorAll('select');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = inputValidator(input.id, 'club');

      if(!isInputValid) {
        isFormValid = false;
      }
    });

    selects.forEach((select) => {
      const isSelectValid = inputValidator(select.id, 'club');

      if(!isSelectValid) {
        isFormValid = false;
      }
    });

    if(!this.state.verified_userid) isFormValid = false;
    if(!this.state.verified_club_name) isFormValid = false;
    if(!this.state.verified_club_email) isFormValid = false;
    if(!this.state.club_phone_btn_toggle) isFormValid = false;
    if(!this.state.club_phone_auth_toggle) isFormValid = false;

    return isFormValid;
  }

  verifyDuplication(e) {
    const target = getValueId(e.target.id);
    const element = document.getElementById(target);
    const error = document.getElementById(`${target}_error`);
    const verified = inputValidator(target, 'club');
    const isUserid = target === 'club_userid' ? true : false;
    const isEmail = target === 'club_email' ? true : false;
    const isClubName = target === 'club_name' ? true : false;

    if(verified && isUserid) {
      getClubUserId(e.target.value)
        .then((response) => {
          if(response.data){
            element.className = '';
            error.innerHTML = '이미 등록된 아이디입니다.';
            error.className = 'warning-color';
          } else {
            element.className = '';
            error.innerHTML = '이용가능한 아이디입니다.';
            error.className = 'recommend-color';

            this.setState({
              ...this.state,
              verified_userid: !this.state.verified_userid,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if(verified && isEmail) {
      getClubEmail(e.target.value)
        .then((response) => {
          if(response.data){
            element.className = '';
            error.innerHTML = '이미 등록된 이메일입니다.';
            error.className = 'warning-color';
          } else {
            element.className = '';
            error.innerHTML = '이용가능한 이메일입니다.';
            error.className = 'recommend-color';

            this.setState({
              ...this.state,
              verified_club_email: !this.state.verified_club_email,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if(verified && isClubName) {
      getClubName(e.target.value)
        .then((response) => {
          if(response.data){
            element.className = '';
            error.innerHTML = '이미 등록된 동아리 이름입니다.';
            error.className = 'warning-color';
          } else {
            element.className = '';
            error.innerHTML = '등록 가능합니다.';
            error.className = 'recommend-color';

            this.setState({
              ...this.state,
              verified_club_name: !this.state.verified_club_name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  verifyPhone(e) {
    const target = getValueId(e.target.id);
    const element = document.getElementById(target);
    const error = document.getElementById('club_phone_error');
    const verified = inputValidator(target, 'club');
    const isPhone = target === 'club_phone' ? true : false;
    const isPhoneAuth = target === 'club_phone_auth' ? true : false;

    if(verified && isPhone){
      //인증
      this.setState({
        ...this.state,
        club_phone_btn_toggle: !this.state.club_phone_btn_toggle,
      });
    }

    if(verified && isPhoneAuth){
      //인증 확인
      this.setState({
        ...this.state,
        club_phone_auth_toggle: !this.state.club_phone_auth_toggle,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()) {
      const data = {
        "club_userid" : this.state.club_userid,
        "club_pw" : this.state.club_pw,
        "club_email" : this.state.club_email,
        "club_username" : this.state.club_username,
        "club_phone" : this.state.club_phone,
        "club_name" : this.state.club_name,
        "club_college" : this.state.club_college,
        "union_enabled" : this.state.union_enabled ? 1 : 0,
        "cate_id" : this.state.cate_id,
        "club_copyright" : this.state.club_copyright,
      };

      //Post만 날리면 됨.
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
                <input type="text" id='club_userid' onChange={this.handleChange} onBlur={this.verifyDuplication}/>
                <a id='club_userid_error'>5자 이상 12자 이내로 지어주세요.</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw' className='input-title'>비밀번호</label>
                <input type="password" id='club_pw' onChange={this.handleChange} onBlur={this.handleChange}/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw_confirm' className='input-title'>비밀번호 확인</label>
                <input type="password" id='club_pw_confirm' onChange={this.handleChange} onBlur={this.handleChange}/>
                <a id='club_pw_error'>영문,숫자,특수문자 포함 12자이내</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' onChange={this.handleChange} onBlur={this.verifyDuplication}/>
                <a id='club_email_error'>이메일을 입력해주세요.</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_username' className='input-title'>이름</label>
                <input type="text" id='club_username' onChange={this.handleChange}/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
                <input type="text" id='club_phone' onChange={this.handleChange}/>
                <input type="button" id='club_phone_btn' value="인증번호 발송" className='inspect-phone-btn' onClick={this.verifyPhone} />
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
                <input type="text" id='club_phone_auth' onChange={this.handleChange}/>
                <input type="button" value="확인" id='club_phone_auth_btn' onClick={this.verifyPhone} />
                <a id='club_phone_error'>핸드폰 인증을 해주세요!</a>
              </div>
            </div>
            <div className='line hide-on-med-and-down'></div>
            <div className='input-register-right'>
              <h3>단체 정보</h3>
              <div className='input-register'>
                <label htmlFor='club_name' className='input-title'>동아리 이름</label>
                <input type="text" id='club_name' onChange={this.handleChange}/>
                <input type="button" id='club_name_btn' onClick={this.verifyDuplication} value="중복 검사" />
                <a id='club_name_error'>동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!</a>
              </div>
              <div className='input-register'>
                <label htmlFor='cate_id' className='input-title'>동아리 종류</label>
                <select id='cate_id' onChange={this.handleChange}>
                  <option value=''></option>
                  {
                    this.props.category.data.map((item, key) => {
                      return(<option key={key} value={item.cate_id}>{item.cate_name}</option>);
                    })
                  }
                </select>
              </div>
              <div className='input-register college'>
                <label htmlFor='club_college' className='input-title'>동아리 소속</label>
                <select id='club_college' onChange={this.handleChange}>
                  <option value=''></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                <a>
                  <label htmlFor='union_enabled'>대학 연합입니다</label>
                  <input type="checkbox" id='union_enabled' onChange={this.handleChange}/>
                  <label htmlFor='union_enabled'></label>
                </a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_copyright' className='input-title'>동아리 설명</label>
                <input type="text" id='club_copyright' placeholder='동아리의 매력을 한 줄로 설명해주세요!' onChange={this.handleChange}/>
                <a id='club_copyright_error'>동아리의 매력을 한 줄로 설명해주세요!(30자 이내)</a>
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
