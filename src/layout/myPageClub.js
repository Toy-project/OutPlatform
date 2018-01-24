import React from 'react';

import PropTypes from 'prop-types';

import { Nav } from 'components/';
import { Club, Footer } from 'components/';

const myPageClub = () => (
  <div>
    <Nav subPage={true} />
    <Club myPage={true} />
    <Footer />
  </div>
)

myPageClub.propTypes = {
  subPage: PropTypes.bool,
  myPage: PropTypes.bool,
};


export default myPageClub;
