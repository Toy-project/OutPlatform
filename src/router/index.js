import React from 'react';
import { Route } from 'react-router-dom';

import { Main, RegisterForClub, Club } from 'layout/';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/register/:type" component={RegisterForClub} />
      <Route path="/club/:club_id" component={Club} />
      <Route path="/myPage/club/:club_id" component={Club} />
    </div>
  )
}

export default App;
