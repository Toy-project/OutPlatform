import React from 'react';
import Slider from 'react-slick';

import Portfolio from './portfolio';

import Arrow_left from 'images/icons/ic-arrow-left.png';
import Arrow_right from 'images/icons/ic-arrow-right.png';

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
    return (
      <div className='portfolio-container'>
        <div className='container'>
          <div className='title-wrapper'>
            <span></span>
            <h3>포트폴리오</h3>
          </div>
          <div className='portfolio-card-wrapper'>
            <div className='portfolio-slide-wrapper'>
              <Slider
                dots={false}
                arrows={false}
                ref={ref => this.slider = ref}
                slidesToShow='4'
                slidesToScroll='1'>
                <span><Portfolio name='1' /></span>
                <span><Portfolio name='2' /></span>
                <span><Portfolio name='3' /></span>
                <span><Portfolio name='4' /></span>
              </Slider>
              <div className='left-arrow'>
                <img src={Arrow_left} alt='' onClick={this.previous} />
              </div>
              <div className='right-arrow'>
                <img src={Arrow_right} alt='' onClick={this.next} />
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
