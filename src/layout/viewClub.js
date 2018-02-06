import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'components/';
import { Club, Footer } from 'components/';

const viewClub = ( { match }) => (
  <div>
    <Nav subPage={true} />
    <Club club_id={match.params.club_id}/>
    <Footer />
  </div>
)

viewClub.propTypes = {
  subPage: PropTypes.bool,
};

export default viewClub;
