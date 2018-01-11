import React from 'react';
import './scss/index.scss';

import Contents from './components/contents';
import Images from './components/images';

const Card = ({ img, title, contents, rating }) => (
  <div className="card">
    <div className="card-image">
      <Images

      />
    </div>
    <div className="card-content-container left-align">
      <Contents
        title={title}
        contents={contents}
        rating={rating}
      />
    </div>
  </div>
);

Card.propTypes = {

};

export default Card;
