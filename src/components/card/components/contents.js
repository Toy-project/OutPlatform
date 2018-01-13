import React from 'react';
import '../scss/index.scss';

import star from '../../../images/icons/star-gray.svg';

const Contents = ({ club_name, club_ex, club_rating }) => (
  <div>
    <span className="card-title">
      {club_name}
    </span>
    <p className="card-contents">
      {club_ex}
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
