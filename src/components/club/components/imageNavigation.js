import React from 'react';
import Slider from 'react-slick';

import Arrow_left from 'images/icons/ic-arrow-left.png';
import Arrow_right from 'images/icons/ic-arrow-right.png';

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
    const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <div className='imageNavigation-container'>
        <div className='container'>
          <div className='imageNavigation-inner'>
            <Slider
              {...settings}
              ref={ref => this.slider = ref}
              >
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
            </Slider>
            <div className='left-arrow'>
              <img src={Arrow_left} alt='' onClick={this.previous} />
            </div>
            <div className='right-arrow'>
              <img src={Arrow_right} alt='' onClick={this.next} />
            </div>
            <button className='my-image'></button>
          </div>
        </div>
      </div>
    );
  }
}

ImageNavigation.propTypes = {
};

export default ImageNavigation;
