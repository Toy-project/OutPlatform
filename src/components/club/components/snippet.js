import React from 'react';
import PropTypes from 'prop-types';

import { getClubName, updateClub } from 'services/club';
// import { isProfileGood, isNameGood } from 'helper/regExp';
// import { isNull } from 'helper/common';

class Snippet extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      myPage: this.props.myPage,
      isEditToggle: false,
      isSubmited: false,
      club_name: this.props.club_name,
      club_copyright: this.props.club_copyright,
    }

    this.editToggle = this.editToggle.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // const target = e.target.id;
    // const element = document.getElementById(target);
    // const error = document.getElementById('popup');
    // const isCopyright = target === 'club_copyright' ? true : false;
    // const isName = target ==='club_name' ? true : false;
  }

  editToggle() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
      isSubmited: false,
    });
  }

  editSubmit() {
    this.setState({
      isEditToggle: !this.state.isEditToggle,
      club_name: this.refs.club_name.value,
      club_copyright: this.refs.club_copyright.value,
      isSubmited: true,
    });
  }

  componentDidUpdate() {
    if(this.state.isSubmited){
        // POST API
        if(this.props.club_name !== this.state.club_name) {
          getClubName(this.state.club_name)
            .then((response) => {
              if(response.data) {
                console.log('동일한 동아리 이름 존재');
              } else {
                const data = {
                  club_name : this.state.club_name,
                  club_copyright: this.state.club_copyright,
                }

                updateClub(this.props.club_id, data)
                  .then((response) => {
                    //Todo
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }
  }

  render() {
    let editButton;

    let editCopyright = <textarea ref='club_copyright' id='club_copyright' placeholder='회원가입 단계에서 미리 입력된 동아리 설명이 나타납니다.(30자 이내)' onChange={this.onChange} defaultValue={this.state.club_copyright}></textarea>;
    let viewCopyright = this.state.club_copyright.split('\n').map((line, key) => {
      return (<span key={key}>{line}<br /></span>);
    });

    let editName = <input type='text' ref='club_name' onChange={this.onChange} defaultValue={this.state.club_name} />

    //let popup = this.state.isEditToggle ? 'show' : '';

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

    return (
      <div className='snippet-container'>
        <div className='container'>
          {editButton}
          <div className='snippet-inner'>
            <h1 className='title'>{this.state.isEditToggle ? editName : this.state.club_name}</h1>
            <p>{this.state.isEditToggle ? editCopyright : viewCopyright}</p>
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
