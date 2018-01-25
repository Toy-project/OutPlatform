import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

class ImageNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
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
          <span></span>
          <h3>사진 업로드</h3>
        </div>
      );
      isArrows = '';
      isFloatingCircle = <button className='my-image myPage'></button>;
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
