import React from 'react';
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as RegisterHelper from 'helper/registerHelper';
import { getClubName } from 'services/club';

import * as ClubActions from 'actions/club/';

class SnippetEditPopupCopyright extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      club_copyright : {
        value : this.props.club_copyright,
        err_msg : '동아리의 매력을 한 줄로 설명해주세요!(30자 이내)',
        err : null,
      }
    };

    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '동아리의 매력을 한 줄로 설명해주세요!(30자 이내)';
    let err = null;

    if(target.id === 'club_copyright') {
      if(!Common.isEmpty(value)) {
        if(!RegisterHelper.isCopyrightAvailable(value)) {
          err_msg = '30자 미만으로 해주세요!';
          err = true;
        } else {
          err_msg = '등록가능합니다.';
          err = false;
        }
      }
    }

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err_msg: err_msg,
        err : err,
      },
    });
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.club_copyright.value)) this.refs.club_copyright.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.club_copyright.err,
    ];

    //Empty data check
    if(!this.handleEmptyValue()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error || Common.isNull(error)) {
        isValid = false;
        return false;
      }
    });

    if(isValid) {
      const data = {
        "club_copyright" : this.state.club_copyright.value,
      }

      this.props.fetchUpdateClub(this.props.club_id, data);

      this.setState({
        club_copyright : {
          ...this.state.club_copyright,
          err_msg : '성공적으로 업데이트를 하였습니다.',
        }
      });
    }
  }

  handleClose() {
    this.props.close();
  }

  componentDidMount() {
    this.refs.club_copyright.focus();
  }

  render() {
    const errorClassName = (identifier) => {
      //API 콜 에러일 때
      if(this.props.club.error) {
        return 'warning-color';
      }

      //폼 데이터 에러일 때
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    const msg = () => {
      //API 콜 에러일 때
      if(this.props.club.error) {
        return '업데이트 중 오류가 발생하였습니다. 다시 이용하여주세요.';
      }

      if(this.props.club.isLoading) {
        return '잠시만 기달려주세요.';
      }

      return this.state.club_copyright.err_msg;
    }
    return (
      <div className='popup_container'>
        <div className='snippet-edit-popup-container'>
          <div className='close-btn-right' onClick={this.handleClose}>
            <span className='x-icon'></span>
          </div>
          <div className='info-title'>
            <h1>동아리 한 줄 소개 수정</h1>
            <label className={errorClassName(this.state.club_copyright)} htmlFor='club_copyright'>
              {msg()}
            </label>
          </div>
          <div className='info-input'>
            <input type="text" id='club_copyright' ref='club_copyright' onChange={this.handleChange} defaultValue={this.props.club_copyright}/>
          </div>
          <div className='info-btn'>
            <button onClick={this.handleSubmit}>확인</button>
            <button onClick={this.handleClose}>취소</button>
          </div>
        </div>
      </div>
    );
  }
}

SnippetEditPopupCopyright.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    club: state.club,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateClub: (club_id, data) => {
      dispatch(ClubActions.fetchUpdateClub(club_id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetEditPopupCopyright);
