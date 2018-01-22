import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'components/';
import { Club, Footer } from 'components/';

const viewClub = () => (
  <div>
    <Nav subPage={true} />
    <Club />
    <Footer />
  </div>
)

viewClub.propTypes = {
  subPage: PropTypes.bool,
};

export default viewClub;
