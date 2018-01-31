import React from 'react';

const Quotation = () => {
  return (
    <div className='quotation-container'>
      <div className='container'>
        <div className='quotation-inner'>
          <div className='quotation-card'>
            <div className='quotation-title'>
              <h1>단체 대표에게 제작문의를 해볼까요?</h1>
            </div>
            <div className='quotation-contents'>
              <div className='quotation-image'>
                <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt='' className='quotation-who'  />
                <h5>단체 대표 아이디</h5>
              </div>
              <div className='quotation-count'>
                <h3>총 견적 문의 횟수</h3>
                <h4>200회</h4>
              </div>
            </div>
            <div className='quotation-btn'>
              <button>제작문의하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Quotation.propTypes = {
};

export default Quotation;
