import React from 'react';
import PropTypes from 'prop-types';

import './scss/index.scss';

import ImageNavigation from './components/imageNavigation';
import Snippet from './components/snippet';
import Profile from './components/profile';
import PortfolioNavigation from './components/portfolioNavigation'
import Comment from './components/comment';
import Quotation from './components/quotation';
import SmiliarClub from './components/smiliarClub';

const Club = ( { myPage } ) => (
  <div className='club-container'>
    <ImageNavigation myPage={myPage} />
    <Snippet myPage={myPage} />
    <Profile myPage={myPage} />
    <PortfolioNavigation myPage={myPage} />
    {myPage ? '' : <Comment />}
    {myPage ? '' : <Quotation />}
    {myPage ? '' : <SmiliarClub />}
  </div>
);

Club.propTypes = {
  myPage: PropTypes.bool,
};

export default Club;
