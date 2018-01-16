import React from 'react';

import './scss/index.scss';

const Register = () => (
  <div className="register-container">
    <div className="container">
      <h1>동아리 개설</h1>
      <form>
        <div className='input-register name'>
          <label htmlFor='club_name' className='input-title'>동아리 이름</label>
          <input type="text" id='club_name' placeholder='동아리 이름은 2글자 이상, 10글자 미만으로 해주세요! '/>
          <input type="button" value="중복 검사" />
        </div>
        <div className='input-register type'>
          <label htmlFor='club_type' className='input-title'>동아리 종류</label>
          <select id='club_type'>
            <option selected></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div className='input-register college'>
          <label htmlFor='club_college' className='input-title'>동아리 소속</label>
          <select id='club_college'>
            <option selected></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <a>
            <label htmlFor='union_enabled'>대학 연합입니다</label>
            <input type="checkbox" id='union_enabled'/>
            <label htmlFor='union_enabled'></label>
          </a>
        </div>
        <div className='input-register phone'>
          <label htmlFor='club_phone' className='input-title'>대표 전화번호</label>
          <input type="text" id='club_phone'/>
          <input type="button" value="인증번호 발송" className='inspect-phone-btn' />
        </div>
        <div className='input-register phone-auth'>
          <label htmlFor='club_phone_auth' className='input-title'>인증번호</label>
          <input type="text" id='club_phone_auth'/>
          <input type="button" value="확인" />
        </div>
        <div className='input-register'>
          <label htmlFor='club_ex' className='input-title'>동아리 설명</label>
          <input type="text" id='club_ex' placeholder='동아리의 매력을 한 줄로 설명해주세요!'/>
          <input type="button" value="중복 검사"/>
        </div>
        <div className='input-register'>
          <input type="submit" value="동아리 개설"/>
        </div>
      </form>
    </div>
  </div>
)

Register.propTypes = {
};

export default Register;
