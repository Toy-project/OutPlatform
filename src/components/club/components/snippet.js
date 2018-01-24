import React from 'react';
import PropTypes from 'prop-types';

class Snippet extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isMyPageToggle: this.props.myPage,
      isEditToggle: false,
      title: '대학단체 1',
      contents: '회원가입 단계에서 미리 입력된 동아리 설명이 나타납니다. \n 단계에서 미리 입력된 동아리 설명이 나타납니다',
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
      contents: this.textarea.value,
    });
  }

  render() {
    let editButton;
    let editContents = <textarea ref={ref => this.textarea = ref} placeholder='회원가입 단계에서 미리 입력된 동아리 설명이 나타납니다.(30자 이내)'>{this.state.contents}</textarea>;
    let viewContents = this.state.contents.split('\n').map((line, key) => {
      return (<span key={key}>{line}<br /></span>);
    });

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

    return (
      <div className='snippet-container'>
        <div className='container'>
          {editButton}
          <div className='snippet-inner'>
            <div>
              <h1 className='title'>{this.state.title}</h1>
              <p>{this.state.isEditToggle ? editContents : viewContents}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Snippet.propTypes = {
  myPage: PropTypes.bool,
};

export default Snippet;
