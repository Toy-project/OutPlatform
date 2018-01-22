import React from 'react';

const Portfolio = () => (
  <div className='portfolio-card'>
    <div className='card-image'>
      <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
    </div>
    <div className='card-content-container'>
      <section>
        <h4>프로젝트 명</h4>
        <h5>2017.12.29-2017.08.12</h5>
      </section>
      <p>
        저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.
      </p>
      <span>
        <button>더 보기</button>
      </span>
    </div>
  </div>
)

Portfolio.propTypes = {
};

export default Portfolio;
