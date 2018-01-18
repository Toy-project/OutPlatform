import React from 'react';
import PropTypes from 'prop-types';

import { Nav, Register } from 'components/';

const RegisterForClub = ({ match }) => (
  <div>
    <Nav subPage={true} />
    <Register type={match.params.type}/>
  </div>
)

RegisterForClub.propTypes = {
  subPage: PropTypes.bool,
};

export default RegisterForClub;
