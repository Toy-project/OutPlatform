import React from 'react';
import PropTypes from 'prop-types';

const TypeOfClubSelection = ( { toggleToBack }) => (
  <div className='type-of-Club-Selection-inner'>
    <h3>단체회원가입</h3>
    <p>
      어떤 단체이신가요?
    </p>
    <ul>
      <li><span className="circle">동아리</span></li>
      <li><span className="circle">학회</span></li>
      <li><span className="circle">소모임</span></li>
    </ul>
    <button onClick={toggleToBack} className="gray-btn left">이전</button>
    <button className="emerald-btn right">확인</button>
  </div>
)

TypeOfClubSelection.propTypes = {
  toggleToBack: PropTypes.func,
};

export default TypeOfClubSelection;
