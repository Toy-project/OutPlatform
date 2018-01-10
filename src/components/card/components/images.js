import React from 'react';
import '../scss/card.scss';

import default_image from '../../../images/icons/default-image.svg';
import person_image from '../../../images/icons/person-image.svg';

const Images = () => (
  <div>
    <a href="" className="default">
      <img src={default_image} alt="" />
    </a>
    {/* <img src={img} /> */}

    <a href="" className="float">
      <img src={person_image} alt="" />
    </a>
  </div>
);

Images.propTypes = {

};

export default Images;
