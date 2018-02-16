import React from 'react';

import PropTypes from 'prop-types';

import { Nav } from 'components/';
import { Club, Footer } from 'components/';

const myPageClub = () => (
  <div>
    <Nav/>
    <Club myPage={true} />
    <Footer />
  </div>
)

myPageClub.propTypes = {
  myPage: PropTypes.bool,
};


export default myPageClub;
