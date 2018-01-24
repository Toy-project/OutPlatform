import React from 'react';

import SmiliarClubCard from './smiliarClubCard';

const SmiliarClub = () => {
  return (
    <div className='smiliarClub-container'>
      <div className='container'>
        <div className='title-wrapper'>
          <span></span>
          <h3>비슷한 단체</h3>
        </div>

        <div className='smiliarClub-card-wrapper'>
          <h2>더보기</h2>
          <ul>
            <li><SmiliarClubCard /></li>
            <li><SmiliarClubCard /></li>
            <li><SmiliarClubCard /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

SmiliarClub.propTypes = {
};

export default SmiliarClub;
