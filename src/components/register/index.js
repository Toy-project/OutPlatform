import React from 'react';
import { connect } from 'react-redux';

import './scss/index.scss';

import { isPhoneGood, isNameGood, isProfileGood } from 'helper/regExp';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "club_userid" : '',
      "club_email" : '',
      "club_pw" : '',
      "club_name" : '',
      "club_phone" : '',
      "club_profile_photo": '',
      "club_photo" : '',
      "club_ex" : '',
      "club_copyright" : '',
      "club_college" : '',
      "cate_id" : '',
      "tag_id" : '',
      "club_history" : '',
      "club_price_duration" : '',
      "union_enabled" : '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormError = this.showFormError.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    this.showInputError(e.target.id);
  }

  showFormError() {
    const inputs = document.querySelectorAll('.register-container > input:not([type="button"]):not([type="submit"])');
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

    return isFormValid;
  }

  showInputError(refId) {
    const element = document.getElementById(refId);
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

    //단체 이름 / 설명일 경우
    if (isName){
      if(!isNameGood(element.value)){
        element.className = 'error';
        return false;
      } else {
        element.className = '';
      }
    }

    //전화번호일 경우
    if(isPhone) {
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
        return false;
      } else {
        element.className = '';
      }
    }

    return true;
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
    }
  }

  render() {
    return(

      <div className="register-container">
        <div className="container">
          <h1>동아리 개설</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='input-register name'>
              <label htmlFor='club_name' className='input-title'>동아리 이름</label>
              <input type="text" id='club_name' placeholder='동아리 이름은 2글자 이상, 10글자 미만으로 해주세요!' onChange={this.handleChange}/>
              <input type="button" value="중복 검사" />
            </div>
            <div className='input-register type'>
              <label htmlFor='cate_id' className='input-title'>동아리 종류</label>
              <select id='cate_id' onChange={this.handleChange}>
                <option value=''></option>
              {console.log(this.props.category)}
                {
                  this.props.category.cate_name.map((item, key) => {
                    return(<option key={key} value={item}>{item}</option>);
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
            <div className='input-register phone'>
              <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
              <input type="text" id='club_phone' onChange={this.handleChange}/>
              <input type="button" value="인증번호 발송" className='inspect-phone-btn' />
            </div>
            <div className='input-register phone-auth'>
              <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
              <input type="text" id='club_phone_auth' onChange={this.handleChange}/>
              <input type="button" value="확인" />
            </div>
            <div className='input-register'>
              <label htmlFor='club_ex' className='input-title'>동아리 설명</label>
              <input type="text" id='club_ex' placeholder='동아리의 매력을 한 줄로 설명해주세요!' onChange={this.handleChange}/>
            </div>
            <div className='input-register'>
              <input type="submit" value="동아리 개설"/>
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
