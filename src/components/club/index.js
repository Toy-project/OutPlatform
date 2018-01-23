import React from 'react';

import './scss/index.scss';

import ImageNavigation from './components/imageNavigation';
import Snippet from './components/snippet';
import Profile from './components/profile';
import PortfolioNavigation from './components/portfolioNavigation'
import Comment from './components/comment';
import Quotation from './components/quotation';
import SmiliarClub from './components/smiliarClub';

const Club = () => (
  <div className='club-container'>
    <ImageNavigation />
    <Snippet />
    <Profile />
    <PortfolioNavigation />
    <Comment />
    <Quotation />
    <SmiliarClub />
  </div>
)

Club.propTypes = {
};

export default Club;
