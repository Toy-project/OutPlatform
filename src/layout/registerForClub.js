import React from 'react';

import { Nav, Register } from 'components/';

const RegisterForClub = ({ match }) => (
  <div>
    <Nav />
    <Register type={match.params.type}/>
  </div>
)

RegisterForClub.propTypes = {
};

export default RegisterForClub;
