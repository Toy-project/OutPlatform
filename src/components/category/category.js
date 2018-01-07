import React from 'react';

import '../../scss/common.scss';
import './scss/category.scss';

import good_icon from '../../images/icons/ic-good.svg'

class Category extends React.Component {
  render(){
    return(
      <div className="category">
        <div class="category_title">
          <img src={good_icon} class="good_icon"/>
          추천 단체를 확인하세요
        </div>
        <div class="category_list">
          <ul>
            <li><a className="btn">디자인</a></li>
            <li><a className="btn">IT/프로그래밍</a></li>
            <li><a className="btn">컨텐츠제작</a></li>
            <li><a className="btn">마케팅</a></li>
            <li><a className="btn">컨설팅</a></li>
            <li><a className="btn">통/번역</a></li>
            <li><a className="btn">문서작성</a></li>
            <li><a className="btn">레슨</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Category;
