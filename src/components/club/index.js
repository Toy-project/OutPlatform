import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './scss/index.scss';

import { fetchClub } from 'actions/club';
import { fetchCareer } from 'actions/portfolio';
import { fetchSnsByClubId } from 'actions/sns';

import { getClubUserId } from 'services/club';

import { checkStatusComponent, checkEmptyData } from 'helper/clubHelper';


import ImageNavigation from './components/imageNavigation';
import Snippet from './components/snippet';
import Profile from './components/profile';
import PortfolioNavigation from './components/portfolioNavigation'
import Comment from './components/comment';
import Quotation from './components/quotation';
import SmiliarClub from './components/smiliarClub';

class Club extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      myPage: this.props.myPage,
    }
  }

  componentDidMount() {
    const param = new URLSearchParams(this.props.location.search);
    const cate_id = param.get('cate_id');
    const tag_id = param.get('tag_id');
    const club_id = this.props.match.params.club_id;

    const token = localStorage.getItem('club_user');

    if(!this.state.myPage) {
      //Fetch club data
      this.props.fetchClub(club_id, cate_id, tag_id);
    } else {
      if(token){
        const { club_userid } = jwtDecode(token);

        getClubUserId(club_userid)
          .then((response) => {
            //Fetch club data
            this.props.fetchClub(club_id, cate_id, tag_id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('잘못왔엉');
      }
    }
  }

  render() {
    // const portfolio = (club_id) => {
    //   const results = checkStatusComponent(this.props.portfolio);
    //
    //   if(results) {
    //     const portfolio = this.props.portfolio.data;
    //
    //     return (
    //       <PortfolioNavigation
    //         club_id={club_id}
    //         myPage={this.state.myPage}
    //         portfolio={portfolio}
    //       />
    //     );
    //   }
    // }

    const club = () => {
      const results = checkStatusComponent(this.props.club);

      if(results) {
        const club = this.props.club.data;

        //데이터가 없을 경우
        if(checkEmptyData(club)){
          return false;

        }
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
           {/* {portfolio(club.club_id)} */}
            {/* comment */}
            {this.state.myPage ? '' : <Comment
              club_id={club.club_id}
              club_rating={club.club_rating}
              start={1}
              end={3}
            />}
            {/* comment */}
            {this.state.myPage ? '' : <Quotation />}
            {/* 비슷한 단체 데이터 */}
            {this.state.myPage ? '' : <SmiliarClub />}
          </div>
        );
      }
    }

    return (
      <div className='club-container'>
        {club()}
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club));
