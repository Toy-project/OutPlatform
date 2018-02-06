import React from 'react';
import { connect } from 'react-redux';

import './scss/index.scss';

import { isPhoneGood, isNameGood, isProfileGood, isUseridGood, isEmailGood, isPasswordGood } from 'helper/regExp';
import { getValueId, autoHypenPhone } from 'helper/registerHelper';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "club_userid" : '',
      "club_pw" : '',
      "club_email" : '',
      "club_phone" : '',
      "club_name" : '',
      "cate_id" : '',
      "club_college" : '',
      "club_ex" : '',
      "union_enabled" : '',
      "club_name_btn_toggle" : false,
      "club_phone_btn_toggle" : false,
      "club_phone_auth_toggle" : false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormError = this.showFormError.bind(this);
    this.showButtonError = this.showButtonError.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });

    this.showInputError(e.target.id);
  }

  showFormError() {
    const inputs = document.querySelectorAll('.register-container input:not([type="button"]):not([type="submit"])');
    const selects = document.querySelectorAll('select');
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = this.showInputError(input.id);

      if(!isInputValid) {
        isFormValid = false;
      }
    });

    selects.forEach((select) => {
      const isSelectValid = this.showInputError(select.id);

      if(!isSelectValid) {
        isFormValid = false;
      }
    });

    if(!this.state.club_name_btn_toggle) isFormValid = false;
    if(!this.state.club_phone_btn_toggle) isFormValid = false;
    if(!this.state.club_phone_auth_toggle) isFormValid = false;


    return isFormValid;
  }

  showInputError(refId) {
    const error = document.getElementById(`${refId}_error`);
    const element = document.getElementById(refId);
    const isUserid = refId === 'club_userid' ? true : false;
    const isPassword = refId === 'club_pw' ? true : false;
    const isPasswordConfirm = refId === 'club_pw_confirm' ? true : false;
    const isEmail = refId === 'club_email' ? true : false;
    const isName = refId === 'club_name' ? true : false;
    const isPhone = refId === 'club_phone' ? true : false;
    const isExplaination = refId === 'club_ex' ? true : false;

    //Empty Value 체크
    if(element.value === ''){
      element.className = 'error';
      return false;
    } else {
      element.className = '';
    }

    //아이디일 경우
    if (isUserid){
      if(!isUseridGood(element.value)){
        element.className = 'error';
        error.innerHTML = '올바르지 않는 아이디입니다. 5자 이상 12자 이내로 지어주세요';
        error.className = 'warning-color';
        return false;
      } else {
        element.className = '';
        error.innerHTML = '등록 가능한 아이디입니다.';
        error.className = 'recommend-color';
      }
    }

    //패스워드 검사
    if(isPassword || isPasswordConfirm){
      const error = document.getElementById('club_pw_error');
      if(!isPasswordGood(element.value)){
        element.className = 'error';
        error.innerHTML = '올바르지 않은 패스워드입니다. 영문,숫자,특수문자 포함 12자이내'
        error.className = 'warning-color';
        return false;
      } else if(element.value !== document.getElementById('club_pw').value){
        element.className = 'error';
        error.innerHTML = '비밀번호가 다릅니다.';
        error.className = 'warning-color';
      } else {
        error.innerHTML = '사용가능합니다'
        error.className = 'recommend-color';
        element.className = '';
      }
    }

    //이메일일 경우
    if (isEmail){
      if(!isEmailGood(element.value)){
        element.className = 'error';
        error.innerHTML = '올바르지 않는 이메일 형식입니다.';
        error.className = 'warning-color';
        return false;
      } else {
        element.className = '';
        error.innerHTML = '등록 가능한 이메일입니다.';
        error.className = 'recommend-color';
      }
    }

    //단체 이름
    if (isName){
      if(!isNameGood(element.value)){
        element.className = 'error';
        error.innerHTML = '2글자 이상, 10글자 미만으로 해주세요!';
        error.className = 'warning-color';
        return false;
      } else {
        element.className = '';
        error.innerHTML = '사용 가능한 이름입니다!';
        error.className = 'recommend-color';
      }
    }

    //전화번호일 경우
    if(isPhone) {
      element.value = autoHypenPhone(element.value);
      if(!isPhoneGood(element.value)){
        element.className = 'error';
        return false;
      } else {
        element.className = '';
      }
    }

    if(isExplaination) {
      if(!isProfileGood(element.value)){
        element.className = 'error';
        error.innerHTML = '30자 이내로 작성해주세요!';
        error.className = 'warning-color';
        return false;
      } else {
        element.className = '';
        error.innerHTML = '등록 가능한 소개입니다.';
        error.className = 'recommend-color';
      }
    }

    return true;
  }

  showButtonError(e) {
    const str = getValueId(e.target.id);
    const element = document.getElementById(str);
    //const error = document.getElementById(`${str}_error`);
    const isName = str === 'club_name' ? true : false;
    const isPhone = str === 'club_phone' ? true : false;
    const isPhoneAuth = str === 'club_phone_auth' ? true : false;
    const value = element.value;

    // 아이디 중복 확인
    if(isName) {
      if(value === '' || !isNameGood(value)){
        this.showInputError(str);
      } else {
        console.log('단체 이름 중복 확인이 필요');
        if(true){
          this.setState({
            ...this.state,
            club_name_btn_toggle: true,
          });
        } else {
          // if(!this.state.club_name_btn_toggle){
          //   error.innerHTML = '이미 등록된 단체 이름입니다. 다른 이름을 선택하세요.';
          //   error.className = 'warning-color';
          //   element.className = 'error';
          // }
        }
      }
    }

    //핸드폰 Auth Request
    if(isPhone) {
      //핸드폰 Auth 요청
      if(value === '' || !isPhoneGood(value)){
        this.showInputError(str);
      } else {
        console.log('연락처 인증 요청이 필요');
        if(true){
          this.setState({
            ...this.state,
            club_phone_btn_toggle: true,
          });
        } else {
          //인증 요청 실패
        }
      }
    }

    if(isPhoneAuth) {
      //핸드폰 Auth 요청
      if(value === ''){
        this.showInputError(str);
      } else {
        console.log('연락처 인증 필요');

        if(true){
          this.setState({
            ...this.state,
            club_phone_auth_toggle: true,
          });
        } else {
          //인증 실패
        }
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.showFormError()) {
      const data = {
        "club_userid" : this.state.club_userid,
        "club_email" : this.state.club_email,
        "club_pw" : this.state.club_pw,
        "club_name" : this.state.club_name,
        "club_phone" : this.state.club_phone,
        "club_profile_photo": "test",
        "club_photo" : "test",
        "club_ex" : this.state.club_ex,
        "club_copyright" : 'test',
        "club_college" : this.state.club_college,
        "cate_id" : this.state.cate_id,
        "tag_id" : 2,
        "club_history" : 'test',
        "club_price_duration" : 'test',
        "union_enabled" : this.state.union_enabled ? 1 : 0,
      };

      //Post만 날리면 됨.
      console.log(data);
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
                <input type="text" id='club_userid' onChange={this.handleChange}/>
                <a id='club_userid_error'>5자 이상 12자 이내로 지어주세요.</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw' className='input-title'>비밀번호</label>
                <input type="password" id='club_pw' onChange={this.handleChange}/>
              </div>
              <div className='input-register'>
                <label htmlFor='club_pw_confirm' className='input-title'>비밀번호 확인</label>
                <input type="password" id='club_pw_confirm' onChange={this.handleChange}/>
                <a id='club_pw_error'>영문,숫자,특수문자 포함 12자이내</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_email' className='input-title'>이메일 주소</label>
                <input type="text" id='club_email' onChange={this.handleChange}/>
                <a id='club_email_error'>이메일을 입력해주세요.</a>
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
                <input type="text" id='club_phone' onChange={this.handleChange}/>
                <input type="button" id='club_phone_btn' value="인증번호 발송" className='inspect-phone-btn' onClick={this.showButtonError} />
              </div>
              <div className='input-register'>
                <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
                <input type="text" id='club_phone_auth' onChange={this.handleChange}/>
                <input type="button" value="확인" id='club_phone_auth_btn' onClick={this.showButtonError} />
              </div>
            </div>
            <div className='line hide-on-med-and-down'></div>
            <div className='input-register-right'>
              <h3>단체 정보</h3>
              <div className='input-register'>
                <label htmlFor='club_name' className='input-title'>동아리 이름</label>
                <input type="text" id='club_name' onChange={this.handleChange}/>
                <input type="button" id='club_name_btn' onClick={this.showButtonError} value="중복 검사" />
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
                <label htmlFor='club_ex' className='input-title'>동아리 설명</label>
                <input type="text" id='club_ex' placeholder='동아리의 매력을 한 줄로 설명해주세요!' onChange={this.handleChange}/>
                <a id='club_ex_error'>동아리의 매력을 한 줄로 설명해주세요!(30자 이내)</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
