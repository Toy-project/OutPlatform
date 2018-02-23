import React from 'react';

import * as Common from 'helper/common';
import * as RegisterHelper from 'helper/registerHelper';

import * as MemberActions from 'actions/member/';
import * as ClubActions from 'actions/club/';
import * as Member from 'services/member';
import * as Club from 'services/club';

import ContactInfoEditEmail from './contactInfoEditEmail';
import ContactInfoEditPhone from './contactInfoEditPhone';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditTogglePhone : false,
      isEditToggleEmail : false,
    }

    this.editToggleEmail = this.editToggleEmail.bind(this);
    this.editTogglePhone = this.editTogglePhone.bind(this);
  }

  editToggleEmail() {
    this.setState({
      isEditToggleEmail: !this.state.isEditToggleEmail,
    });
  }

  editTogglePhone() {
    this.setState({
      isEditTogglePhone: !this.state.isEditTogglePhone,
    });
  }

  render() {
    let editButton;
    let editContact;
    let editEmail;
    let editPhonePopup;
    let editEmailPopup;

    const errorClassName = (identifier) => {
      if(identifier.err == null) {
        return '';
      } else if(identifier.err === false) {
        return 'recommend-color';
      } else {
        return 'warning-color';
      }
    }

    editPhonePopup = () => {
      if(this.state.isEditTogglePhone) {
        return (
          <ContactInfoEditPhone
            id={this.props.id}
            phone={this.props.phone}
            close={this.editTogglePhone}
            type={this.props.type} />
        )
      } else {
        return '';
      }
    }

    editEmailPopup = () => {
      if(this.state.isEditToggleEmail) {
        return (
          <ContactInfoEditEmail
            id={this.props.id}
            email={this.props.email}
            close={this.editToggleEmail}
            type={this.props.type} />
        )
      } else {
        return '';
      }
    }

    return (
      <div className='contact-info-container'>
        <div className='container'>
          {editButton}
          <div className='title-wrapper'>
            <span></span>
            <h3>연락처 정보</h3>
          </div>
          <div className='input-container'>
            <form>
              <div className='info-input'>
                <label htmlFor='phone'>대표 전화번호</label>
                {this.props.phone}
                <i className='ic-edit' onClick={this.editTogglePhone}>수정</i>
              </div>
              <div className='info-input'>
                <label htmlFor='email'>이메일 주소</label>
                {this.props.email}
                <i className='ic-edit' onClick={this.editToggleEmail}>수정</i>
              </div>
            </form>
          </div>
        </div>
        {editPhonePopup()}
        {editEmailPopup()}
      </div>
    );
  }
}

ContactInfo.propTypes = {
};

export default ContactInfo;
