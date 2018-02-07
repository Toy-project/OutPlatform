import React from 'react';
import './scss/index.scss';

import Contents from './components/contents';
import Images from './components/images';

const Card = ({ club_id, club_profile_photo, club_name, club_copyright, club_rating, cate_id, tag_id }) => (
  <div className="card">
    <div className="card-image">
      <Images
        club_id={club_id}
        cate_id={cate_id}
        tag_id={tag_id}
        club_profile_photo={club_profile_photo}
      />
    </div>
    <div className="card-content-container">
      <Contents
        club_id={club_id}
        club_name={club_name}
        club_copyright={club_copyright}
        club_rating={club_rating}
      />
    </div>
  </div>
);

Card.propTypes = {

};

export default Card;
