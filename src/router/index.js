import React from 'react';
import { Route } from 'react-router-dom';

import { Main, RegisterForClub } from 'layout/';

const App = () => (
  <div>
    <Route exact path="/" component={Main} />
    <Route path="/register" component={RegisterForClub} />
  </div>
)

export default App;
