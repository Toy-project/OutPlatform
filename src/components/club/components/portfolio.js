import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import { CSSTransition, transit } from "react-css-transition";
import { fetchDeleteCareer } from 'actions/portfolio';

const transitionStyles = {
  defaultStyle: {
    transform: "translate(0, 0)",
    opacity: 1,
  },
  enterStyle: {
    transform: transit("translate(0, -50px)", 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    opacity: transit(0, 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
  },
  activeStyle: {
    transform: "translate(0, -50px)",
    opacity: 0,
  },
};

class Portfolio extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
    }

    this.removeItem = this.removeItem.bind(this);

    //애니메이션 토글
    this.handleToggle = this.handleToggle.bind(this);

    //팝업 토글
    this.handlePopupToggle = this.handlePopupToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active
    });
  }

  removeItem() {
    this.handleToggle();
    setTimeout(() => {
      this.props.fetchDeleteCareer(this.props.data.club_id, this.props.data.career_id);
    }, 300);
  }

  handlePopupToggle() {
    this.props.dataLoader(this.props.data);
    this.props.popupToggle();
  }

  render() {
    let isButton;
    let isDelete;

    if(this.props.myPage){
      isButton = (
        <div className='portfolio-edit-btn'>
          <button onClick={this.handlePopupToggle}>수정</button>
        </div>
      );

      isDelete = (
        <div className='remove-btn' onClick={this.removeItem}>
          <span className='x-icon'></span>
        </div>
      );
    } else {
      isButton = (
        <div className='portfolio-view-btn'>
          <button onClick={this.handlePopupToggle}>더 보기</button>
        </div>
      );

      isDelete = '';
    }
    return (
      <CSSTransition
        transitionAppear={true}
        {...transitionStyles}
        active={this.state.active}>
        <div className='portfolio-card'>
          {isDelete}
          <div className='card-image'>
            {this.props.data.career_photo ? <img src={`${process.env.API_URL}/${this.props.data.career_photo}`} alt="" className='default-image' /> :
                                            <img src='http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif' alt="" className='default-image' /> }
          </div>
          <div className='card-content-container'>
            <section>
              <h4>{this.props.data.career_name}</h4>
              <h5>
                {dateFormat(this.props.data.career_due_start,'yyyy.mm.dd')} - {dateFormat(this.props.data.career_due_end,'yyyy.mm.dd')}
              </h5>
            </section>
            <p>
              {this.props.data.career_ex}
            </p>
            {isButton}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

Portfolio.propTypes = {
  data : PropTypes.shape({
    career_id: PropTypes.number,
    career_name: PropTypes.string,
    career_ex: PropTypes.string,
    career_photo: PropTypes.string,
    career_due_start: PropTypes.date,
    career_due_end: PropTypes.date,
    career_people: PropTypes.number,
    club_id: PropTypes.number,
  })
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteCareer : (club_id, career_id) => {
      return dispatch(fetchDeleteCareer(club_id, career_id));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
