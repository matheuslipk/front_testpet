import * as React from 'react';
import {Switch} from 'react-router-dom'
import Route from './Route';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Products from '../pages/Products'
import EditProducts from '../pages/EditProducts'
import NotFound from '../pages/NotFound'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/products" exact isPrivate component={Products} />
      <Route path="/products/edit/:id" exact isPrivate component={EditProducts} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes;