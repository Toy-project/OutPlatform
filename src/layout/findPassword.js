import React from 'react';

import { Nav, FindPasswordPage } from 'components/';

const FindPassword = ({ match }) => (
  <div>
    <Nav />
    <FindPasswordPage />
  </div>
)

FindPassword.propTypes = {
};

export default FindPassword;
