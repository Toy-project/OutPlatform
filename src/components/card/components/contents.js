import React from 'react';
import '../scss/index.scss';

const Contents = ({ club_name, club_copyright, club_rating }) => (
  <div>
    <span className="card-title">
      {club_name}
    </span>
    <p className="card-contents">
      {club_copyright}
    </p>
    <span className="card-rating">
      <span className="card-star">
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
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
