import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Portfolio from './portfolio';
import PortfolioPopup from './portfolioPopup';

class PortfolioNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data, //포트폴리오 아이템
      length: this.props.data.length, //data 길이
      editToggle : false, //수정 토글
      editData : '', //수정 데이터
    }

    //좌우 화살표
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    //수정 팝업
    this.isEditToggle = this.isEditToggle.bind(this);

    //포트폴리오 추가 함수
    this.handleAdd = this.handleAdd.bind(this);
  }

  next() {
    //안에 데이터가 없으면 작동안함
    if(this.state.length === 0){
      return false;
    }

    if(this.props.myPage){
      const element = document.getElementById('portfolio-slide-wrap');
      if(element.classList.contains('moveToRight')){
        element.classList.remove('moveToRight');
      } else {
        this.slider.slickNext();
      }
    } else {
      this.slider.slickNext();
    }
  }
  previous() {
    //안에 데이터가 없으면 작동안함
    if(this.state.length === 0){
      return false;
    }

    if(this.props.myPage){
      if(this.slider.innerSlider.state.currentSlide === 0){
        const element = document.getElementById('portfolio-slide-wrap');
        if(element && this.state.length >= 2){
          if(element.classList.contains('moveToLeft')){
            element.classList.add('moveToRight');
          }
        }
      } else {
        this.slider.slickPrev();
      }
    } else {
      this.slider.slickPrev();
    }
  }

  //수정 버튼을 누를 때 데이터 전달과 토글 변화
  isEditToggle(data){
    // 데이터가 없을 경우 토글만 변경
    if(data === undefined) {
      this.setState({
        ...this.state,
        editToggle: !this.state.editToggle,
      });
    } else {
      this.setState({
        ...this.state,
        editToggle: !this.state.editToggle,
        editData: data,
      });
    }

    return false;
  }

  //ADD 버튼을 눌렀을 때 포트폴리오 추가
  handleAdd(){
    const newPortfolio = {};
    if(!this.isEditToggle(newPortfolio)){
      //생성 안함
    } else {
      //ADD ANIMATION
      const element = document.getElementById('portfolio-slide-wrap');
      if(element && this.state.length >= 2){
        if(!element.classList.contains('moveToLeft'))
          element.classList.add('moveToLeft');
      }

      //ADD 포트폴리오 아이템
      this.setState({
        ...this.state,
        data: [...this.state.data, {}],
        length: this.state.length + 1,
      });

      //현재 슬라이더를 최신으로 유지
      if(this.slider){
        this.slider.slickGoTo(this.state.length - 2);
      }
    }
  }

  componentDidMount() {
    //마이페이지가 아닐 경우 포트폴리오 위치 변경
    if(!this.props.myPage) {
      //ADD ANIMATION
      const element = document.getElementById('portfolio-slide-wrap');
      element.classList.add('moveToLeft');
    }
  }

  render() {
    let processing;
    let slider;
    let showEditPopup = this.state.editToggle ? <PortfolioPopup close={this.isEditToggle} data={this.state.editData} /> : '';

    const items = this.state.data.map((item,i) => {
      return (
        <span className='portfolio-obj' key={i}><Portfolio data={item} myPage={this.props.myPage} openAndData={this.isEditToggle} /></span>
      );
    });

    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
    };

    //마이페이지일 경우
    if(this.props.myPage){
      //슬라이더 갯수가 0 일 때, 버튼을 가운데로 하기 위해
      if(this.state.length === 0){
        slider = (
          <div className='no-items' onClick={this.handleAdd}></div>
        );
      } else {
        slider = (
          <div id='portfolio-slide-wrap'>
            <Slider
              ref={ref => this.slider = ref}
              {...settings}
              infinite={false}
            >
                {items}
                <span className='portfolio-mypage-add' onClick={this.handleAdd}></span>
            </Slider>
          </div>
        );
      }

      processing = (
        <div>
          {slider}
          <div>
            <div className='left-arrow' onClick={this.previous}></div>
            <div className='right-arrow' onClick={this.next}></div>
          </div>
        </div>
      );
    } else {
      slider = (
        <div id='portfolio-slide-wrap'>
          <Slider
            ref={ref => this.slider = ref}
            slidesToShow={4}
            autoplay={true}
            autoplaySpeed={2000}
            {...settings}
            >
              {items}
          </Slider>
        </div>
      );
      processing = (
          <div>
            {slider}
            <div>
              <div className='left-arrow' onClick={this.previous}></div>
              <div className='right-arrow' onClick={this.next}></div>
            </div>
          </div>
      );
    }
    return (
      <div className='portfolio-container'>
        <div className='container'>
          <div className='portfolio-inner'>
            <div className='title-wrapper'>
              <span></span>
              <h3>포트폴리오</h3>
            </div>
            <div className='portfolio-card-wrapper'>
              <div className='portfolio-slide-wrapper'>
                {processing}
              </div>
            </div>
          </div>
        </div>
        {showEditPopup}
      </div>
    )
  }
}

PortfolioNavigation.propTypes = {
  myPage: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default PortfolioNavigation;
