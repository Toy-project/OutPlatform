import React from 'react';
import { Route } from 'react-router-dom';

import { Main } from 'layout/';

const App = () => (
  <div>
    <Route exact path="/" component={Main} />
  </div>
)

export default App;
