import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Form1 from './Form1';
import Form2 from './Form2';

export const Routes = ()=> {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Form1} />
        <Route exact path="/page2" component={Form2} />
      </Switch>
    </Router>
  );
};
