import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Portfolio from './portfolio';
import PortfolioPopup from './portfolioPopup';

class PortfolioNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupToggle : false, //팝업 토글
      editData : '', //수정할 데이터
      type: 0, // 생성 = 0 or 수정 = 1 or 보기 = 2
    }

    //좌우 화살표
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    //수정 팝업
    this.isPopupToggle = this.isPopupToggle.bind(this);

    //포트폴리오 추가 함수
    this.handleAdd = this.handleAdd.bind(this);

    //업데이트
    this.handleUpdate = this.handleUpdate.bind(this);

    //view
    this.handleView = this.handleView.bind(this);
  }

  next() {
    //안에 데이터가 없으면 작동안함
    if(this.props.portfolio.length === 0){
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
    if(this.props.portfolio.length === 0){
      return false;
    }

    if(this.props.myPage){
      if(this.slider.innerSlider.state.currentSlide === 0){
        const element = document.getElementById('portfolio-slide-wrap');
        if(element && this.props.portfolio.length >= 2){
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

  //팝업 토글 변화
  isPopupToggle(){
    this.setState({
      ...this.state,
      popupToggle: !this.state.popupToggle,
      type: 0,
      editData: '',
    });
  }

  //ADD 버튼을 눌렀을 때 포트폴리오 추가
  handleAdd(toggle, data){
    if(toggle !== true){
      this.isPopupToggle(); //팝업 열기
    } else {
      //ADD ANIMATION
      const element = document.getElementById('portfolio-slide-wrap');
      if(element && this.props.portfolio.length > 2){
        if(!element.classList.contains('moveToLeft'))
          element.classList.add('moveToLeft');
      }
    }
  }

  handleUpdate(data) {
    this.setState({
      ...this.state,
      editData: data,
      popupToggle: !this.state.popupToggle,
      type: 1,
    });
  }

  handleView(data){
    this.setState({
      editData: data,
      popupToggle: !this.state.popupToggle,
      type: 2,
    });
  }

  componentDidMount() {
    const element = document.getElementById('portfolio-slide-wrap');

    if(element && this.props.portfolio.length > 2){
      if(!element.classList.contains('moveToLeft')) {
        element.classList.add('moveToLeft');
      }
    }
  }

  render() {
    let processing;
    let slider;
    let isArrows;
    let showEditPopup = this.state.popupToggle ? this.props.myPage ? <PortfolioPopup
                                                    close={this.isPopupToggle}
                                                    handleAdd={this.handleAdd}
                                                    handleUpdate={this.handleUpdate}
                                                    data={this.state.editData}
                                                    type={this.state.type}
                                                    club_id={this.props.club_id} /> :
                                                    <PortfolioPopup
                                                      club_id={this.props.club_id}
                                                      close={this.isPopupToggle}
                                                      data={this.state.editData}
                                                      type={this.state.type}
                                                    /> : '';

    const items = this.props.portfolio.map((item,i) => {
      return (
        <span className='portfolio-obj' key={i}>
          {this.props.myPage ? <Portfolio
                                data={item}
                                myPage={this.props.myPage}
                                handleUpdate={this.handleUpdate}
                              /> : <Portfolio data={item} handleView={this.handleView}/>}
      </span>
      );
    });

    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
    };

    isArrows = (
      <div>
        <div className={this.props.portfolio.length > 2 ? 'left-arrow' : 'left-arrow disabled'} onClick={this.previous}></div>
        <div className={this.props.portfolio.length > 2 ? 'right-arrow' : 'right-arrow disabled'} onClick={this.next}></div>
      </div>
    );

    //마이페이지일 경우
    if(this.props.myPage){
      //슬라이더 갯수가 0 일 때, 버튼을 가운데로 하기 위해
      if(this.props.portfolio.length === 0){
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
              initialSlide={this.props.portfolio.length > 2 ? this.props.portfolio.length - 3 : 0}
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
          {isArrows}
        </div>
      );
    } else {
      slider = (
        <div id='portfolio-slide-wrap'>
          <Slider
            ref={ref => this.slider = ref}
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
            {isArrows}
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
  portfolio: PropTypes.arrayOf(PropTypes.object),
};

export default PortfolioNavigation;
