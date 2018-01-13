import React from 'react';
import './scss/index.scss';

import Contents from './components/contents';
import Images from './components/images';

const Card = ({ club_profile_photo, club_name, club_ex, club_rating }) => (
  <div className="card">
    <div className="card-image">
      <Images

      />
    </div>
    <div className="card-content-container left-align">
      <Contents
        club_name={club_name}
        club_ex={club_ex}
        club_rating={club_rating}
      />
    </div>
  </div>
);

Card.propTypes = {

};

export default Card;
