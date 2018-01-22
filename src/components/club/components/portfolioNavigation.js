import React from 'react';

import Portfolio from './portfolio';

import Arrow_left from 'images/icons/ic-arrow-left.png';
import Arrow_right from 'images/icons/ic-arrow-right.png';

const PortfolioNavigation = () => (
  <div className='portfolio-container'>
    <div className='container'>
      <div className='title-wrapper'>
        <span></span>
        <h3>포트폴리오</h3>
      </div>
      <div className='portfolio-card-wrapper'>
        <div className='portfolio-slide-wrapper'>
          <span><Portfolio /></span>
          <span><Portfolio /></span>
          <span><Portfolio /></span>
          <span><Portfolio /></span>
          <div className='left-arrow'>
            <img src={Arrow_left} alt='' />
          </div>
          <div className='right-arrow'>
            <img src={Arrow_right} alt='' />
          </div>
        </div>
      </div>
    </div>
  </div>
)

PortfolioNavigation.propTypes = {
};

export default PortfolioNavigation;
