import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'components/';
import { Club } from 'components/';

const viewClub = () => (
  <div>
    <Nav subPage={true} />
    <Club />
  </div>
)

viewClub.propTypes = {
  subPage: PropTypes.bool,
};

export default viewClub;
