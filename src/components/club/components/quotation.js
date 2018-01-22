import React from 'react';

import ic_profile from 'images/icons/ic-profile.svg';

const Quotation = () => (
  <div className='quotation-container'>
    <div className='container'>
      <div className='quotation-card'>
        <h1>단체 대표에게 제작문의를 해볼까요?</h1>
        <span className='quotation-image'>
          <img src={ic_profile} alt='' />
          <h5>단체 대표 아이디</h5>
        </span>
        <span className='quotation-count'>
          <h3>총 견적 문의 횟수</h3>
          <h4>200회</h4>
        </span>
        <section>
          <button>제작문의하기</button>
        </section>
      </div>
    </div>
  </div>
)

Quotation.propTypes = {
};

export default Quotation;
