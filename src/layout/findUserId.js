import React from 'react';

import { Nav, FindUserIdPage } from 'components/';

const FindUserId = ({ match }) => (
  <div>
    <Nav />
    <FindUserIdPage />
  </div>
)

FindUserId.propTypes = {
};

export default FindUserId;
