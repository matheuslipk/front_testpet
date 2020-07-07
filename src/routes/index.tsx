import * as React from 'react';
import {Switch} from 'react-router-dom'
import Route from './Route';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact isPrivate component={Home} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/dashboard" isPrivate component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes;