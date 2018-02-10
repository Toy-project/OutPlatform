import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import { fetchCreateCareer, fetchUpdateCareer } from 'actions/portfolio';

import { isNull, isEmpty } from 'helper/common';

class PortfolioPopup extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      career_id: this.props.data.career_id,
      career_name: this.props.data.career_name,
      career_ex: this.props.data.career_ex,
      career_photo: isNull(this.props.data.career_photo) ? [] : this.props.data.career_photo,
      career_due_start: this.props.data.career_due_start,
      career_due_end: this.props.data.career_due_end,
      career_people: 0,
      career_co: '기본값',
    }

    //닫기 함수
    this.closePopup = this.closePopup.bind(this);
    this.clickOutsideListner = this.clickOutsideListner.bind(this);

    //Submit
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //추가 버튼
    this.handleAdd = this.handleAdd.bind(this);
    //업데이트 버튼
    this.handleUpdate = this.handleUpdate.bind(this);

    //이미지 삽입
    this.onDrop = this.onDrop.bind(this);

    //동영상 삽입
    this.addVideoLink = this.addVideoLink.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('click', this.clickOutsideListner);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutsideListner);
  }

  //팝업을 종료하는 함수
  closePopup() {
    this.props.close();
  }

  clickOutsideListner(e) {
    if (e.target.id === 'popup_container'){
      this.closePopup();
    }
  }

  //Create
  handleAdd() {
    const data = {
      'career_name': this.state.career_name,
      'career_ex': this.state.career_ex,
      'career_due_start': this.state.career_due_start,
      'career_due_end': this.state.career_due_end,
      'club_id': this.props.club_id,
      // 'career_photo': this.state.career_photo,
      'career_people': this.state.career_people,
      'career_co': this.state.career_co,
    }

    this.props.fetchCreateCareer(data);
    this.props.handleAdd(true);
    this.closePopup();
  }

  handleChange(e){
    let value = e.target.value;
    if(e.target.id === 'career_due_start'){
      value = `${this.refs.from_year.value}-${this.refs.from_month.value}-${this.refs.from_day.value}`;
    }
    if(e.target.id === 'career_due_end'){
      value = `${this.refs.to_year.value}-${this.refs.to_month.value}-${this.refs.to_day.value}`;
    }

    this.setState({
      [e.target.id] : value,
    });
  }

  //Update
  handleUpdate() {
    const data = {
      'career_id' : this.state.career_id,
      'career_name': this.state.career_name,
      'career_ex': this.state.career_ex,
      'career_due_start': this.state.career_due_start,
      'career_due_end': this.state.career_due_end,
      'club_id': this.props.club_id,
      // 'career_photo': this.state.career_photo,
      'career_people': this.state.career_people,
      'career_co': this.state.career_co,
    }

    //PUT API
    this.props.fetchUpdateCareer(data);
    this.closePopup();
  }

  //Add video Link
  addVideoLink() {

  }

  onDrop(e) {
    const img = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.setState({
        ...this.state,
        career_photo: reader.result,
      });
    }, false);

    if(img) {
      reader.readAsDataURL(img);
    }
  }

  handleSubmit(){
    if(isEmpty(this.refs.career_name.value)) {
      this.refs.career_name.focus();
      return false;
    }
    if(isEmpty(this.refs.from_year.value)) {
      this.refs.from_year.focus();
      return false;
    }
    if(isEmpty(this.refs.from_month.value)) {
      this.refs.from_month.focus();
      return false;
    }
    if(isEmpty(this.refs.from_day.value)) {
      this.refs.from_day.focus();
      return false;
    }
    if(isEmpty(this.refs.to_year.value)) {
      this.refs.to_year.focus();
      return false;
    }
    if(isEmpty(this.refs.to_month.value)) {
      this.refs.to_month.focus();
      return false;
    }
    if(isEmpty(this.refs.to_day.value)) {
      this.refs.to_day.focus();
      return false;
    }
    if(isEmpty(this.refs.career_ex.value)) {
      this.refs.career_ex.focus();
      return false;
    }

    if(this.props.type === 0){
      this.handleAdd();
    } else {
      this.handleUpdate();
    }
  }

  render() {
    //2000년을 기준
    const yearCriteria = 2000;
    const setToday = new Date();
    const setMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const setDay = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
      '25', '26', '27', '28', '29', '30', '31'
    ];
    const defaultFromAndTo = '0-0-0';
    const from = !isNaN(this.state.career_due_start) ? dateFormat(this.state.career_due_start, 'yyyy-mm-dd').split('-') : defaultFromAndTo.split('-');
    const to = !isNaN(this.state.career_due_end) ? dateFormat(this.state.career_due_end, 'yyyy-mm-dd').split('-') : defaultFromAndTo.split('-');

    let setYear = [];

    let header;
    let footer;

    for(let i = yearCriteria; i <= setToday.getFullYear(); i++) {
      setYear.push(i);
    }


    //보기가 아닐 경우
    if(this.props.type !== 2){
      header = (
        <div>
          {/* <div className='preview'>
            <img src={this.state.career_photo} alt="" className='default-image' />
          </div> */}
          <div className='close-btn' onClick={this.closePopup}></div>
          <button className='ok-btn' onClick={this.handleSubmit}>확인</button>
          <div className='icons'>
            <div className='add-image-icon'>
              <label htmlFor="onDrop" className='image-icon'></label>
              <input type='file' ref='career_photo' id='onDrop' onChange={this.onDrop} accept="image/*"/>
              <h5>사진 업로드</h5>
            </div>
            <div className='add-video-icon'>
              <span className='video-icon' onClick={this.addVideoLink}></span>
              <h5>영상 url</h5>
            </div>
          </div>
        </div>
      );

      footer = (
        <div>
          <div className='portfolio-popup-input'>
            <label htmlFor='portfolio-name'>프로젝트 명</label>
            <input type='text' ref='career_name' id='career_name' placeholder='20자 이내' onChange={this.handleChange} defaultValue={this.state.career_name} />
          </div>
          <div className='portfolio-popup-input'>
            <label htmlFor='portfolio-name'>프로젝트 기간</label>
            <span className='from'>
              <select ref='from_year' className='year' defaultValue={from[0]} onChange={this.handleChange} id='career_due_start'>
                <option value=''>년도</option>
                {setYear.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='from_month' className='month' defaultValue={from[1]} onChange={this.handleChange} id='career_due_start'>
                <option value=''>월</option>
                {setMonth.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='from_day' className='day' defaultValue={from[2]} onChange={this.handleChange} id='career_due_start'>
                <option value=''>일</option>
                {setDay.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              부터
            </span>

            <span className='to'>
              <select ref='to_year' className='year' defaultValue={to[0]} onChange={this.handleChange} id='career_due_end'>
                <option value=''>년도</option>
                {setYear.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='to_month' className='month' defaultValue={to[1]} onChange={this.handleChange} id='career_due_end'>
                <option value=''>월</option>
                {setMonth.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              <select ref='to_day' className='day' defaultValue={to[2]} onChange={this.handleChange} id='career_due_end'>
                <option value=''>일</option>
                {setDay.map((val, key) => {
                  return <option key={key} value={val}>{val}</option>
                })}
              </select>
              까지
            </span>
          </div>
          <div className='portfolio-popup-input'>
            <label htmlFor='portfolio-name'>프로젝트 설명</label>
            <textarea ref='career_ex' defaultValue={this.state.career_ex} onChange={this.handleChange} id='career_ex'></textarea>
          </div>
        </div>
      );
    }
    return (
      <div id='popup_container' className='popup_container'>
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
