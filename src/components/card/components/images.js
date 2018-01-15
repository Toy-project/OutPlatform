import React from 'react';
import '../scss/index.scss';


// 파일 이름 변경
import default_image from 'images/icons/ic-image-black-24-px.svg';
import person_image from 'images/icons/ic-profile.svg';

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
