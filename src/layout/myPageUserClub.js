import React from 'react';

import { Nav, Footer, MyPageUser } from 'components/';

const myPageUserClub = () => (
  <div>
    <Nav  />
    <MyPageUser type='club' />
    <Footer />
  </div>
)

myPageUserClub.propTypes = {
};

export default myPageUserClub;
