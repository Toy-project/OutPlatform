import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import BasicInfo from './components/basicInfo';
import ContactInfo from './components/contactInfo';
import PasswordInfo from './components/passwordInfo';
import Unregister from './components/unregister';

import * as Common from 'helper/common';

import * as Member from 'actions/member';
import * as Club from 'actions/club';

import * as Security from 'helper/securityHelper';
import * as LoginHelper from 'helper/loginHelper';

class myPageUser extends React.Component {
  constructor(props) {
    super(props);

    //Redirect if worng myPage access has been detected,
    if(!Security.defenceAccessingWithoutToken()) {
      alert('잘못왔엉');
      this.props.history.push(`/`);
      window.location.reload();
    }
  }

  componentDidMount() {
    if(this.props.type === 'member') {
      const mem_id = LoginHelper.getCurrentToken().mem_id;
      this.props.fetchMember(mem_id);
    }

    if(this.props.type === 'club') {
      const club_id = LoginHelper.getCurrentToken().club_id;
      this.props.fetchClub(club_id);
    }
  }

  render() {
    let components;
    let data = {
      'userid' : '',
      'profile_photo': '',
      'username': '',
      'phone': '',
      'email': '',
      //단체용
      'category': '',
      'name': '',
    };

    if(this.props.type === 'member') {
      const results = Common.checkStatusComponent(this.props.member);

      if(results) {
        const member = this.props.member.data;

        //데이터가 없을 경우
        if(Common.checkEmptyData(member)){
          return false;
        }

        data = {
          id: member.mem_id,
          userid: member.mem_userid,
          profile_photo: null,
          username: member.mem_name,
          phone: member.mem_phone,
          email: member.mem_email,
        }
      }
    }

    if(this.props.type === 'club') {
      const results = Common.checkStatusComponent(this.props.club);

      if(results) {
        const club = this.props.club.data;

        //데이터가 없을 경우
        if(Common.checkEmptyData(club)){
          return false;
        }

        data = {
          id: club.club_id,
          userid: club.club_userid,
          profile_photo: null,
          username: club.club_username,
          phone: club.club_phone,
          email: club.club_email,
          cate_name: club.category.cate_name,
          name: club.club_name,
        }
      }
    }

    components = (
      <div>
        <BasicInfo
          type={this.props.type}

          userid={data.userid}
          profile_photo={data.profile_photo}
          username={data.username}
          cate_name={data.cate_name}
          name={data.name}
        />
        <ContactInfo
          type={this.props.type}
          id={data.id}

          phone={data.phone}
          email={data.email}
        />
        <PasswordInfo
          type={this.props.type}
          id={data.id}

          userid={data.userid}
        />
        <Unregister
          type={this.props.type}
          id={data.id}
        />
      </div>
    );


    return (
      <div className='my-page-user-container'>
        {components}
      </div>
    );
  }
}

myPageUser.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    member: state.member,
    club: state.club,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMember: (mem_id) => {
      dispatch(Member.fetchMember(mem_id));
    },
    fetchClub: (club_id) => {
      dispatch(Club.fetchClub(club_id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(myPageUser));
