import React from 'react';
import '../scss/index.scss';

import star from 'images/icons/star-gray.svg';

const Contents = ({ club_name, club_ex, club_rating }) => (
  <div>
    <span className="card-title">
      {club_name}
    </span>
    <p className="card-contents">
      {club_ex}
    </p>
    <span className="card-rating">
      <span className="card-star">
        <img src={star} alt="" />
        <img src={star} alt="" />
        <img src={star} alt="" />
        <img src={star} alt="" />
        <img src={star} alt="" />
      </span>
      <span className="card-button">
        <button className="btn">담기</button>
      </span>
    </span>
  </div>
);

Contents.propTypes = {

};

export default Contents;
