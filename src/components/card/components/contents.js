import React from 'react';
import '../scss/index.scss';

import star from '../../../images/icons/star-gray.svg';

const Contents = ({ title, contents, rating }) => (
  <div>
    <span className="card-title">
      {title}
    </span>
    <p className="card-contents">
      {contents}
    </p>
    <span className="card-rating">
      <img src={star} className="card-star" alt="" />
      <img src={star} className="card-star" alt="" />
      <img src={star} className="card-star" alt="" />
      <img src={star} className="card-star" alt="" />
      <img src={star} className="card-star" alt="" />
      <span className="card-button">
        <a className="btn">담기</a>
      </span>
    </span>
  </div>
);

Contents.propTypes = {

};

export default Contents;
