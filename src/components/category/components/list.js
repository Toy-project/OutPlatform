import React from 'react';

import '../scss/category.scss';

const List = () => (
  <div>
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
)

List.propTypes = {
};

export default List;
