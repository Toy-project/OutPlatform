import React from 'react';
import Slider from 'react-slick';

import Portfolio from './portfolio';

class PortfolioNavigation extends React.Component {
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

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [ { breakpoint: 300, settings: { slidesToShow: 1 } }, { breakpoint: 1024, settings: { slidesToShow: 2 } }, { breakpoint: 100000, settings: { slidesToShow: 4 }}],
    };

    if(this.props.myPage){
      isSlider = (
        <div>

        </div>
      );
      isArrows = '';
    } else {
      isSlider = (
          <Slider
            ref={ref => this.slider = ref}
            {...settings}
            >
              <span><Portfolio name='1' /></span>
              <span><Portfolio name='2' /></span>
              <span><Portfolio name='3' /></span>
              <span><Portfolio name='4' /></span>
          </Slider>
      );

      isArrows = (
        <div>
          <div className='left-arrow' onClick={this.previous}></div>
          <div className='right-arrow' onClick={this.next}></div>
        </div>
      );
    }
    return (
      <div className='portfolio-container'>
        <div className='container'>
          <div className='portfolio-inner'>
            <div className='title-wrapper'>
              <span></span>
              <h3>포트폴리오</h3>
            </div>
            <div className='portfolio-card-wrapper'>
              <div className='portfolio-slide-wrapper'>
                {isSlider}
                {isArrows}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PortfolioNavigation.propTypes = {
};

export default PortfolioNavigation;
