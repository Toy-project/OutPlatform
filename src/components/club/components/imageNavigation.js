import React from 'react';

import default_image_navigation from 'images/club/default-image-navigation.png';

class ImageNavigation extends React.Component {

  render() {
    return (
      <div className='imageNavigation-container'>
        <div className='container'>
          <div className='imageNavigation-inner'>
            <div className='imageNavigation'>
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
              <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />

              <button className='my-image'></button>
              {/* <span className='badge'>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageNavigation.propTypes = {
};

export default ImageNavigation;
