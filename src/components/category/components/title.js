import React from 'react';

import '../scss/index.scss';

import good_icon from '../../../images/icons/ic-good.svg'

const Title = ( {title} ) => (
  <div>
    <img src={good_icon} className="good_icon" alt=""/>
    {title}
  </div>
)

Title.propTypes = {
};

export default Title;
