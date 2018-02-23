import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isNull } from 'helper/common';
import {apiAddres} from 'helper/variables';

import { fetchUpdatePhotoClub } from 'actions/club/';

class ImageNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      club_photo : '',
      isUploadButton_slide: false,
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  //단체 좌우 Arrows
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  //단체 수정 페이지 Upload
  onDrop(e) {
    const img = e.target.files[0];
    const target = e.target.id;
    const reader = new FileReader();
    const isSlide = target === 'onDropSlide' ? true : false;
    const isProfile = target === 'onDropProfile' ? true : false;

    reader.addEventListener("load", () => {
      //슬라이드 업로드일 경우
      this.setState({
        ...this.state,
        club_photo : reader.result,
        isUploadButton_slide: true,
      });
    }, false);

    if(img) {
      reader.readAsDataURL(img);
    }
  }

  onUpload(){
    //업로드 API
    if(this.state.isUploadButton_slide){
      //Append photo
      const form = new FormData();
      const num = this.props.club_photo.split(',').length + 1; //다음 이미지 순서
      form.append('club_photo', this.state.club_photo);
      this.props.fetchUpdatePhotoClub(this.props.club_id, form.get('club_photo'), num);
    }
  }

  render() {
    let isSlider;
    let isFloatingCircle;

    //저장된 단체 이미지, 단체 프로필 이미지
    const club_photo = this.props.club_photo ? this.props.club_photo.split(',') : [];
    // const club_profile_photo = this.state.club_profile_photo;
    const showImages = () => {
      return club_photo
        //최신인 사진을 맨 위로 올리기 위해 정렬
        .sort((a, b) => {
          return a > b;
        })
        .map((data, key) => {
        return (<img key={key} src={`${apiAddres}/${data}`} alt="" className='default-image' />);
      });
    }

    //이미지 업로드 버튼 Toggle (Slide)
    const imageAddToggleForSlide = () => {
      if(this.state.isUploadButton_slide) {
        return(
          <button onClick={this.onUpload} className='upload-btn-slide afterUpload'></button>
        );
      } else {
        return (
          <div>
            <label htmlFor="onDropSlide" className='image-uploader'></label>
            <input type='file' id='onDropSlide' onChange={this.onDrop} accept="image/*"/>
            <h3>사진 업로드</h3>
          </div>
        );
      }
    }
    let isArrows = (
      <div>
        <div className={this.props.club_photo.length > 2 ? 'left-arrow' : 'left-arrow disabled'} onClick={this.next} ></div>
        <div className={this.props.club_photo.length > 2 ? 'right-arrow' : 'right-arrow disabled'} onClick={this.next}></div>
      </div>
    );

    //슬라이더 셋팅
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

    //단체 페이지 수정일 때,
    if(this.props.myPage){
      isSlider = (
        <Slider
        {...settings}
        autoplay={false}
        ref={ref => this.slider = ref}
        >
          {this.state.club_photo ? <img src={this.state.club_photo} alt="" className='default-image' /> : ''}
          {showImages()}
        </Slider>
      );
      isFloatingCircle = (
        <div>
          <div className='add-image'>
            {imageAddToggleForSlide()}
          </div>
          <div className='add-profile'>
            <span className='profile'>회원관리에서 <br /> 등록해주세요.</span>
          </div>
        </div>
      );
    } else {
      //Slick
      isSlider = (
        <Slider
          autoplay={true}
          autoplaySpeed={2000}
          {...settings}
          ref={ref => this.slider = ref}
        >
          {showImages()}
        </Slider>
      );

      //Floating Button
      isFloatingCircle = (
        <div className='add-profile'>
          <span className='profile'></span>
        </div>
      );
    }

    return (
      <div className='imageNavigation-container'>
        <div className='container'>
          <div className='imageNavigation-inner'>
            {isSlider}
            {isArrows}
            {isFloatingCircle}
          </div>
        </div>
      </div>
    );
  }
}

ImageNavigation.propTypes = {
  myPage: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdatePhotoClub: (club_id, file, num) => {
      dispatch(fetchUpdatePhotoClub(club_id, file, num));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageNavigation);
