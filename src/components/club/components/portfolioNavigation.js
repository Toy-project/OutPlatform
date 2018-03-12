import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
//
import Portfolio from './portfolio';
import PortfolioPopup from './portfolioPopup';

class PortfolioNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddPopupToggle : false,
      isEditPopupToggle : false,
      data : {},
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    //팝업 토글
    this.addPopupToggle = this.addPopupToggle.bind(this);
    this.editPopupToggle = this.editPopupToggle.bind(this);
    this.editDataLoader = this.editDataLoader.bind(this);
  }

  next() {
    //안에 데이터가 없으면 작동안함
    this.slider.slickNext();
  }
  previous() {
    //안에 데이터가 없으면 작동안함
    this.slider.slickPrev();
  }

  addPopupToggle() {
    this.setState({
      isAddPopupToggle: !this.state.isAddPopupToggle,
    })
  }

  editPopupToggle() {
    this.setState({
      isEditPopupToggle: !this.state.isEditPopupToggle,
    })
  }

  editDataLoader(data) {
    this.setState({
      data: data,
    })
  }

  componentDidMount() {
  }

  render() {
    const settingsForEdit = {
      dots: false,
      infinite: false,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      className: 'slider',
    }

    const settingsForView = {
      dots: false,
      infinite: false,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      className: 'slider',
    }

    const initial = {
      career_name : '',
      career_due_start: new Date(),
      career_due_end: new Date(),
      career_ex: '',
      career_photo: '',
      club_id: this.props.club_id,
    }

    const isArrows = (
      <div>
        <div className={this.props.portfolio.length > 2 ? 'left-arrow' : 'left-arrow disabled'} onClick={this.previous}></div>
        <div className={this.props.portfolio.length > 2 ? 'right-arrow' : 'right-arrow disabled'} onClick={this.next}></div>
      </div>
    );

    const addPopup = this.state.isAddPopupToggle ? <PortfolioPopup type='create' data={initial} close={this.addPopupToggle} myPage={this.props.myPage} /> : '';
    const editPopup = this.state.isEditPopupToggle ? <PortfolioPopup type='edit' data={this.state.data} close={this.editPopupToggle} myPage={this.props.myPage} /> : '';

    const items = this.props.portfolio.map((item, key) => {
      return (
        <div className='portfolio-obj' key={key}><Portfolio data={item} myPage={this.props.myPage} popupToggle={this.editPopupToggle} dataLoader={this.editDataLoader} /></div>
      );
    });

    const isSlider = () => {
      if(this.props.myPage) {
        if(this.props.portfolio.length === 0) {
          return (
            <span className='portfolio-add' onClick={this.addPopupToggle}></span>
          );
        } else {
          return (
            <Slider ref={c => this.slider = c } {...settingsForEdit}>
              {items}
              <div className='portfolio-obj'><div className='portfolio-add' onClick={this.addPopupToggle}></div></div>
            </Slider>
          );
        }
      } else {
        if(this.props.portfolio.length === 0) {
          return (
            <div className='whenEmptyData'>
              <h2>아직 등록된 포트폴리오가 없습니다.</h2>
            </div>
          );
        } else {
          if(this.props.portfolio.length > 2) {
            return (
              <Slider ref={c => this.slider = c } {...settingsForView}>
                {items}
              </Slider>
            );
          } else {
            return (
              <div className='not-slider'>
                {items}
              </div>
            );
          }
        }
      }
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
                {isSlider()}
                {isArrows}
              </div>
            </div>
            {addPopup}
            {editPopup}
          </div>
        </div>
      </div>
    )
  }
}

PortfolioNavigation.propTypes = {
  myPage: PropTypes.bool,
  portfolio: PropTypes.arrayOf(PropTypes.object),
};

export default PortfolioNavigation;
