import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { Home } from './container/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
