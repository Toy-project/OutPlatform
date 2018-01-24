import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isMyPageToggle: this.props.myPage,
      isEditToggle: false,
      data: {
        college: '',
        type: '',
        countOfMember: '',
        tag: '',
        snippet: '',
        sns: {
          naver: '',
          facebook: '',
          insta: '',
        }
      }
    }

    this.editToggle = this.editToggle.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
  }

  editToggle() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
    });
  }

  editSubmit() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
      data: {
        ...this.state,
        college: this.refs.college.value,
        type: this.refs.type.value,
        countOfMember: this.refs.countOfMember.value,
        tag: this.refs.tag.value,
        snippet: this.refs.snippet.value,
        sns: {
          ...this.state.sns,
          naver: this.refs.naver.value,
          facebook: this.refs.facebook.value,
          insta: this.refs.insta.value,
        }
      }
    });
  }

  render() {
    let editButton;
    let viewContents = this.state.data.snippet.split('\n').map((line, key) => {
      return (<span key={key}>{line}<br /></span>);
    });
    let viewSNS;
    let editInputText = (id, placeholder) => {
      switch(id){
        case 'college':
          return (
            <select defaultValue='서울대학교' ref={id}>
              <option value="서울대학교">서울대학교</option>
              <option value="우리대학교">우리대학교</option>
              <option value="하나대학교">하나대학교</option>
              <option value="신나대학교">신나대학교</option>
            </select>
          );
        case 'type':
          return (
            <select defaultValue='Type1' ref={id}>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
              <option value="Type3">Type3</option>
              <option value="Type4">Type4</option>
            </select>
          );
        case 'countOfMember':
          return (
            <span>
              <input type='text' ref={id} placeholder={placeholder} defaultValue={this.state.data.countOfMember} /> 명
            </span>
          );
        case 'tag':
          return (
            <select defaultValue='#성실한' ref={id}>
              <option value="#성실한">#성실한</option>
              <option value="#개성있는">#개성있는</option>
              <option value="#잘하는">#잘하는</option>
            </select>
          );
        case 'snippet':
          return (
            <textarea ref={id} placeholder={placeholder} defaultValue={this.state.data.snippet}></textarea>
          )
        case 'sns':
          return (
            <span>
              <span className='sns'><input type='text' ref='facebook' placeholder={placeholder} /></span>
              <span className='sns'><input type='text' ref='naver' placeholder={placeholder} /></span>
              <span className='sns'><input type='text' ref='insta' placeholder={placeholder} /></span>
            </span>
          )
        default:
          return false;
      }
    }

    //수정 버튼 Toggle
    if(this.state.isMyPageToggle && !this.state.isEditToggle){
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
      <span>
        <span className='sns'>네이버</span>
        <span className='sns'>인스타</span>
        <span className='sns'>페이스북</span>
      </span>
    )

    return(
      <div className='profile-container'>
        <div className='container'>
          {editButton}
          <div className='profile-inner'>
            <div className='title-wrapper'>
              <span></span>
              <h3>단체 프로필</h3>
            </div>
            <div className='profile-content'>
              <div className='contents'>
                <h5>소속학교</h5>
                <p>{this.state.isEditToggle ? editInputText('college') : this.state.data.college}</p>
              </div>
              <div className='contents'>
                <h5>단체종류</h5>
                <p>{this.state.isEditToggle ? editInputText('type') : this.state.data.type}</p>
              </div>
              <div className='contents'>
                <h5>활동인원</h5>
                <p>{this.state.isEditToggle ? editInputText('countOfMember', '인원 수를 입력해주세요.') : this.state.data.countOfMember}</p>
              </div>
              <div className='contents'>
                <h5>태그</h5>
                <p>{this.state.isEditToggle ? editInputText('tag') : this.state.data.tag}</p>
              </div>
            </div>
            <div className='profile-content'>
              <div className='contents-area'>
                <h5>단체소개</h5>
                <p>{this.state.isEditToggle ? editInputText('snippet', '우리 단체에 대한 소개를 올려주세요!') : viewContents}</p>
              </div>
              <div className='contents'>
                <h5>SNS</h5>
                <p>{this.state.isEditToggle ? editInputText('sns') : viewSNS}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  myPage: PropTypes.bool,
};

export default Profile;
