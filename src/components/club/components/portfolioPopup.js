import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { CSSTransition } from "react-css-transition";
import { fetchCreateCareer, fetchUpdateCareer } from 'actions/portfolio';

import * as Variables from 'helper/variables';
import { isEmpty } from 'helper/common';

import * as AnimationStyle from 'helper/animationStyle';
import { InnerLoading } from 'components/';
import MessagePopup from 'components/messagePopup';

class PortfolioPopup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      preview_photo : this.props.data.career_photo ? `/${this.props.data.career_photo}` : '',
      preview_photo_flag : false,

      career_photo: '',

      isUploadButton_slide: false,
      imageOverflowsLimitToggle : false,

      isLoading: false,
      popupContainerHeight : 0,
      active: false,
    }

    //닫기 함수
    this.closePopup = this.closePopup.bind(this);

    //Submit
    this.checkEmptyField = this.checkEmptyField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //Upload photo
    this.onDrop = this.onDrop.bind(this);
    this.crop = this.crop.bind(this);
    this.addVideoLink = this.addVideoLink.bind(this);

    //handleAnimationToggle
    this.handleToggle = this.handleToggle.bind(this);

    this.isImageOverflowsLimitToggle = this.isImageOverflowsLimitToggle.bind(this);

    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  addVideoLink() {
    alert('현재 업데이트 중입니다');
  }

  //팝업을 종료하는 함수
  closePopup() {
    this.handleToggle();

    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  crop() {
    //Loading
    this.setState({
      isLoading: !this.state.isLoading,
    });

    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      // const dataURI = this.refs.cropper.getCroppedCanvas().toDataURL();
      if(blob.size > Variables.FileSize) {
        this.setState({
          isLoading: !this.state.isLoading,
        });
        this.isImageOverflowsLimitToggle();
      } else {
        this.setState({
          preview_photo : this.refs.cropper.getCroppedCanvas().toDataURL(),
          career_photo : blob,
          preview_photo_flag : !this.state.preview_photo_flag,
          isLoading: !this.state.isLoading,
          isUploadButton_slide: false,
        });
      }
    });
  }

  onDrop(e) {
    const img = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // 미리보기 이미지 저장 & 토글 변경
      this.setState({
        preview_photo : reader.result,
        preview_photo_flag: !this.state.preview_photo_flag,
        isUploadButton_slide: !this.state.isUploadButton_slide,
      });
    }, false);

    if(img) {
      reader.readAsDataURL(img);
    }
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
    else if(this.state.preview_photo_flag) return false;
    else {
      return true;
    }

    return false;
  }

  handleSubmit() {
    let isValid = this.checkEmptyField();

    if(isValid) {
      const form = new FormData();

      form.append('career_name', this.refs.career_name.value);
      form.append('career_ex', this.refs.career_ex.value);
      form.append('career_due_start', `${this.refs.from_year.value}-${this.refs.from_month.value}-${this.refs.from_day.value}`);
      form.append('career_due_end', `${this.refs.to_year.value}-${this.refs.to_month.value}-${this.refs.to_day.value}`);
      form.append('career_people', 0);
      form.append('career_co', '기본값');
      form.append('club_id', this.props.data.club_id);

      //추가한 이미지가 있으면 추가.
      if(this.state.career_photo) {
        form.append('career_photo', this.state.career_photo);
      }

      if(this.props.type === 'create') {
        this.props.fetchCreateCareer(form);
        this.closePopup();
      }

      if(this.props.type === 'edit') {
        this.props.fetchUpdateCareer(this.props.data.career_id, form);
        this.closePopup();
      }
    }
  }

  componentDidMount() {
    window.addEventListener('load', this.setPopupContainerHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setPopupContainerHeight());
  }

  setPopupContainerHeight() {
    this.setState({
      active : !this.state.active,
      popupContainerHeight : document.getElementById('popup-wrapper').offsetHeight,
    });
  }

  isImageOverflowsLimitToggle() {
    this.setState({
      imageOverflowsLimitToggle: !this.state.imageOverflowsLimitToggle,
    });
  }

  render() {
    //Animation Styles
    const _thisContainerMinHeight = this.state.popupContainerHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2;

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
      from = dateFormat(this.props.data.career_due_start, 'yyyy-mm-dd').split('-');
      to = dateFormat(this.props.data.career_due_end, 'yyyy-mm-dd').split('-');
    }

    let setYear = [];

    let header;
    let footer;

    for(let i = yearCriteria; i <= setToday.getFullYear(); i++) {
      setYear.push(i);
    }

    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

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
        if(this.state.isUploadButton_slide) {
          return (
            <div>
              <div className='add-image-icon'>
                <label htmlFor="career_photo" className='default-icon' onClick={this.crop}>잘라내기</label>
              </div>
              {/* <div className='add-video-icon'>
                <span className='video-icon' onClick={this.addVideoLink}></span>
                <h5>영상 url</h5>
              </div> */}
            </div>
          );
        } else {
          return (
            <div>
              <div className='add-image-icon'>
                <label htmlFor="career_photo" className='image-icon'></label>
                <input type='file' ref='career_photo' id='career_photo' onChange={this.onDrop} accept="image/*"/>
                <h5>사진 업로드</h5>
              </div>
              {/* <div className='add-video-icon'>
                <span className='video-icon' onClick={this.addVideoLink}></span>
                <h5>영상 url</h5>
              </div> */}
            </div>
          );
        }
      }
    }

    const footer_name = () => {
      if(this.props.myPage) {
        return (
          <input type='text' ref='career_name' id='career_name' placeholder='20자 이내' onChange={this.handleChange} defaultValue={this.props.data.career_name} />
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
          <textarea ref='career_ex' id='career_ex' defaultValue={this.props.data.career_ex} onChange={this.handleChange}></textarea>
        );
      } else {
        return this.props.data.career_ex.split('\n').map((line, key) => {
          return (<span key={key}>{line}<br /></span>);
        });
      }
    }

    const cropper = (
      <Cropper
      ref='cropper'
      src={this.state.preview_photo}
      style={{height: 440, width: '100%'}}
      // Cropper.js options
      aspectRatio={4 / 3}
      guides={false} />
    );

    const imageOverflowsLimitToggle = this.state.imageOverflowsLimitToggle ? <MessagePopup msg={'이미지 용량 2MB를 넘을 수 없습니다.'} close={this.isImageOverflowsLimitToggle} /> : '';

    const preview_image = () => {
      if(this.props.myPage){
        return (
          <div>
            {this.state.preview_photo_flag ? cropper : <img src={this.state.preview_photo} className='preview' alt='' />}
          </div>
        );
      } else {
        return (
          <div>
            <img src={`/${this.props.data.career_photo}`} className='preview' alt='' />
          </div>
        );
      }
    }

    header = (
      <div>
        {preview_image()}
        <div className='close-btn' onClick={this.closePopup}>
          <span className='x-icon'></span>
        </div>
        {header_submit_btn()}
        <div className='icons'>
          {this.state.isLoading ? '' : header_contents()}
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
        <div>
          <div className='popup_container'>
            <CSSTransition
              transitionAppear={true}
              {...AnimationStyle.transitionStyles(_animationStartFrom)}
              active={this.state.active}>
              <div id='popup-wrapper' className='portfolio-popup-wrapper'>
                <div className='portfolio-popup-inner'>
                  <div className='portfolio-popup-header'>
                    {header}
                    {this.state.isLoading ? loading : ''}
                  </div>
                  <div className='portfolio-popup-footer'>
                    {footer}
                  </div>
                </div>
              </div>
            </CSSTransition>
          </div>
          {imageOverflowsLimitToggle}
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
    fetchUpdateCareer: (career_id, data) => {
      dispatch(fetchUpdateCareer( career_id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPopup);
