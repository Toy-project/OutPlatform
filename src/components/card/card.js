import React from 'react';
import './scss/card.scss';

import star from '../../images/icons/star-gray.svg';
import default_image from '../../images/icons/default-image.svg';
import person_image from '../../images/icons/person-image.svg';

class Card extends React.Component {
  render(){
    return(
      <div className="card">
        <div className="card-image">
          <a href="#" className="default">
            <img src={default_image} />
          </a>
          {/* <img src={img} /> */}

          <a href="#" className="float">
            <img src={person_image} />
          </a>
        </div>
        <div className="card-content-container left-align">
          <span className="card-title">
            단체명
          </span>
          <p className="card-contents ">
            저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.
          </p>
          <span className="card-rating">
            <img src={star} className="card-star"/>
            <img src={star} className="card-star"/>
            <img src={star} className="card-star"/>
            <img src={star} className="card-star"/>
            <img src={star} className="card-star"/>
            <span className="card-button">
              <a className="btn">담기</a>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
