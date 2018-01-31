import React from 'react';

class Portfolio extends React.Component {

  render() {
    let isButton;

    if(this.props.myPage){
      isButton = (
        <div className='portfolio-edit-btn'>
          <button onClick={this.props.open}>수정</button>
        </div>
      );
    } else {
      isButton = (
        <div className='portfolio-view-btn'>
          <button>더 보기</button>
        </div>
      );
    }
    return (
      <div className='portfolio-card'>
        <div className='card-image'>
          <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' />
        </div>
        <div className='card-content-container'>
          <section>
            <h4>프로젝트 명 { this.props.name }</h4>
            <h5>2017.12.29-2017.08.12</h5>
          </section>
          <p>
            저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.저희 동아리는 광고 / 마케팅 동아리로써 다수의 공모전 입상 경험이 있습니다.
          </p>
          {isButton}
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
};

export default Portfolio;
