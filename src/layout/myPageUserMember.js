import React from 'react';

import { Nav, Footer, MyPageUser } from 'components/';

const myPageUserMember = () => (
  <div>
    <Nav  />
    <MyPageUser type='member' />
    <Footer />
  </div>
)

myPageUserMember.propTypes = {
};

export default myPageUserMember;
