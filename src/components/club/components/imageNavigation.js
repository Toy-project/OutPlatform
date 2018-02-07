import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import { isNull } from 'helper/common';

import { updateClubProfile } from 'services/club';

class ImageNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      club_photo: isNull(this.props.club_photo) ? [] : this.props.club_photo,
      club_profile_photo: isNull(this.props.club_profile_photo) ? [] : this.props.club_profile_photo,
      club_photo_updated_slide: [],
      club_photo_updated_profile: [],
      club_photo_upload_slide: false,
      club_photo_upload_profile: false,
      isUploadButton_slide: false,
      isUploadButton_profile: false,
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
      if(isSlide) {
        this.setState({
          ...this.state,
          club_photo: [...this.state.club_photo, reader.result],
          club_photo_updated_slide: [...this.state.club_photo_updated_slide, reader.result],
          club_photo_upload_slide: true,
          isUploadButton_slide: true,
        });
      }

      //프로필 업로드일 경우
      if(isProfile) {

        this.setState({
          ...this.state,
          club_profile_photo: img,
          club_photo_updated_profile: img,
          club_photo_upload_profile: true,
          isUploadButton_profile: true,
        });
      }
    }, false);

    if(img) {
      reader.readAsDataURL(img);
    }
  }

  onUpload(){
    //업로드 API
    if(this.state.isUploadButton_slide){
      //Upload Slide Image
      console.log('Upload Slide Image');
    }

    if(this.state.isUploadButton_profile){
      const form = new FormData();

      form.append('club_profile_photo', this.state.club_profile_photo);
      console.log(this.state.club_profile_photo);
      updateClubProfile(this.props.club_id, form)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      //console.log(this.state.club_profile_photo);
    }
  }

  render() {
    let isSlider;
    let isFloatingCircle;

    //저장된 단체 이미지, 단체 프로필 이미지
    const club_photo = this.state.club_photo;
    const club_profile_photo = this.state.club_profile_photo;

    const showImages = () => {
      return club_photo
        //최신인 사진을 맨 위로 올리기 위해 정렬
        .sort((a, b) => {
          return a > b;
        })
        .map((data, key) => {
        return (<img key={key} src={data} alt="" className='default-image' />);
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

    const imageAddToggleForProfile = () => {
      if(this.state.isUploadButton_profile) {
        return (
          <button onClick={this.onUpload} className='upload-btn-slide afterUpload'></button>
        );
      } else {
        return (
          <div>
            <label htmlFor="onDropProfile" className='upload-btn-profile beforeUpload'></label>
            <input type='file' id='onDropProfile' onChange={this.onDrop} accept="image/*"/>
          </div>
        );
      }
    }

    let isArrows = (
      <div>
        <div className={this.state.club_photo.length > 2 ? 'left-arrow' : 'left-arrow disabled'} onClick={this.next} ></div>
        <div className={this.state.club_photo.length > 2 ? 'right-arrow' : 'right-arrow disabled'} onClick={this.next}></div>
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
          {showImages()}
        </Slider>
      );
      isFloatingCircle = (
        <div>
          <div className='add-image'>
            {imageAddToggleForSlide()}
          </div>
          <div className='add-profile'>
            {imageAddToggleForProfile()}
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
          <span className='upload-btn-profile'></span>
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

export default ImageNavigation;
