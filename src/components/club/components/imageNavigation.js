import React from 'react';

import '../scss/index.scss';

const ImageNavigation = () => (
    <div className='imageNavigation-container'>
      <div className='container'>
        <div className='imageNavigation-inner'>
          <img alt="" />
          {/* <img src={img} /> */}
        </div>
      </div>
    </div>
)

ImageNavigation.propTypes = {
};

export default ImageNavigation;
