import React from 'react';
import PropTypes from 'prop-types';

import { Nav, Register } from 'components/';

const RegisterForClub = () => (
  <div>
    <Nav subPage={true} />
    <Register />
  </div>
)

RegisterForClub.propTypes = {
  subPage: PropTypes.bool,
};

export default RegisterForClub;
