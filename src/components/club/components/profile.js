import React from 'react';

const Profile = () => (
  <div className='profile-container'>
    <div className='container'>
      <div className='profile-inner'>
        <div className='title-wrapper'>
          <span></span>
          <h3>단체 프로필</h3>
        </div>
        <div className='profile-content'>
          <div className='contents'>
            <h5>소속학교</h5>
            <p>한국대학교</p>
          </div>
          <div className='contents'>
            <h5>단체종류</h5>
            <p>영상제작</p>
          </div>
          <div className='contents'>
            <h5>활동인원</h5>
            <p>00명</p>
          </div>
          <div className='contents'>
            <h5>태그</h5>
            <p>성실한</p>
          </div>
        </div>
        <div className='profile-content'>
          <div className='contents-area'>
            <h5>단체소개</h5>
            <p>우리 단체에 대한 소개를 올려주세요!</p>
          </div>
          <div className='contents'>
            <h5>SNS</h5>
            <p>영상제작</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Profile.propTypes = {
};

export default Profile;
