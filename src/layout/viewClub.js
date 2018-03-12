import React from 'react';

import { Nav } from 'components/';
import { Club, Footer } from 'components/';

const viewClub = ( { match }) => (
  <div>
    <Nav/>
    <Club club_id={match.params.club_id}/>
    <Footer />
  </div>
)

viewClub.propTypes = {
};

export default viewClub;
