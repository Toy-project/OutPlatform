import React from 'react';
import { Route } from 'react-router-dom';

import { Main, RegisterForClub } from 'layout/';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/register/:type" component={RegisterForClub} />
    </div>
  )
}

export default App;
