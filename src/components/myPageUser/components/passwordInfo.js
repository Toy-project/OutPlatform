import React from 'react';
import { connect } from 'react-redux';

import * as Common from 'helper/common';
import * as RegisterHelper from 'helper/registerHelper';
import * as LoginHelper from 'helper/loginHelper';

import * as MemberActions from 'actions/member/';
import * as Auth from 'services/auth';

class PasswordInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_pw : {
        value: '',
        err_msg: '',
        err: null,
      },
      pw : {
        value: '',
        err_msg: '영문,숫자,특수문자 포함 12자이내',
        err: null,
      },
      pw_confirm : {
        value: '',
        err_msg: '',
        err: null,
      }
    }

    //Input 처리
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //공백 처리
    this.handleEmptyValue = this.handleEmptyValue.bind(this);

    //Submit
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(target.id === 'pw' || target.id === 'pw_confirm') {
      if(!Common.isEmpty(value)) {
        if(!RegisterHelper.isPasswordAvailable(value)) {
          err_msg = '영문,숫자,특수문자 포함 12자이내';
          err = true;
        } else {
          err_msg = '이용 가능한 비밀번호입니다.';
        }
      }
    }

    this.setState({
      [target.id] : {
        ...[target.id],
        value: value,
        err_msg: err_msg,
        err : Common.isEmpty(value) ? null : err,
      },
    });
  }

  handleBlur(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let err_msg = '';
    let err = false;

    if(Common.isEmpty(value)) return false;

    if(target.id === 'pw' || target.id === 'pw_confirm') {
      if(!RegisterHelper.isPasswordAvailable(target.value)) {
        err_msg = '영문,숫자,특수문자 포함 12자이내';
        err = true;
      } else {
        if(target.id === 'pw_confirm') {
          const pw = this.state.pw.value;
          if(!RegisterHelper.compareTo(target.value, pw)) {
            err_msg = '비밀번호가 일치하지 않습니다.';
            err = true;
          } else {
            err_msg = '이용 가능한 비밀번호입니다.';
            err = false;
          }
        }
      }
    }

    this.setState({
      [target.id] : {
        value: target.value,
        err_msg: err_msg,
        err : err,
      },
    });
  }

  handleEmptyValue() {
    if(Common.isEmpty(this.state.current_pw.value)) this.refs.current_pw.focus();
    else if(Common.isEmpty(this.state.pw.value)) this.refs.pw.focus();
    else if(Common.isEmpty(this.state.pw_confirm.value)) this.refs.pw_confirm.focus();
    else {
      return true;
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    const validator = [
      this.state.currnet_pw,
      this.state.pw.err,
      this.state.pw_confirm.err,
    ];

    //Empty data check
    if(!this.handleEmptyValue()) return false;

    //Validation check
    validator.forEach((error) => {
      if(error) {
        isValid = false;
        return false;
      }
    });

    if(isValid) {
      const data = {
        "mem_pw" : this.state.pw.value,
      }
      Auth.memberLogin(this.props.userid, this.state.current_pw.value)
        .then((response) => {
          if(response.data.isValid) {
            this.props.fetchUpdateMember(this.props.mem_id, data);
          }
        })
        .catch((err) => {
          alert('비밀번호 틀렸어!');
          console.log(err);
        })
    }
  }

  render() {
    const errorClassName = (identifier) => {
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    return (
      <div className='password-info-container'>
        <div className='container'>
          <div className='edit-btn'>
            <button className='emerald-btn password' onClick={this.handleSubmit}>변경하기</button>
          </div>
          <div className='title-wrapper'>
            <span></span>
            <h3>비밀번호 변경</h3>
          </div>
          <div className='input-container'>
            <form>
              <div className='info-input'>
                <label htmlFor='current_pw'>현재 비밀번호</label>
                <input type="password" id='current_pw' ref='current_pw' onChange={this.handleChange} />
                <a className={errorClassName(this.state.current_pw)}>{this.state.current_pw.err_msg}</a>
              </div>
              <div className='info-input'>
                <label htmlFor='pw'>새로운 비밀번호</label>
                <input type="password" id='pw' ref='pw' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.pw)}>{this.state.pw.err_msg}</a>
              </div>
              <div className='info-input'>
                <label htmlFor='pw_confirm'>비밀번호 확인</label>
                <input type="password" id='pw_confirm' ref='pw_confirm' onChange={this.handleChange} onBlur={this.handleBlur} />
                <a className={errorClassName(this.state.pw_confirm)}>{this.state.pw_confirm.err_msg}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PasswordInfo.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    member: state.member,
    club: state.club,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdateMember: (mem_id, data) => {
      dispatch(MemberActions.fetchUpdateMember(mem_id, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordInfo);
