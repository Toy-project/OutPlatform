import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import { fetchUpdateClub } from 'actions/club';

import { subStringLimitStringLength, isNull } from 'helper/common';

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      myPage: this.props.myPage,
      isEditToggle: false,
      isSubmited: false,

      club_college: this.props.club_college,
      cate_id: this.props.cate_id,
      tag_id: this.props.tag_id,
      cate_name: this.props.cate_name,
      tag_name: this.props.tag_name,
      club_ex: isNull(this.props.club_ex) ? '' : this.props.club_ex,
      sns: this.props.sns,
    }

    this.editToggle = this.editToggle.bind(this);
    this.editSubmit = this.editSubmit.bind(this);

    this.handleSnsTransition = this.handleSnsTransition.bind(this);

    this.snippetLimitStringLength = this.snippetLimitStringLength.bind(this);
  }

  editToggle() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
      isSubmited: false,
    });
  }

  snippetLimitStringLength(e) {
    const target = e.target.id;
    const error = document.getElementById(`${target}_error`);
    const isValid = subStringLimitStringLength(target, 200);

    if(!isValid){
      // 허용되는 바이트까지 자르기
      error.innerHTML = '200자가 넘었습니다!';
      error.className = 'warning-color';

    } else {
      error.innerHTML = '최대 200글자까지 허용됩니다.';
      error.className = '';
    }
  }

  editSubmit() {
    let tag_name;
    let cate_name;

    this.props.tag.data.map((item) => {
      if(parseInt(this.refs.tag_id.value, 10) === item.tag_id) {
        tag_name = item.tag_name;
      }
      return false;
    });

    this.props.category.data.map((item) => {
      if(parseInt(this.refs.cate_id.value,10) === item.cate_id) {
        cate_name = item.cate_name;
      }
      return false;
    });

    this.setState({
      isEditToggle: !this.state.isEditToggle,
      isSubmited: true,
      club_college: this.refs.club_college.value,
      cate_id: this.refs.cate_id.value,
      tag_id: this.refs.tag_id.value,
      cate_name: cate_name,
      tag_name: tag_name,
      club_ex: this.refs.club_ex.value,
    });
  }

  componentDidUpdate() {
    if(this.state.isSubmited){
        const data = {
          club_college: this.state.club_college,
          cate_id: this.state.cate_id,
          tag_id: this.state.tag_id,
          club_ex: this.state.club_ex,
        }

        this.props.fetchUpdateClub(this.props.club_id, data);
    }
  }

  handleSnsTransition = (url) => (e) => {
    //URL CHECK
    const prefix = 'http://';
    if(url.toLowerCase().indexOf(prefix) === -1){
      url = ''.concat(prefix, url);
    }

    window.location.href = url;
  }

  render() {
    let editButton;
    let viewContents = this.state.club_ex.split('\n').map((line, key) => {
      return (<span key={key}>{line}<br /></span>);
    });
    let viewSNS;
    let tag;

    let editInputText = (id, placeholder) => {
      switch(id){
        case 'club_college':
          return (
            <select defaultValue={this.state.club_college} ref={id}>
              <option value="서울대학교">서울대학교</option>
              <option value="우리대학교">우리대학교</option>
              <option value="하나대학교">하나대학교</option>
              <option value="test">신나대학교</option>
            </select>
          );
        case 'cate_id':
          return (
            <select defaultValue={this.state.cate_id} ref={id}>
              {this.props.category.data.map((item, key) => {
                return (<option value={item.cate_id} key={key}>{item.cate_name}</option>);
              })}
            </select>
          );
        case 'tag_id':
          return (
            <select defaultValue={this.state.tag_id} ref={id}>
              {this.props.tag.data.map((item, key) => {
                return (<option value={item.tag_id} key={key}>#{item.tag_name}</option>);
              })}
            </select>
          );
        case 'club_ex':
          return (
            <span>
              <span id='club_ex_limitation' className='club-ex-limitation'>0/200</span>
              <textarea ref={id} id='club_ex' onChange={this.snippetLimitStringLength} placeholder={placeholder} defaultValue={this.state.club_ex}></textarea>
              <a className='club-ex-error' id='club_ex_error'>최대 200글자까지 허용됩니다.</a>
            </span>
          );
        case 'sns':
          return (
            <span className='sns'>
              <i className={`sns-basic-icon facebook`}></i>
            </span>
          );
        default:
          return false;
      }
    }

    //수정 버튼 Toggle
    if(this.state.myPage && !this.state.isEditToggle){
      editButton = (
        <div className='edit-btn'>
          <button className='emerald-btn' onClick={this.editToggle}>수정</button>
        </div>
      );
    } else if(this.state.isEditToggle) {
      editButton = (
        <div className='edit-btn'>
          <button className='gray-btn' onClick={this.editToggle}>취소</button>
          <button className='emerald-btn' onClick={this.editSubmit}>확인</button>
        </div>
      );
    } else {
      editButton = '';
    }

    viewSNS = (
      <span className='sns'>
        {this.state.sns.map((item, key) => {
          return (
            <i key={key} id={item.sns_name} onClick={this.handleSnsTransition(item.sns_url)} className={`sns-basic-icon ${item.sns_name}`}></i>
          );
        })}
      </span>
    );

    tag = () => {
      if(this.state.isEditToggle) {
        return (<p>{editInputText('tag_id')}</p>);
      } else {
        return (
          <span className='tag'>{`#${this.state.tag_name}`}</span>
        );
      }
    }

    return(
      <div className='profile-container'>
        <div className='container'>
          {editButton}
          <div className='profile-inner'>
            <div className='title-wrapper'>
              <span></span>
              <h3>단체 프로필</h3>
            </div>
            <div className='profile-inner-left'>
              <ul>
                <li>
                  <h5>소속학교</h5>
                  <p>{this.state.isEditToggle ? editInputText('club_college') : this.state.club_college}</p>
                </li>
                <li>
                  <h5>단체종류</h5>
                  <p>{this.state.isEditToggle ? editInputText('cate_id') : this.state.cate_name}</p>
                </li>
                <li>
                  <h5>태그</h5>
                  {tag()}
                </li>
              </ul>
            </div>
            <div className='profile-inner-right'>
              <ul>
                <li>
                  <h5>단체소개</h5>
                  <div className='club-ex'>
                    {this.state.isEditToggle ? editInputText('club_ex', '우리 단체에 대한 소개를 올려주세요!') : viewContents}
                  </div>
                </li>
                <li>
                  <h5>SNS</h5>
                  <p>{this.state.isEditToggle ? editInputText('sns') : viewSNS}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    tag: state.tag,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateClub : (club_id, data) => {
      dispatch(fetchUpdateClub(club_id, data));
    }
  }
}

Profile.propTypes = {
  myPage: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
