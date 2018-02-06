import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './scss/index.scss';

import { fetchClub } from 'actions/club';
import { fetchPortfolio } from 'actions/portfolio';

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

    //Fetch club data
    this.props.fetchClub(this.props.club_id);
    //Fetch portfolio data
    this.props.fetchPortfolio(this.props.club_id);
  }

  render() {
    const portfolio = () => {
      const results = checkStatusComponent(this.props.portfolio);

      if(results) {
        const portfolio = this.props.portfolio.data;

        //데이터가 없을 경우
        if(checkEmptyData(portfolio)){
          return false;
        }

        return (
          <PortfolioNavigation
            myPage={this.state.myPage}
            data={portfolio}
          />
        );
      }
    }

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

              club_photo={club.club_photo}
              club_profile_photo={club.club_profile_photo}
            />
            <Snippet
              myPage={this.state.myPage}

              club_name={club.club_name}
              club_copyright={club.club_copyright}
            />
            <Profile
              myPage={this.state.myPage}

              club_college={club.club_college}
              cate_id={club.cate_id}
              tag_id={club.tag_id}
              club_ex={club.club_ex}

              //SNS
             />
            {portfolio()}
            {/* comment */}
            {<Comment
              club_id={this.props.club_id}
              club_rating={club.club_rating}
              start={1}
              end={3}
              incresement={3}
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
    fetchClub: (index) => {
      dispatch(fetchClub(index));
    },
    fetchPortfolio: (index) => {
      dispatch(fetchPortfolio(index));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Club);
