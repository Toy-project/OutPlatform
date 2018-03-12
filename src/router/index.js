import React from 'react';
import { Route } from 'react-router-dom';

import { Main,
         RegisterForClub,
         Club, MyPageClub,
         MyPageUserMemberLayout,
         MyPageUserClubLayout,
         TypeFace,
         ErrorPageLayout,
         FindUserIdLayout,
         FindPasswordLayout,
         CartLayout,
         SearchLayout } from 'layout/';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/register/" component={RegisterForClub} />
      <Route path="/club/:club_id" component={Club} />
      <Route path="/myPageUser/member" component={MyPageUserMemberLayout} />
      <Route path="/myPageUser/club" component={MyPageUserClubLayout} />
      <Route path="/myPage/" component={MyPageClub} />
      <Route path="/typeface" component={TypeFace} />
      <Route path="/error/:type" component={ErrorPageLayout} />
      <Route path='/findUserId/' component={FindUserIdLayout} />
      <Route path='/findPassword/' component={FindPasswordLayout} />
      <Route path='/cart' component={CartLayout} />
      <Route path='/search/:keyword' component={SearchLayout} />
    </div>
  )
}

export default App;
