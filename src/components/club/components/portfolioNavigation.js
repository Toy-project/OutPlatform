import React from 'react';
import Slider from 'react-slick';

import Portfolio from './portfolio';
import PortfolioPopup from './portfolioPopup';

class PortfolioNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ["1",
              "2",
              "3",
              "4"],
      editToggle : false,
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    //수정 팝업
    this.isEditToggle = this.isEditToggle.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  isEditToggle(){
    this.setState({
      ...this.state,
      editToggle: !this.state.editToggle,
    });
  }

  componentDidMount(){
    if(this.props.myPage) {
      const element = document.getElementById('add');
      element.addEventListener("transitionend", () => {
        this.setState({
          ...this.state,
          items: [...this.state.items, 'new'],
        });
        this.isEditToggle();
        element.classList.remove('isReady');
      }, false);
    }
  }

  handleAdd(e){
    const element = document.getElementById('add');
    element.classList.add('isReady');
  }

  render() {
    let isSlider;
    let showEditPopup = this.state.editToggle ? <PortfolioPopup close={this.isEditToggle} /> : '';
    const items = this.state.items.map((item,i) => (
      <span key={i}><Portfolio name={i} myPage={this.props.myPage} open={this.isEditToggle} /></span>
    ));

    const settings = {
      dots: false,
      infinite: true,
      slidesToScroll: 1,
      arrows: false,
    };

    if(this.props.myPage){
      isSlider = (
        <div className='portfolio-mypage-slide-wrapper'>
          <div className='portfolio-mypage-slide'>
            <div className='portfolio-mypage-slide-inner'>
              <Slider
                ref={ref => this.slider = ref}
                slidesToShow={1}
                {...settings}
                >
                {items}
              </Slider>
            </div>
          </div>
          <div className='portfolio-mypage-add' id='add' onClick={this.handleAdd}>
            <span className='animation'><Portfolio name='test' myPage={this.props.myPage}/></span>
          </div>
          <div>
            <div className='left-arrow' onClick={this.previous}></div>
          </div>
        </div>
      );
    } else {
      isSlider = (
          <div className='portfolio-slide-wrapper'>
            <Slider
              ref={ref => this.slider = ref}
              slidesToShow={4}
              {...settings}
              >
                <span><Portfolio name='1' /></span>
                <span><Portfolio name='2' /></span>
                <span><Portfolio name='3' /></span>
                <span><Portfolio name='4' /></span>
                <span><Portfolio name='5' /></span>
                <span><Portfolio name='6' /></span>
                <span><Portfolio name='7' /></span>
                <span><Portfolio name='8' /></span>
            </Slider>
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
              {isSlider}
            </div>
          </div>
        </div>
        {showEditPopup}
      </div>
    )
  }
}

PortfolioNavigation.propTypes = {
};

export default PortfolioNavigation;
