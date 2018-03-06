import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateClubPhoto } from 'services/club/';
import { fetchClub } from 'actions/club/';

class ImageNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      preview_photo : '',
      club_photo: '',
      isUploadButton_slide: false,
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
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
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // 미리보기 이미지 저장 & 토글 변경
      this.setState({
        preview_photo : reader.result,
        club_photo : img,
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
      const num = this.props.club_photo.length + 1; //다음 이미지 순서
      form.append('club_photo', this.state.club_photo);

      updateClubPhoto(this.props.club_id, form, num)
        .then((response) => {
          //Reset 미리보기 사진 정보 / 업로드 사진 정보
          this.setState({
            preview_photo : '',
            club_photo : '',
            isUploadButton_slide: false,
          });

          this.props.fetchClub(this.props.club_id);
        })
        .then((err) => {
          //To do
        });
    }
  }

  handleDeletePhoto() {
    // const currentPhotoIndex = this.slider.innerSlider.state.currentSlide;
    // let temp = this.props.club_photo;
    //Remove currentIndex from array
    // temp.splice(currentPhotoIndex, 1);
    //to DO

    alert('현재 업데이트 중입니다');
  }

  render() {

    // const club_profile_photo = this.state.club_profile_photo;
    const showImages = () => {
      return this.props.club_photo
        //최신인 사진을 맨 위로 올리기 위해 정렬
        .sort((a, b) => {
          return a > b;
        })
        .map((data, key) => {
        return (<img key={key} src={`/${data}`} alt="" className='default-image' />);
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
        <div className={this.props.club_photo.length > 1 ? 'left-arrow' : 'left-arrow disabled'} onClick={this.next} ></div>
        <div className={this.props.club_photo.length > 1 ? 'right-arrow' : 'right-arrow disabled'} onClick={this.next}></div>
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

    const isSlider = (
      <Slider
      {...settings}
      autoplay={this.props.myPage ? false : true}
      ref={ref => this.slider = ref}
      >
        {this.state.preview_photo ? <img src={this.state.preview_photo  } alt="" className='default-image' /> : ''}
        {showImages()}
      </Slider>
    );

    let isFloatingCircle;

    //단체 페이지 수정일 때,
    if(this.props.myPage){
      isFloatingCircle = (
        <div>
          <div className='close-btn' onClick={this.handleDeletePhoto}>
            <span className='x-icon'></span>
          </div>
          <div className='add-image'>
            {imageAddToggleForSlide()}
          </div>
          <div className='add-profile'>
            <span className='profile'>회원관리에서 <br /> 등록해주세요.</span>
          </div>
        </div>
      );
    } else {
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
    fetchClub: (club_id) => {
      dispatch(fetchClub(club_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageNavigation);
