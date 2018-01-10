import React from 'react';

import '../scss/category.scss';

import good_icon from '../../../images/icons/ic-good.svg'

const Title = () => (
  <div>
    <img src={good_icon} className="good_icon" alt=""/>
    추천 단체를 확인하세요
  </div>
)

Title.propTypes = {
};

export default Title;
