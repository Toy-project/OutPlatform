import React from 'react';
import './scss/card.scss';
import img from './img/sample-1.jpg';

class Card extends React.Component {
  render(){
    return(
      <div className="card">
        <div className="card-image">
          <img src={img} />
          <a href="#" className="float">
            <i class="material-icons">person</i>
          </a>
        </div>
        <div className="card-content">
          <span className="card-title">
            단체명
          </span>
          <p className="card-1">
            저는 굉장히 심플한 카드에요! 저는 적은 양의 정보를 담는 데에 좋습니다.
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
