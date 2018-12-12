import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default function Routes() {
  return <Router>
    <Switch>
      <Route path='/' exact render={(props)=><div {...props}> home page</div>} />
      <Route path='/test' render={props=><div {...props}>test page</div>}/>
    </Switch>
  </Router>
}