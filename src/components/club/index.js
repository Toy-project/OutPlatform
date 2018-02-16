import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  { withRouter } from 'react-router-dom';

import './scss/index.scss';

import { fetchClub } from 'actions/club';
import { fetchCareer } from 'actions/portfolio';

import { checkStatusComponent, checkEmptyData } from 'helper/common';


import ImageNavigation from './components/imageNavigation';
import Snippet from './components/snippet';
import Profile from './components/profile';
import PortfolioNavigation from './components/portfolioNavigation';
import Comment from './components/comment';
import Quotation from './components/quotation';
import SmiliarClub from './components/smiliarClub';

import * as Security from 'helper/securityHelper';

class Club extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      myPage: this.props.myPage,
    }

    //Redirect if worng myPage access has been detected,
    if(this.state.myPage) {
      //토큰이 없으면
      if(!Security.defenceAccessingWithoutToken()) {
        alert('잘못왔엉');
        this.props.history.push(`/`);
        window.location.reload();
      } else {
        if(!Security.defenceAccessingWithInvalidToken(this.props.match.params.club_id)) {
          alert('잘못왔엉');
          this.props.history.push(`/`);
          window.location.reload();
        }
      }
    }
  }

  componentDidMount() {
    const club_id = this.props.match.params.club_id;

    //fetch Data
    this.props.fetchClub(club_id);
    this.props.fetchCareer(club_id);
  }

  render() {
    let club_rating = 0;
    const club = () => {
      const results = checkStatusComponent(this.props.club);

      if(results) {
        const club = this.props.club.data;

        //데이터가 없을 경우
        if(checkEmptyData(club)){
          return false;
        }

        club_rating = club.club_rating;

        return(
          <div>
            <ImageNavigation
              myPage={this.state.myPage}

              club_id={club.club_id}
              club_photo={club.club_photo}
              club_profile_photo={club.club_profile_photo}
            />
            <Snippet
              myPage={this.state.myPage}

              club_id={club.club_id}
              club_name={club.club_name}
              club_copyright={club.club_copyright}
            />
            <Profile
              myPage={this.state.myPage}

              club_id={club.club_id}
              club_college={club.club_college}
              cate_id={club.cate_id}
              tag_id={club.tag_id}
              cate_name={club.category.cate_name}
              tag_name={club.tag.tag_name}
              club_ex={club.club_ex}
              //SNS
              sns={club.sns}
             />
          </div>
        );
      }
    }
    return (
      <div className='club-container'>
        {club()}
        <PortfolioNavigation
         club_id={this.props.match.params.club_id}
         myPage={this.state.myPage}
         portfolio={this.props.portfolio.data}
        />

        {/* comment */}
        {this.state.myPage ? '' : <Comment
          club_id={club.club_id}
          club_rating={club_rating}
        />}

        {/* comment */}
        {this.state.myPage ? '' : <Quotation />}

        {/* 비슷한 단체 데이터 */}
        {this.state.myPage ? '' : <SmiliarClub />}
      </div>
    );
  }
}

Club.propTypes = {
  myPage: PropTypes.bool,
  club_id: PropTypes.string,
  club: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    data: PropTypes.object,
  }),
  portfolio: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
};

const mapStateToProps = (state) => {
  return {
    club: state.club,
    portfolio: state.portfolio,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClub: (club_id) => {
      dispatch(fetchClub(club_id));
    },
    fetchCareer: (club_id) => {
      dispatch(fetchCareer(club_id));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club));
