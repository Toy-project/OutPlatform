import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import { CSSTransition, transit } from "react-css-transition";
import { fetchCreateCareer, fetchUpdateCareer } from 'actions/portfolio';

import { isEmpty } from 'helper/common';

const transitionStyles = {
  defaultStyle: {
    transform: "translate(0, 0)",
    opacity: 0,
  },
  enterStyle: {
    transform: transit("translate(0, 20px)", 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    opacity: transit(1, 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
  },
  leaveStyle: {
    transform: transit("translate(0, 0)", 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    opacity: transit(0, 100, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
  },
  activeStyle: {
    transform: "translate(0, 20px)",
    opacity: 1,
  },
};

class PortfolioPopup extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      career_name: this.props.data.career_name,
      career_due_start: this.props.data.career_due_start,
      career_due_end: this.props.data.career_due_end,
      career_ex: this.props.data.career_ex,
      career_photo: this.props.data.career_photo,
      career_people: 0,
      career_co: '기본값',

      active: true,
    }

    //닫기 함수
    this.closePopup = this.closePopup.bind(this);

    //Handle input
    this.handleChange = this.handleChange.bind(this);

    //Submit
    this.checkEmptyField = this.checkEmptyField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //handleAnimationToggle
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  //팝업을 종료하는 함수
  closePopup() {
    this.handleToggle();

    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if(target.id === 'career_due_start'){
      value = `${this.refs.from_year.value}-${this.refs.from_month.value}-${this.refs.from_day.value}`;
    }
    if(target.id === 'career_due_end'){
      value = `${this.refs.to_year.value}-${this.refs.to_month.value}-${this.refs.to_day.value}`;
    }

    this.setState({
      [target.id] : value,
    });
  }

  checkEmptyField() {
    if(isEmpty(this.refs.career_name.value)) this.refs.career_name.focus();
    else if(isEmpty(this.refs.from_year.value)) this.refs.from_year.focus();
    else if(isEmpty(this.refs.from_month.value)) this.refs.from_month.focus();
    else if(isEmpty(this.refs.from_day.value)) this.refs.from_day.focus();
    else if(isEmpty(this.refs.to_year.value)) this.refs.to_year.focus();
    else if(isEmpty(this.refs.to_month.value)) this.refs.to_month.focus();
    else if(isEmpty(this.refs.to_day.value)) this.refs.to_day.focus();
    else if(isEmpty(this.refs.career_ex.value)) this.refs.career_ex.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit() {
    let isValid = this.checkEmptyField();

    if(isValid) {
      const data = {
        career_name: this.state.career_name,
        career_due_start: this.state.career_due_start,
        career_due_end: this.state.career_due_end,
        career_ex: this.state.career_ex,
        career_photo: this.state.career_photo,
        career_people: 0,
        career_co: '기본값',
        club_id: this.props.data.club_id,
      }

      if(this.props.type === 'create') {
        this.props.fetchCreateCareer(data);
        this.closePopup();
      }

      if(this.props.type === 'edit') {
        const edit = {
          ...data,
          career_id: this.props.data.career_id,
        }

        console.log(edit);

        this.props.fetchUpdateCareer(edit);
        this.closePopup();
      }
    }
  }

  render() {
    //Layout
    const header_submit_btn = () => {
      if(this.props.myPage) {
        return (
          <button className='ok-btn' onClick={this.handleSubmit}>확인</button>
        );
      } else {
        return '';
      }
    }

    const header_contents = () => {
      if(this.props.myPage) {
        return (
          <div>
            <div className='add-image-icon'>
              <label htmlFor="career_photo" className='image-icon'></label>
              <input type='file' ref='career_photo' id='career_photo' onChange={this.onDrop} accept="image/*"/>
              <h5>사진 업로드</h5>
            </div>
            <div className='add-video-icon'>
              <span className='video-icon' onClick={this.addVideoLink}></span>
              <h5>영상 url</h5>
            </div>
          </div>
        );
      } else {
        // toDoList
        return '';
      }
    }

    const footer_name = () => {
      if(this.props.myPage) {
        return (
          <input type='text' ref='career_name' id='career_name' placeholder='20자 이내' onChange={this.handleChange} defaultValue={this.state.career_name} />
        );
      } else {
        return this.props.data.career_name;
      }
    }

    const footer_date = () => {
      if(this.props.myPage) {
        return (
          <div>
            <span className='from'>
              <select ref='from_year' className='year' defaultValue={from[0]} onChange={this.handleChange} id='career_due_start'>
                <option value='00'>년도</option>
                {setYear.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='from_month' className='month' defaultValue={from[1]} onChange={this.handleChange} id='career_due_start'>
                <option value='00'>월</option>
                {setMonth.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='from_day' className='day' defaultValue={from[2]} onChange={this.handleChange} id='career_due_start'>
                <option value='00'>일</option>
                {setDay.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              부터
            </span>

            <span className='to'>
              <select ref='to_year' className='year' defaultValue={to[0]} onChange={this.handleChange} id='career_due_end'>
                <option value='00'>년도</option>
                {setYear.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='to_month' className='month' defaultValue={to[1]} onChange={this.handleChange} id='career_due_end'>
                <option value='00'>월</option>
                {setMonth.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='to_day' className='day' defaultValue={to[2]} onChange={this.handleChange} id='career_due_end'>
                <option value='00'>일</option>
                {setDay.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              까지
            </span>
          </div>
        );
      } else {
        return `${this.props.data.career_due_start} - ${this.props.data.career_due_end}`;
      }
    }

    const footer_ex = () => {
      if(this.props.myPage) {
        return (
          <textarea ref='career_ex' id='career_ex' defaultValue={this.state.career_ex} onChange={this.handleChange}></textarea>
        );
      } else {
        return this.props.data.career_ex.split('\n').map((line, key) => {
          return (<span key={key}>{line}<br /></span>);
        });
      }
    }

    //2000년을 기준
    const yearCriteria = 2000;
    const setToday = new Date();
    const setMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const setDay = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
      '25', '26', '27', '28', '29', '30', '31'
    ];

    let from = [0, 0, 0];
    let to = [0, 0, 0];

    if(this.props.type === 'edit') {
      from = dateFormat(this.state.career_due_start, 'yyyy-mm-dd').split('-');
      to = dateFormat(this.state.career_due_end, 'yyyy-mm-dd').split('-');
    }

    let setYear = [];

    let header;
    let footer;

    for(let i = yearCriteria; i <= setToday.getFullYear(); i++) {
      setYear.push(i);
    }


    header = (
      <div>
        {/* <div className='preview'>
          <img src={this.state.career_photo} alt="" className='default-image' />
        </div> */}
        <div className='close-btn' onClick={this.closePopup}>
          <span className='x-icon'></span>
        </div>
        {header_submit_btn()}
        <div className='icons'>
          {header_contents()}
        </div>
      </div>
    );

    footer = (
      <div>
        <div className='portfolio-popup-input'>
          <label htmlFor='portfolio-name'>프로젝트 명</label>
          {footer_name()}
        </div>
        <div className='portfolio-popup-input'>
          <label htmlFor='portfolio-name'>프로젝트 기간</label>
          {footer_date()}
        </div>
        <div className='portfolio-popup-input'>
          <label htmlFor='portfolio-name'>프로젝트 설명</label>
          {footer_ex()}
        </div>
      </div>
    );
    return (
        <div className='popup_container'>
          <CSSTransition
            transitionAppear={true}
            {...transitionStyles}
            active={this.state.active}>
            <div className='portfolio-popup-wrapper'>
              <div className='portfolio-popup-inner'>
                <div className='portfolio-popup-header'>
                  {header}
                </div>
                <div className='portfolio-popup-footer'>
                  {footer}
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
    );
  }
}

PortfolioPopup.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCreateCareer: (data) => {
      dispatch(fetchCreateCareer(data));
    },
    fetchUpdateCareer: (data) => {
      dispatch(fetchUpdateCareer(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPopup);
