import React from 'react';

const smiliarClubCard = () => (
  <div className='smiliarClub-card'>
    <div className='smiliarClub-card-image'>
      <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt='' />
    </div>
    <div className='smiliarClub-card-contents'>
      <h3>단체명</h3>
      <span className='star-rating'>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
        <i className='fa fa-star'></i>
      </span>
    </div>
  </div>
)

smiliarClubCard.propTypes = {
};

export default smiliarClubCard;
