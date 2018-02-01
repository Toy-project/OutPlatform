import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

class ImageNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      picture: '',
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.submitImageLoader = this.submitImageLoader.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  onDrop(e) {
    const img = e.target.files[0];
    const previewEle = document.getElementById('image-preview');
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewEle.style.backgroundImage = `url(${reader.result})`;
      previewEle.style.backgroundRepeat = 'no-repeat';
      previewEle.style.backgroundSize = 'cover';
    }, false);

    if (img) {
      reader.readAsDataURL(img);
    }

    this.setState({
      picture: img,
    });
  }

  submitImageLoader(e){
    if(this.state.picture === ''){
      console.log('이미지를 입력해주세요.');
      return false;
    } else {
      //Posting
    }
  }

  render() {
    let isSlider;
    let isArrows;
    let isFloatingCircle;

    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

    if(this.props.myPage){
      isSlider = (
        <div className='add-image'>
          <label htmlFor="uploadBtn" className='image-uploader'></label>
          <input type='file' id='uploadBtn' onChange={this.onDrop} accept="image/*"/>
          <h3>사진 업로드</h3>
        </div>
      );
      isArrows = '';
      isFloatingCircle = <button onClick={this.submitImageLoader} className='my-image myPage'></button>;
    } else {
      //Slick
      isSlider = (
        <Slider
        {...settings}
        ref={ref => this.slider = ref}
        >
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
        </Slider>
      );
      // Prev, Next Button
      isArrows = (
        <div>
          <div className='left-arrow' onClick={this.next} ></div>
          <div className='right-arrow' onClick={this.next}></div>
        </div>
      );

      //Floating Button
      isFloatingCircle = <button className='my-image'></button>;
    }
    return (
      <div className='imageNavigation-container'>
        <div className='container'>
          <div id='image-preview' className='imageNavigation-inner'>
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
