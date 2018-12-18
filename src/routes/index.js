import React from 'react';
import { HashRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Example from './example';
export default function Routes() {
  return <Router>
    <Switch>
      <Route path='/' exact render={(props)=><div {...props}> home page <Link to='/example'>show example</Link></div>} />
      <Route path='/example' component={Example} />
    </Switch>
  </Router>
}