import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateClub } from 'services/club/';
import { fetchClub } from 'actions/club/';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_photo : {
        err_msg: '단체계정의 프로필사진은 \n 단체로고로 자동 설정됩니다.',
        err: null,
      },

    }

    this.onDrop = this.onDropAndUpload.bind(this);
    this.handleDeleteProfilePhoto = this.handleDeleteProfilePhoto.bind(this);
  }

  onDropAndUpload(e) {
    const img = e.target.files[0];

    const form = new FormData();
    form.append('club_profile_photo', img);

    if(this.props.type === 'club') {
      updateClub(this.props.id, form)
        .then((response) => {
          this.setState({
            profile_photo: {
              ...this.state.profile_photo,
              err_msg : '이미지가 업데이트되었습니다.',
              err: false,
            }
          })
          this.props.fetchClub(this.props.id);
        })
        .catch((err) => {
          //to do
        });
    }
  }

  handleDeleteProfilePhoto(e) {
    updateClub(this.props.id, {club_profile_photo: ''})
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        //to do
      });
    this.props.fetchClub(this.props.id);
  }

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

    const images = () => {
      if(this.props.profile_photo) {
        return (
          <img src={`${process.env.API_URL}/${this.props.profile_photo}`} alt="" className='profile' />
        );
      } else {
        return (
          <span className='default'>단체로고</span>
        )
      }
    }

    const msg = () => {
      if(!this.props.profile_photo) {
        return (
          <span>
            단체로고를 등록해주세요! <br />
            단체계정의 프로필사진은 <br />
            단체로고로 자동 설정됩니다.
          </span>
        );
      } else {
        return this.state.profile_photo.err_msg.split('\n').map((line, key) => {
          return (<span key={key}>{line}<br /></span>);
        });
      }
    }

    const upload_profile_image = (
      <div className='basic-info-profile'>
        <div className='close-btn' onClick={this.handleDeleteProfilePhoto}>
          <span className='x-icon'></span>
        </div>
        <div>
          {images()}
        </div>
        <div className='plus-icon'>
          <label htmlFor="onDropSlide" className='image-uploader'></label>
          <input type='file' id='onDropSlide' onChange={this.onDrop} accept="image/*"/>
        </div>
        <p>
          {msg()}
        </p>
      </div>
    );

    return (
      <div className='basic-info-container'>
        <div className='container'>
          <div className='title-wrapper'>
            <span></span>
            <h3>기본정보</h3>
          </div>
          <div className='basic-info'>
            {this.props.type === 'club' ? upload_profile_image : ''}
            <div className={this.props.type === 'club' ? 'basic-info-contents subtract' : 'basic-info-contents'}>
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClub : (club_id) => {
      dispatch(fetchClub(club_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
