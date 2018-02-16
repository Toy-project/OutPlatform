import React from 'react';
import PropTypes from 'prop-types';

class BasicInfo extends React.Component {
  render() {
    const club_extra_info = () => {
      if(this.props.type ==='club') {
        return (
          <ul>
            <li>
              <span>단체명</span>
              {this.props.name}
            </li>
            <li>
              <span>단체구분</span>
              {this.props.cate_name}
            </li>
          </ul>
        );
      }
    }
    return (
      <div className='basic-info-container'>
        <div className='container'>
          <div className='title-wrapper'>
            <span></span>
            <h3>기본정보</h3>
          </div>
          <div className='basic-info'>
            <div className='basic-info-profile'>
              <div className='profile'>단체로고</div>
              <div className='plus-icon'>
                <label htmlFor="onDropSlide" className='image-uploader'></label>
                <input type='file' id='onDropSlide' accept="image/*"/>
              </div>
              <p>
                프로필 사진을 설정해주세요.
              </p>
            </div>
            <div className='basic-info-contents'>
              <ul>
                <li>
                  <span>아이디</span>
                  {this.props.userid}
                </li>
                <li>
                  <span>이름</span>
                  {this.props.username}
                </li>
              </ul>
              {club_extra_info()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BasicInfo.propTypes = {
  type: PropTypes.string,
  userid: PropTypes.string,
  profile_photo: PropTypes.string,
  username: PropTypes.string,
};

export default BasicInfo;
