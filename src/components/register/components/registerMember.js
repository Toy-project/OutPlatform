import React from 'react';

const RegisterMember = () => (
  <div className='register-member-inner'>
    <h3>간편 회원가입</h3>
    <p>
      회원가입시 외주대학교의 <span>이용약관</span> 및 <span>개인정보취급방침</span>을
      읽고 이해하였으며, 이에 동의하는 것으로 간주됩니다.
    </p>
    <form>
      <div className="input-register">
        <label htmlFor="member_id">아이디</label>
        <input type="text" id="member_id"/>
        <a className='member-id-info'>5자 이상 12자 이내로 지어주세요.</a>
      </div>
      <div className="input-register ">
        <label htmlFor="member_pw">비밀번호</label>
        <input type="password" id="member_pw" className='member-pw'/>
      </div>
      <div className="input-register ">
        <label htmlFor="member_pw_confirm">비밀번호</label>
        <input type="password" id="member_pw_confirm" />
        <a className='member-pw-info'>영문,숫자,특수문자 포함 12자이내</a>
      </div>
      <div className="input-register ">
        <label htmlFor="member_email">이메일</label>
        <input type="email" id="member_email" />
        <a className='member-email-info'>등록 가능한 이메일입니다.</a>
      </div>
      <div className="input-register ">
        <label htmlFor="member_phone">전화번호</label>
      <input type="text" id="member_phone" className='member-phone'/>
      </div>
      <div className="input-register ">
        <label htmlFor="member_auth">인증번호</label>
        <input type="text" id="member_auth" />
      </div>
      <div className="input-register">
        <input type="submit" value="무료 가입하기" />
      </div>
    </form>
  </div>
)

RegisterMember.propTypes = {
};

export default RegisterMember;
